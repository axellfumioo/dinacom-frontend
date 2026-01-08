"use client";

import { useMemo, useState } from "react";
import { FoodDetailForm } from "@/components/scan/FoodDetailForm";
import { Flame, Droplet, Cookie, Apple } from "lucide-react";
import { useSidebarLayout } from "@/components/ui/LayoutClient";

export default function ScanFoodPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&q=80" // Default toast image
  );

  const nutritionData = {
    calories: { value: 420, label: "Kalori", unit: "kcal", color: "bg-orange-500", icon: Flame },
    protein: { value: 24, label: "Protein", unit: "g", color: "bg-blue-500", icon: Droplet },
    carbs: { value: 18, label: "Karbo", unit: "g", color: "bg-yellow-500", icon: Cookie },
    fat: { value: 14, label: "Lemak", unit: "g", color: "bg-red-500", icon: Apple },
  };

      const { sidebarCollapsed } = useSidebarLayout();
    
      const containerWidth = useMemo(
        () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
        [sidebarCollapsed]
      );

  const handleSaveToHistory = (data: any) => {
    console.log("Saving to history:", data);
    // Here you would typically save to your backend or state management
    alert("Makanan berhasil disimpan ke riwayat harian!");
  };

  return (
 <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">NutriScan : Analisis Makanan</h1>
        <p className="text-sm text-gray-600 mt-1">
          Unggah atau ambil foto makananmu, AI akan menghitung nutrisi secara instan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Image & AI Info */}
        <div className="space-y-4">
          {/* Food Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Scanned food"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400">No image uploaded</p>
                </div>
              )}
            </div>

            {/* Upload Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Ulang
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ambil Foto
              </button>
            </div>
          </div>

          {/* AI Analysis Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Analisis AI Selesai</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Kami mendeteksi Salad Alpukat & Telur. Data nutrisi ditampilkan adalah estimasi 
                  berdasarkan porsi rata-rata. Silahkan sesuaikan jika diperlukan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Nutrition Data & Form */}
        <div className="space-y-6">
          {/* Nutrition Cards */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(nutritionData).map(([key, data]) => {
              const Icon = data.icon;
              return (
                <div key={key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${data.color.replace('bg-', 'bg-opacity-10 bg-')} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${data.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-xs text-gray-500">{data.unit}</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{data.value}</p>
                  <p className="text-sm text-gray-600">{data.label}</p>
                  <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${data.color} rounded-full`} style={{ width: '60%' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Food Detail Form */}
          <FoodDetailForm onSave={handleSaveToHistory} />

          {/* Nutrition Explanation */}
        </div>
      </div>
    </div>
  );
}