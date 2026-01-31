"use client";

import { useState } from "react";
import { ChevronDown, Save } from "lucide-react";
import { useAddUserMeals } from "@/hooks/useUserMeal";
import { UserMealTime } from "@/common/dto/usermealtimeDto";

interface NutritionValue {
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
}

interface FoodFormData {
  foodName: string;
  portion: number;
  time: { title: string; value: UserMealTime | "" };
}

interface FoodDetailFormProps {
  nutrition: NutritionValue;
}

export function FoodDetailForm({ nutrition }: FoodDetailFormProps) {
  const { mutate: addUserMeal, isPending } = useAddUserMeals();

  const [formData, setFormData] = useState<FoodFormData>({
    foodName: "",
    portion: 0,
    time: { title: "", value: "" },
  });

  const [showMealDropdown, setShowMealDropdown] = useState(false);

  const mealOptions: { text: string; value: UserMealTime }[] = [
    { text: "Makan Pagi", value: "BREAKFAST" },
    { text: "Makan Siang", value: "LUNCH" },
    { text: "Makan Malam", value: "DINNER" },
    { text: "Snack", value: "SNACK" },
  ];

  const handleSubmit = () => {
    if (!formData.foodName) {
      alert("Nama makanan wajib diisi");
      return;
    }

    if (!formData.time.value) {
      alert("Silakan pilih waktu makan");
      return;
    }

    addUserMeal({
      food_name: formData.foodName,
      portion: formData.portion,
      time: formData.time.value,

      calories: nutrition.calories,
      protein: nutrition.protein,
      fat: nutrition.fat,
      carbohydrate: nutrition.carbohydrate,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-base font-bold text-gray-900 mb-5">
        Konfirmasi Detail Makanan
      </h3>

      <div className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Makanan
          </label>
          <input
            type="text"
            value={formData.foodName}
            onChange={(e) =>
              setFormData({ ...formData, foodName: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-yellow-400"
            placeholder="Masukkan nama makanan"
          />
        </div>

        {/* Porsi & Waktu */}
        <div className="grid grid-cols-2 gap-4">
          {/* Porsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Porsi
            </label>
            <input
              type="number"
              value={formData.portion}
              onChange={(e) =>
                setFormData({ ...formData, portion: Number(e.target.value) })
              }
              className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Waktu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waktu Makan
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMealDropdown(!showMealDropdown)}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm flex justify-between items-center"
              >
                <span>{formData.time.title || "Pilih waktu makan"}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showMealDropdown && (
                <div className="absolute mt-2 w-full bg-white border rounded-xl shadow z-10">
                  {mealOptions.map(({ text, value }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          time: { title: text, value },
                        });
                        setShowMealDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="py-3 bg-gray-100 rounded-xl text-sm font-semibold">
            Batalkan
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="py-3 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Menyimpan..." : "Simpan ke Riwayat Harian"}
          </button>
        </div>
      </div>
    </div>
  );
}
