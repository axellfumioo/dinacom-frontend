"use client";

import { useUserMealsToday } from "@/hooks/useUserMeal";

export function UserMealToday() {
  const { data: meals = [], isLoading } = useUserMealsToday();

  if (isLoading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (meals.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center text-gray-400">
        Belum ada catatan makan hari ini
      </div>
    );
  }

  const displayedMeals = meals.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Hari Ini</h2>

      {displayedMeals.map((meal) => (
        <div
          key={meal.id}
          className="flex justify-between items-center border-b pb-3 last:border-none"
        >
          <div>
            <p className="font-medium">{meal.food_names}</p>
            <p className="text-xs text-gray-500">
              {meal.Calories} kkal · {meal.time}
            </p>
          </div>

          <span className="text-sm text-gray-600">
            {meal.food_names}
          </span>
        </div>
      ))}

      {meals.length > 5 && (
        <p className="text-xs text-gray-400 text-center">
          Menampilkan 5 dari {meals.length} makanan hari ini
        </p>
      )}
    </div>
  );
}
