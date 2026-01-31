"use client";

import { useState } from "react";
import { useGetUserMeals } from "@/hooks/useUserMeal";

export function UserMealHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUserMeals(page, 10);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Riwayat Makanan</h2>

      {data?.data.map((meal) => (
        <div
          key={meal.id}
          className="flex justify-between border-b pb-3 last:border-none"
        >
          <div>
            <p className="font-medium">{meal.food_names}</p>
            <p className="text-xs text-gray-500">
              {new Date(meal.created_at).toLocaleDateString()}
            </p>
          </div>
          <span>{meal.Calories} kkal</span>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Prev
        </button>

        <button
          disabled={page === data?.pagination.total_pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
