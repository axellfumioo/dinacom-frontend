'use client';

import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { MealCard } from '@/components/riwayatharian/MealCard';
import { ScanMealPrompt } from '@/components/riwayatharian/ScanMealPrompt';
import { PlaceholderCard } from '@/components/riwayatharian/PlaceholderCard';

export default function RiwayatHarianPage() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: 'oatmeal & pisang',
      image: '/images/oatmeal.jpg', // ganti dengan path gambar Anda
      calories: 350,
      protein: 10,
      fat: 5,
      carbs: 60,
      mealType: 'Sarapan'
    },
    {
      id: 2,
      name: 'oatmeal & pisang',
      image: '/images/oatmeal.jpg',
      calories: 350,
      protein: 10,
      fat: 5,
      carbs: 60,
      mealType: 'Sarapan'
    }
  ]);

  const handleScanMeal = () => {
    console.log('Opening camera to scan meal...');
    // Implement scan functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Meal History */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">Riwayat makan hari ini</h1>
            </div>

            {/* Meal Cards */}
            <div className="space-y-4">
              {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>

            {/* Scan Meal Prompt */}
            <ScanMealPrompt onScan={handleScanMeal} />
          </div>

          {/* Right Column - Placeholders */}
          <div className="space-y-6">
            <PlaceholderCard className="h-48" />
            <PlaceholderCard className="h-96" />
          </div>
        </div>
      </div>
    </div>
  );
}