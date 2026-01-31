'use client';

import React, { useMemo, useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { MealCard } from '@/components/riwayatharian/MealCard';
import { ScanMealPrompt } from '@/components/riwayatharian/ScanMealPrompt';
import { useSidebarLayout } from '@/components/ui/LayoutClient';

export default function RiwayatHarianPage() {
  const { sidebarCollapsed } = useSidebarLayout();

  const [mealsToday] = useState([
    {
      id: 1,
      name: 'Oatmeal & Pisang',
      image: '/images/oatmeal.jpg',
      calories: 350,
      protein: 10,
      fat: 5,
      carbs: 60,
      mealType: 'Sarapan',
    },
    {
      id: 2,
      name: 'Telur Rebus',
      image: '/images/oatmeal.jpg',
      calories: 200,
      protein: 12,
      fat: 8,
      carbs: 2, 
      mealType: 'Sarapan',
    },
  ]);

  const [mealsHistory] = useState([
    {
      id: 3,
      name: 'Nasi Ayam',
      image: '/images/oatmeal.jpg',
      calories: 550,
      protein: 25,
      fat: 12,
      carbs: 70,
      mealType: 'Makan Siang',
    },
    {
      id: 4,
      name: 'Smoothie',
      image: '/images/oatmeal.jpg',
      calories: 180,
      protein: 6,
      fat: 3,
      carbs: 30,
      mealType: 'Snack',
    },
  ]);

  const handleScanMeal = () => {
    console.log('Opening camera to scan meal...');
  };

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? 'max-w-screen-2xl' : 'max-w-7xl'),
    [sidebarCollapsed]
  );

  return (
    <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6`}>
      <div className="mx-auto max-w-7xl py-8">
        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-6 h-6 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">
                Riwayat makan hari ini
              </h1>
            </div>

            <div className="space-y-4">
              {mealsToday.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>

            <ScanMealPrompt onScan={handleScanMeal} />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-6 h-6 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">
                Riwayat minggun ini
              </h1>
            </div>

            <div className="space-y-4">
              {mealsHistory.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
