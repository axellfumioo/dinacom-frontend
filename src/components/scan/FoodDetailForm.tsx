"use client";

import { useState } from "react";
import { ChevronDown, Save } from "lucide-react";

interface FoodDetailFormProps {
  onSave: (data: FoodFormData) => void;
}

interface FoodFormData {
  foodName: string;
  portion: number;
  unit: string;
  mealTime: string;
}

export function FoodDetailForm({ onSave }: FoodDetailFormProps) {
  const [formData, setFormData] = useState<FoodFormData>({
    foodName: "Alpukat, Telur & Roti",
    portion: 350,
    unit: "gram",
    mealTime: "Makan Siang",
  });

  const [showMealDropdown, setShowMealDropdown] = useState(false);

  const mealOptions = [
    "Makan Pagi",
    "Makan Siang",
    "Makan Malam",
    "Snack Pagi",
    "Snack Sore",
  ];

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-base font-bold text-gray-900 mb-5">Konfirmasi Detail Makanan</h3>

      <div className="space-y-4">
        {/* Nama Makanan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Makanan
          </label>
          <input
            type="text"
            value={formData.foodName}
            onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Masukkan nama makanan"
          />
        </div>

        {/* Porsi & Waktu Makan */}
        <div className="grid grid-cols-2 gap-4">
          {/* Porsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Porsi
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.portion}
                onChange={(e) => setFormData({ ...formData, portion: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                {formData.unit}
              </span>
            </div>
          </div>

          {/* Waktu Makan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waktu Makan
            </label>
            <div className="relative">
              <button
                onClick={() => setShowMealDropdown(!showMealDropdown)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-left flex items-center justify-between"
              >
                <span>{formData.mealTime}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showMealDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  {mealOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFormData({ ...formData, mealTime: option });
                        setShowMealDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold text-gray-700 transition-colors">
            Batalkan
          </button>
          <button
            onClick={handleSubmit}
            className="py-3 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-sm font-semibold text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Simpan ke Riwayat Harian
          </button>
        </div>
      </div>
    </div>
  );
}