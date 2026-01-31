"use client";

import { useUserMealsToday } from "@/hooks/useUserMeal";
import { UserMeal } from "@/common/dto/usermealDto";

export function UserMealTodayCard() {
  const { data: meals = [], isLoading } = useUserMealsToday();

  if (isLoading) {
    return (
      <div className="border rounded-xl p-4 w-full text-sm text-gray-400">
        Loading...
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="border rounded-xl p-4 w-full text-sm text-gray-400">
        Belum ada makanan hari ini
      </div>
    );
  }

  // 🔹 Ambil 3 makanan terakhir hari ini
  const last3Meals: UserMeal[] = [...meals]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 3);

  return (
    <div className="border rounded-xl p-4 w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Makanan Hari Ini
        </p>
        <p className="text-[10px] text-gray-400">
          {last3Meals.length} terakhir
        </p>
      </div>

      {/* List makanan – FULL WIDTH */}
      <div className="space-y-3">
        {last3Meals.map((meal) => (
          <div
            key={meal.id}
            className="flex items-center justify-between w-full"
          >
            {/* Kiri */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {meal.food_names}
              </p>
              <p className="text-xs text-gray-400">
                {meal.time}
              </p>
            </div>

            {/* Kanan */}
            <div className="ml-4 text-right shrink-0">
              <p className="text-sm font-semibold text-gray-700">
                {meal.Calories} kkal
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all"
          style={{
            width: `${Math.min(last3Meals.length * 33.33, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
