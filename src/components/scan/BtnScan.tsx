"use client";

import { Image as ImageIcon, Camera } from "lucide-react";
import React, { useRef, ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useImageInput } from "@/hooks/ScanHook";
import { FoodScanDto } from "@/common/dto/foodscanDto";

export default function BtnScan() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanMutation = useImageInput(setError);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMobile(
        /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const dto: FoodScanDto = {
      image: file,
    };

    scanMutation.mutate(dto, {
      onSuccess: () => {
        router.push(`/dashboard/scanmakanan/result?image=${encodeURIComponent(previewUrl)}`);
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      {/* Upload */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-6 py-3 rounded-xl bg-[#FFE766] font-semibold flex gap-2 items-center"
      >
        <ImageIcon className="w-5 h-5" />
        Upload Foto Makanan
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Camera (mobile) */}
      {isMobile && (
        <>
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="px-6 py-3 rounded-xl bg-gray-200 font-semibold flex gap-2 items-center"
          >
            <Camera className="w-5 h-5" />
            Ambil Dari Kamera
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

      {scanMutation.isPending && (
        <p className="text-sm text-gray-500">Scanning...</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
