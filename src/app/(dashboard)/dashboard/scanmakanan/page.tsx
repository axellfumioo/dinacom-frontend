import React from 'react'
import BtnScan from '@/components/scan/BtnScan'
import { Camera, Plus } from 'lucide-react'

export default function ScanMakananPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      {/* Title */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-black mb-3'>
          NutriScan : Analisis Makanan
        </h1>
        <p className='text-lg text-black'>
          Unggah atau ambil foto makananmu, AI akan menghitung nutrisi secara instan.
        </p>
      </div>

      {/* Scan Box */}
      <div className='w-full max-w-2xl border-2 border-dashed border-[#FFE766] rounded-xl p-12 flex flex-col items-center justify-center bg-white'>
        {/* Camera Icon with Plus */}
        <div className='relative mb-6'>
          <div className='w-24 h-24 bg-[#FFF7CC] rounded-full flex items-center justify-center'>
            <Camera className='w-12 h-12 text-[#FFE766]' strokeWidth={2.5} />
          </div>
          <div className='absolute -top-1 -right-1 w-8 h-8 bg-[#FFE766] rounded-full flex items-center justify-center border-2 border-white'>
            <Plus className='w-5 h-5 text-black' strokeWidth={3} />
          </div>
        </div>

        {/* Section Title */}
        <h2 className='text-2xl font-bold text-black mb-3'>
          Mulai Scan Makanan
        </h2>

        {/* Instructions */}
        <p className='text-center text-gray-700 mb-8 max-w-md'>
          Ambil foto dari atas, pastikan seluruh makanan terlihat jelas tanpa terpotong agar hasil analisis lebih akurat.
        </p>

        {/* Buttons */}
        <BtnScan />
      </div>
    </div>
  )
}
