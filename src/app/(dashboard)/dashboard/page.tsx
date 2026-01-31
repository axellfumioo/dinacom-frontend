"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { PantauKeluargaCard } from "@/components/dashboard/PantauKeluarga";
import ActionCard from "@/components/dashboard/ActionCard";
import { userStore } from "@/common/lib/store";
import { useStore } from "@tanstack/react-store";
import { UserMealTodayCard } from "@/components/dashboard/UserMealToday";
import AiInsightCard from "@/components/dashboard/AiCard";

export default function DashboardPage() {
  const { sidebarCollapsed } = useSidebarLayout();

  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  useEffect(() => {
    const flag = sessionStorage.getItem("showLoginAlert");
    if (flag === "true") {
      setShowLoginAlert(true); // tampilkan alert
      // jangan hapus dulu, tunggu user klik Siap
    }
  }, []);

  // Hapus flag pas user menutup alert
  const handleCloseAlert = () => {
    setShowLoginAlert(false);
    sessionStorage.removeItem("showLoginAlert");
  };

  const user = useStore(userStore);

  return (
    <>
      <AlertDialog open={showLoginAlert} onOpenChange={handleCloseAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Peringatan ⚠️⚠️⚠️</AlertDialogTitle>
            <AlertDialogDescription>
              Aplikasi ini harus digunakan sebagai alat bantu dan bukan
              pengganti nasihat medis profesional. Selalu konsultasikan dengan
              dokter atau ahli kesehatan sebelum membuat keputusan terkait
              kesehatan Anda. dan jangan mengandalkan sepenuhnya pada hasil
              analisis AI untuk diagnosis
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCloseAlert}>
              Siap
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div
        className={`${containerWidth} mx-auto px-4  min-h-screen py-6`}
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Halo {user?.name}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Pantau kesehatan dan nutrisi harianmu di sini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ActionCard
            title="Scan Makanan"
            description="Analisis kalori & nutrisi otomatis dengan AI (NutriScan)"
            buttonText="Upload Foto"
            icon="scan"
            href="/dashboard/scanmakanan"
            highlight
          />
          <ActionCard
            title="Health Assist"
            description="Dapatkan penjelasan data dan saran kesehatan dari AI."
            buttonText="Tanya AI"
            icon="health"
            href="/dashboard/healtassistent"
          />
          <ActionCard
            title="Konsultasi"
            description="Chat atau video call dengan dokter terkait hasil analisis AI"
            buttonText="Buat Janji"
            icon="consultation"
            href="/dashboard/konsultasi"
            highlight
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-semibold mb-6">
                Ringkasan Nutrisi
              </h3>

<div className="grid grid-cols-1">
  <UserMealTodayCard />
</div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AiInsightCard />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <PantauKeluargaCard />
          </div>
        </div>
      </div>
    </>
  );
}
