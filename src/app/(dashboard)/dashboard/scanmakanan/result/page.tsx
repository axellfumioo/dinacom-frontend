"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Flame, Droplet, Cookie, Apple, InfoIcon } from "lucide-react";
import { FoodDetailForm } from "@/components/scan/FoodDetailForm";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { useGetFoodScanByID, useGetUserScans } from "@/hooks/ScanHook";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { useSocket } from "@/common/lib/socketIo";
import { FoodScanModel } from "@/common/model/foodscan";
import { useQueryClient } from "@tanstack/react-query";

export default function ScanFoodPage() {
  const params = useSearchParams();
  const router = useRouter();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const foodScanId = params.get("id");

  const { sidebarCollapsed } = useSidebarLayout();
  const { data: foodscanResponse, isLoading } = useGetFoodScanByID(
    foodScanId || ""
  );

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  const foodscan = foodscanResponse?.data;
  const result = foodscanResponse?.data?.result;

  const nutritionData = {
    calories: {
      value:
        foodscan?.status === "PENDING"
          ? "Memuat..."
          : result?.calories_kcal || 10,
      label: "Kalori",
      unit: "kcal",
      color: "bg-orange-500",
      icon: Flame,
    },
    protein: {
      value:
        foodscan?.status === "PENDING" ? "Memuat..." : result?.protein_g || 10,
      label: "Protein",
      unit: "g",
      color: "bg-blue-500",
      icon: Droplet,
    },
    carbs: {
      value:
        foodscan?.status === "PENDING" ? "Memuat..." : result?.carbs_g || 10,
      label: "Karbo",
      unit: "g",
      color: "bg-yellow-500",
      icon: Cookie,
    },
    fat: {
      value: foodscan?.status === "PENDING" ? "Memuat..." : result?.fat_g || 10,
      label: "Lemak",
      unit: "g",
      color: "bg-red-500",
      icon: Apple,
    },
  };

  // handle Websocket
  useEffect(() => {
    const handler = (data: FoodScanModel) => {
      if (data.id) {
        queryClient.invalidateQueries({
          queryKey: ["foodscan", data.id],
          refetchType: "all",
        });
      }
    };

    socket?.on("refresh:foodscan", handler);
    return () => {
      socket?.off("refresh:foodscan", handler);
    };
  }, [socket, queryClient]);

  return (
    <div className={`${containerWidth} mx-auto px-4 py-6`}>
      <h1 className="text-2xl font-bold mb-1">NutriScan : Analisis Makanan</h1>
      <p className="text-sm text-gray-600 mb-6">
        Hasil analisis makanan dari AI
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IMAGE */}
        <div className="relative flex flex-col bg-white rounded-2xl p-6 border gap-2">
          <div
            className={`absolute text-white font-semibold p-2 rounded-tl-xl ${
              foodscan?.status === "SUCCESS"
                ? "bg-green-500"
                : foodscan?.status === "PENDING"
                ? "bg-yellow-400"
                : "bg-red-500"
            }`}
          >
            {foodscan?.status}
          </div>
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
            {foodscanResponse?.data ? (
              <img
                src={foodscanResponse?.data?.image_url}
                alt="Scanned food"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 flex items-center justify-center h-full">
                Tidak ada gambar
              </p>
            )}
          </div>

          {foodscan?.status === "FAILED" && (
            <Button
              onClick={() => router.push("/dashboard/scanmakanan")}
              className="flex text-sm text-white bg-red-500 font-semibold rounded-sm p-2 gap-2 hover:opacity-75"
            >
              <InfoIcon className="w-5 h-5" />
              Scan gagal, klik untuk kembali ke halaman scan!
            </Button>
          )}
        </div>

        {/* NUTRITION */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(nutritionData).map(([key, d]) => {
              const Icon = d.icon;
              return (
                <div key={key} className="bg-white p-5 rounded-2xl border">
                  <div className="flex justify-between mb-2">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs text-gray-500">{d.unit}</span>
                  </div>
                  <p className="text-3xl font-bold">{d.value}</p>
                  <p className="text-sm text-gray-600">{d.label}</p>
                </div>
              );
            })}
          </div>

          <FoodDetailForm onSave={(data) => console.log("Save:", data)} />

          {isLoading && (
            <p className="text-sm text-gray-500">Memuat data scan...</p>
          )}
        </div>
      </div>
    </div>
  );
}
