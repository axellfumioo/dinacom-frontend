"use client";

import React from 'react'
import BtnScan from '@/components/scan/BtnScan'
import { Camera, Plus } from 'lucide-react'
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { useMemo } from "react";

export default function ScanMakananPage() {
  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  return (
    <div className={`${containerWidth} mx-auto px-4 py-6 md:py-8`}>

      <div className='text-center mb-6 md:mb-8'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 md:mb-3'>
          NutriScan : Analisis Makanan
        </h1>
        <p className='text-sm md:text-base text-gray-600 max-w-2xl mx-auto'>
          Unggah atau ambil foto makananmu, AI akan menghitung nutrisi secara instan.
        </p>
      </div>

      <div className='flex justify-center'>
        <div className='w-full max-w-2xl border-2 border-dashed border-[#FFE766] rounded-xl p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center justify-center bg-white shadow-sm'>
          {/* Camera Icon with Plus */}
          <div className='relative mb-5 md:mb-6'>
            <div className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#FFF7CC] rounded-full flex items-center justify-center'>
              <Camera className='w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-[#FFE766]' strokeWidth={2.5} />
            </div>
            <div className='absolute -top-1 -right-1 w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-[#FFE766] rounded-full flex items-center justify-center border-2 border-white shadow-sm'>
              <Plus className='w-4 h-4 md:w-5 md:h-5 text-black' strokeWidth={3} />
            </div>
          </div>

          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 md:mb-4 text-center'>
            Mulai Scan Makanan
          </h2>


          <p className='text-center text-gray-600 mb-6 md:mb-8 max-w-md text-sm md:text-base leading-relaxed'>
            Ambil foto dari atas, pastikan seluruh makanan terlihat jelas tanpa terpotong agar hasil analisis lebih akurat.
          </p>


          <div className='w-full'>
            <BtnScan />
          </div>
        </div>
      </div>
    </div>
  )
}
