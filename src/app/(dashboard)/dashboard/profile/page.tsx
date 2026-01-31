"use client";

import React, { useState, useEffect } from 'react';
import { Flame, Droplet, Activity, Bell, Settings } from 'lucide-react';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { NutritionCard } from '@/components/profile/NutritionCard';
import { StravaCard } from '@/components/profile/StravaCard';
import { SidebarCard } from '@/components/profile/SidebarCard';

import { useProfile } from '@/hooks/useProfile';
import { ProfileModel } from '@/common/model/profile';
import { UpdateProfileDto } from '@/common/dto/profileDto';

export default function ProfilePage() {
  const { useCurrentProfile, updateProfile } = useProfile();

  const { data: profile, isLoading } = useCurrentProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    date_of_birth: '',
    height_cm: 0,
    weight_kg: 0,
    activity_level: '',
  });

  useEffect(() => {
    if (!profile) return;

    const data = profile as ProfileModel;

    setProfileData({
      date_of_birth: data.date_of_birth
        ? data.date_of_birth.split('T')[0]
        : '',
      height_cm: data.height_cm ?? 0,
      weight_kg: data.weight_kg ?? 0,
      activity_level: data.activity_level ?? '',
    });
  }, [profile]);

  const handleSaveChanges = async () => {
    const dto: UpdateProfileDto = {
      ...(profileData.date_of_birth
        ? {
            date_of_birth: new Date(
              profileData.date_of_birth
            ).toISOString(),
          }
        : {}),
      ...(profileData.height_cm > 0 && {
        height_cm: profileData.height_cm,
      }),
      ...(profileData.weight_kg > 0 && {
        weight_kg: profileData.weight_kg,
      }),
      ...(profileData.activity_level && {
        activity_level: profileData.activity_level,
      }),
    };

    await updateProfile.mutateAsync(dto);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
      </div>
    );
  }

  const nutritionData = {
    calories: { current: 420, target: 2000, value: '420', unit: 'kkal', label: 'Kalori' },
    protein: { current: 24, target: 150, value: '24g', unit: 'kkal', label: 'Protein' },
    carbs: { current: 18, target: 300, value: '18g', unit: 'kkal', label: 'Karbo' },
    fat: { current: 14, target: 65, value: '14g', unit: 'kkal', label: 'Lemak' },
  };

  const stravaActivities = {
    weekly: '4 Aktifitas',
    elevation: '480m',
    totalCalories: 2567,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProfileHeader />

        {isEditing && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Edit Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profileData.date_of_birth}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      date_of_birth: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={profileData.height_cm}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      height_cm: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={profileData.weight_kg}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      weight_kg: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveChanges}
                disabled={updateProfile.isPending}
                className="px-6 py-3 bg-yellow-400 rounded-xl font-semibold"
              >
                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-300 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-xl"
          >
            Edit Profile
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NutritionCard icon={Flame} {...nutritionData.calories} color="orange" />
              <NutritionCard icon={Activity} {...nutritionData.protein} color="blue" />
              <NutritionCard icon={Droplet} {...nutritionData.carbs} color="yellow" />
              <NutritionCard icon={Droplet} {...nutritionData.fat} color="red" />
            </div>

            <StravaCard activities={stravaActivities} onSync={() => {}} />
          </div>

          <div className="space-y-6">
            <SidebarCard icon={Bell} title="Notifikasi">
              <p className="text-sm text-gray-400 text-center">
                Tidak ada notifikasi
              </p>
            </SidebarCard>

            <SidebarCard icon={Settings} title="Setelan">
              <p className="text-sm text-gray-400 text-center">
                Pengaturan profil
              </p>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div>
  );
}