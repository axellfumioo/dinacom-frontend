'use client';

import React, { useState } from 'react';
import { Flame, Droplet, Activity, Bell, Settings } from 'lucide-react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { NutritionCard } from '@/components/profile/NutritionCard';
import { StravaCard } from '@/components/profile/StravaCard';
import { SidebarCard } from '@/components/profile/SidebarCard';

export default function ProfilePage() {
  const [user] = useState({
    name: 'Dodi Mulya',
    avatar: '/images/avatar.jpg' // ganti dengan path gambar Anda
  });

  const [nutritionData] = useState({
    calories: { current: 420, target: 2000, value: '420', unit: 'kkal', label: 'Kalori' },
    protein: { current: 24, target: 150, value: '24g', unit: 'kkal', label: 'Protein' },
    carbs: { current: 18, target: 300, value: '18g', unit: 'kkal', label: 'Karbo' },
    fat: { current: 14, target: 65, value: '14g', unit: 'kkal', label: 'Lemak' }
  });

  const [stravaActivities] = useState({
    weekly: '4 Aktifitas',
    elevation: '480m',
    totalCalories: 2567
  });

  const handleSaveChanges = () => {
    console.log('Saving changes...');
  };

  const handleSync = () => {
    console.log('Syncing Strava data...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProfileHeader user={user} onSave={handleSaveChanges} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NutritionCard 
                icon={Flame}
                {...nutritionData.calories}
                color="orange"
              />
              <NutritionCard 
                icon={Activity}
                {...nutritionData.protein}
                color="blue"
              />
              <NutritionCard 
                icon={Droplet}
                {...nutritionData.carbs}
                color="yellow"
              />
              <NutritionCard 
                icon={Droplet}
                {...nutritionData.fat}
                color="red"
              />
            </div>

            <StravaCard activities={stravaActivities} onSync={handleSync} />
          </div>

          <div className="space-y-6">
            <SidebarCard icon={Bell} title="Notifikasi">
              <div className="h-32 flex items-center justify-center text-gray-400">
                <p className="text-sm">Tidak ada notifikasi</p>
              </div>
            </SidebarCard>

            <SidebarCard icon={Settings} title="Setelan">
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p className="text-sm">Pengaturan profil</p>
              </div>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div>
  );
}