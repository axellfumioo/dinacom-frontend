"use client";       

import { Image, Camera } from 'lucide-react';
import React, { useRef, ChangeEvent } from 'react'

export default function BtnScan() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const isMobile = typeof navigator !== 'undefined' 
        ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        : false;

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleCameraClick = () => {
        cameraInputRef.current?.click();
    };

    // sementara buat kirim ke backend
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log(file);
        }
    }

  return (
    <div className='flex flex-row items-center gap-4'>
        {/* Upload Button */}
        <button
            onClick={handleUploadClick}
            className='px-6 py-3 rounded-xl bg-[#FFE766] text-black font-semibold hover:opacity-90 transition flex items-center gap-2'
        >
            <Image className='w-5 h-5' aria-label='upload' />
            <span>Upload Foto Makanan</span>
        </button>

        <input 
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
        />

        {/* Camera Button */}
        <button
            onClick={handleCameraClick}
            className='px-6 py-3 rounded-xl bg-[#D1D5DB] text-black font-semibold hover:opacity-90 transition flex items-center gap-2'
        >
            <Camera className='w-5 h-5' />
            <span>Ambil Dari Kamera</span>
        </button>

        <input 
            ref={cameraInputRef}
            type='file'
            accept='image/*'
            capture={isMobile ? 'environment' : 'user'}
            className='hidden'
            onChange={handleFileChange}
        />
    </div>
)
}

