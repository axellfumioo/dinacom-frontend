"use client";

import ActionCard from "@/components/dashboard/ActionCard";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { AiCard } from "@/components/dashboard/AiCard";
import { NutritionCard } from "@/components/dashboard/NutritionCard";
import { CalorieRing } from "@/components/dashboard/CalorieRing";
import { KonsultasiCard } from "@/components/dashboard/KonsultasiCard";
import { LaporanCard } from "@/components/dashboard/LaporanMingguan";
import { PantauKeluargaCard } from "@/components/dashboard/PantauKeluarga";
import { CalendarCard } from "@/components/dashboard/Kalender";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import React, { useMemo } from "react";

export default function DashboardPage() {
  const { sidebarCollapsed } = useSidebarLayout();

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  return (
    <div className={`${containerWidth} mx-auto px-4 bg-gray-50 min-h-screen py-6`}>
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

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* NUTRITION SECTION */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold mb-6">Ringkasan Nutrisi</h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Calorie Ring */}
              <CalorieRing current={1540} target={2100} />

              {/* Nutrition Cards */}
              <NutritionCard
                label="Protein"
                value={85}
                unit="g"
                target={140}
                progress={60}
              />
              <NutritionCard
                label="Karbohidrat"
                value={180}
                unit="g"
                target={250}
                progress={72}
              />
              <NutritionCard
                label="Lemak"
                value={45}
                unit="g"
                target={70}
                progress={64}
              />
            </div>
          </div>

          {/* ACTIVITY + AI INSIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityCard />
            <AiCard />
          </div>
        </div>

        {/* RIGHT COLUMN - 1/3 width */}
        <div className="space-y-4">
          <KonsultasiCard />
          <LaporanCard />
          <PantauKeluargaCard />
          <CalendarCard />
        </div>
      </div>
    </div>
  );
}