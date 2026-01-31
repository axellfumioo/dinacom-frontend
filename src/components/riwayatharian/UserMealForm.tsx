"use client";

import { useState } from "react";
import { ChevronDown, Save } from "lucide-react";
import { useAddUserMeals } from "@/hooks/useUserMeal";
import { UserMealTime } from "@/common/dto/usermealtimeDto";

interface FormData {
  foodName: string;
  portion: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  time: {
    title: string;
    value: UserMealTime | "";
  };
}

export function UserMealForm() {
  const { mutate: addUserMeal, isPending } = useAddUserMeals();
  const [showMealDropdown, setShowMealDropdown] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    foodName: "",
    portion: 1,
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    time: { title: "", value: "" },
  });

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
      calories: formData.calories,
      protein: formData.protein,
      fat: formData.fat,
      carbohydrate: formData.carbohydrate,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-base font-bold text-gray-900 mb-5">
        Tambah Makanan Manual
      </h3>

      <div className="space-y-4">
        {/* Nama Makanan */}
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
            placeholder="Contoh: Nasi Goreng"
          />
        </div>

        {/* Nutrisi */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Kalori (kkal)"
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            onChange={(e) =>
              setFormData({ ...formData, calories: +e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Protein (g)"
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            onChange={(e) =>
              setFormData({ ...formData, protein: +e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Lemak (g)"
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            onChange={(e) =>
              setFormData({ ...formData, fat: +e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Karbohidrat (g)"
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            onChange={(e) =>
              setFormData({ ...formData, carbohydrate: +e.target.value })
            }
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
                setFormData({
                  ...formData,
                  portion: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            />
          </div>

          {/* Waktu Makan */}
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
                <span>
                  {formData.time.title || "Pilih waktu makan"}
                </span>
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            className="py-3 bg-gray-100 rounded-xl text-sm font-semibold"
            onClick={() =>
              setFormData({
                foodName: "",
                portion: 1,
                calories: 0,
                protein: 0,
                fat: 0,
                carbohydrate: 0,
                time: { title: "", value: "" },
              })
            }
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="py-3 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Menyimpan..." : "Simpan ke Riwayat"}
          </button>
        </div>
      </div>
    </div>
  );
}
