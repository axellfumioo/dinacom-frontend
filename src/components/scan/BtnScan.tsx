"use client";

import { Image as ImageIcon, Camera } from "lucide-react";
import React, {
  useRef,
  ChangeEvent,
  useState,
  useEffect,
} from "react";

export default function BtnScan() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);


  const [isMobile, setIsMobile] = useState(false);


  // useEffect + setState

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    }
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File terpilih:", file);
    // TODO: Kirim ke backend untuk analisis
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 justify-center w-full px-2">
      {/* Upload Button - (Desktop & Mobile) */}
      <button
        onClick={handleUploadClick}
        className="px-4 py-2.5 md:px-6 md:py-3 rounded-xl bg-[#FFE766] text-black font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto"
      >
        <ImageIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0" aria-hidden />
        <span className="whitespace-nowrap">Upload Foto Makanan</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Camera Button - mobile */}

      <div suppressHydrationWarning className="w-full sm:w-auto">
        {isMobile && (
          <>
            <button
              onClick={handleCameraClick}
              className="px-4 py-2.5 md:px-6 md:py-3 rounded-xl bg-[#D1D5DB] text-black font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto"
            >
              <Camera className="w-4 h-4 md:w-5 md:h-5 shrink-0" aria-hidden />
              <span className="whitespace-nowrap">Ambil Dari Kamera</span>
            </button>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
