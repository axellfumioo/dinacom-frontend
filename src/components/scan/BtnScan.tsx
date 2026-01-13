"use client";

import { Image as ImageIcon, Camera, LoaderIcon } from "lucide-react";
import { useRef, ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateFoodScan } from "@/hooks/ScanHook";
import { FoodScanDto } from "@/common/dto/foodscanDto";

export default function BtnScan() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: foodScanMutation, isPending } = useCreateFoodScan(setError);

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
    const dto: FoodScanDto = {
      image: file,
    };

    foodScanMutation(dto);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      {/* Upload */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-6 py-3 rounded-xl bg-[#FFE766] font-semibold flex gap-2 items-center"
      >
        {isPending ? (
          <>
            <LoaderIcon className="w-5 h-5 animate-spin" />
            Loading
          </>
        ) : (
          <>
            <ImageIcon className="w-5 h-5" />
            Upload Foto Makanan
          </>
        )}
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

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
