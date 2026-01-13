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
import { KonsultasiCard } from "@/components/dashboard/KonsultasiCard";
import { LaporanCard } from "@/components/dashboard/LaporanMingguan";
import { PantauKeluargaCard } from "@/components/dashboard/PantauKeluarga";
import { CalendarCard } from "@/components/dashboard/Kalender";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { AiCard } from "@/components/dashboard/AiCard";
import { NutritionCard } from "@/components/dashboard/NutritionCard";
import { CalorieRing } from "@/components/dashboard/CalorieRing";
import ActionCard from "@/components/dashboard/ActionCard";

export default function DashboardPage() {
  const { sidebarCollapsed } = useSidebarLayout();
  const [openAlert, setOpenAlert] = useState(false);

  // 🔑 CHECK SESSION LOGIN ALERT
  useEffect(() => {
    const showAlert = sessionStorage.getItem("showLoginAlert");
    if (showAlert === "true") {
      setOpenAlert(true);
      sessionStorage.removeItem("showLoginAlert"); // biar cuma muncul sekali
    }
  }, []);

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  return (
    <>
      {/* ALERT LOGIN */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Berhasil 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Selamat datang kembali! Pantau kesehatan dan nutrisi harianmu di
              dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Siap</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DASHBOARD UI */}
      <div
        className={`${containerWidth} mx-auto px-4 bg-gray-50 min-h-screen py-6`}
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Halo Elitis</h1>
          <p className="text-sm text-gray-600 mt-1">
            Pantau kesehatan dan nutrisi harianmu disini.
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ActionCard
            title="Scan Makanan"
            description="Analisis kalori & nutrisi otomatis dengan AI (NutriScan)"
            buttonText="Upload Foto"
            icon="scan"
            highlight
          />
          <ActionCard
            title="Healt Assist"
            description="Dapatkan penjelasan data dan saran kesehatan dari AI."
            buttonText="Tanya AI"
            icon="health"
          />
          <ActionCard
            title="Konsultasi"
            description="Chat atau video call dengan dokter mengenai penyakit yang sudah didiagnosa oleh AI"
            buttonText="Buat Janji"
            icon="consultation"
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

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <CalorieRing current={1540} target={2100} />

                <NutritionCard label="Protein" value={85} unit="g" target={140} progress={60} />
                <NutritionCard label="Karbohidrat" value={180} unit="g" target={250} progress={72} />
                <NutritionCard label="Lemak" value={45} unit="g" target={70} progress={64} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActivityCard />
              <AiCard />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <KonsultasiCard />
            <LaporanCard />
            <PantauKeluargaCard />
            <CalendarCard />
          </div>
        </div>
      </div>
    </>
  );
}
