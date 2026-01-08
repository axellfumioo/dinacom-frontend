"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Flame, Droplet, Cookie, Apple } from "lucide-react";
import { FoodDetailForm } from "@/components/scan/FoodDetailForm";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { useGetUserScans } from "@/hooks/ScanHook";

export default function ScanFoodPage() {
  const params = useSearchParams();
  const uploadedImage = params.get("image");

  const { sidebarCollapsed } = useSidebarLayout();
  const { data, isLoading } = useGetUserScans();

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  const nutritionData = {
    calories: { value: 420, label: "Kalori", unit: "kcal", color: "bg-orange-500", icon: Flame },
    protein: { value: 24, label: "Protein", unit: "g", color: "bg-blue-500", icon: Droplet },
    carbs: { value: 18, label: "Karbo", unit: "g", color: "bg-yellow-500", icon: Cookie },
    fat: { value: 14, label: "Lemak", unit: "g", color: "bg-red-500", icon: Apple },
  };

  return (
    <div className={`${containerWidth} mx-auto px-4 py-6`}>
      <h1 className="text-2xl font-bold mb-1">NutriScan : Analisis Makanan</h1>
      <p className="text-sm text-gray-600 mb-6">
        Hasil analisis makanan dari AI
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IMAGE */}
        <div className="bg-white rounded-2xl p-6 border">
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Scanned food"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 flex items-center justify-center h-full">
                Tidak ada gambar
              </p>
            )}
          </div>
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
