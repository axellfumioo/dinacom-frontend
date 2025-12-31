"use client";

import { ActionCard } from '@/components/dashboard/ActionCard';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { InsightCard } from '@/components/dashboard/AiCard';
import { NutritionCard } from '@/components/dashboard/NutritionCard';
import { useSidebarLayout } from '@/components/ui/LayoutClient';
import React, { useMemo } from 'react'

export default function DashboardPage() {
    const { sidebarCollapsed } = useSidebarLayout();
    const containerWidth = useMemo(
        () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
        [sidebarCollapsed]
    );


  return (
    <div className={`${containerWidth} mx-auto`}>

    <h1 className='text-3xl font-bold mb-2'>Halo Elitis</h1>
    <h4 className='text-sm font-semibold mb-4'>Pamtau kesehatan dan nutrisimu harianmu disini.</h4>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard
          title="Scan Makanan"
          description="Analisis nutrisi otomatis dengan AI"
          buttonText="Upload Foto"
          highlight
        />
        <ActionCard
          title="Health Assistant"
          description="Tanya AI tentang kesehatanmu"
          buttonText="Tanya AI"
        />
        <ActionCard
          title="Konsultasi"
          description="Chat dokter berbasis AI"
          buttonText="Buat Janji"
          highlight
        />
      </div>

      {/* Nutrition Card */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-4">Ringkasan Nutrisi</h3>

        <div className="flex gap-4 flex-wrap">
          <NutritionCard label="Protein" value={85} unit="g" progress={60} />
          <NutritionCard label="Karbohidrat" value={180} unit="g" progress={70} />
          <NutritionCard label="Lemak" value={45} unit="g" progress={50} />
        </div>
      </div>

      <ActivityCard />
      <InsightCard />
    </div>
  )
}
