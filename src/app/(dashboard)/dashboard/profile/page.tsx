'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Droplet, Activity, Bell, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { NutritionCard } from '@/components/profile/NutritionCard';
import { StravaCard } from '@/components/profile/StravaCard';
import { SidebarCard } from '@/components/profile/SidebarCard';

import { useProfile } from '@/hooks/useProfile';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { UpdateProfileDto } from '@/common/dto/profileDto';

export default function ProfilePage() {
  const { updateProfile, loading, error } = useProfile();

  /**
   * ============================
   * GET CURRENT USER (useQuery)
   * ============================
   */
  const {
    data: currentUser,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const res = await useCurrentUser().getCurrentUser();
      return res;
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  // UI user (bukan DTO)
  const [user, setUser] = useState({
    name: '',
    avatar: '/images/avatar.jpg',
  });

  // Form state (DTO + name hanya untuk UI)
  const [profileData, setProfileData] = useState({
    name: '',
    date_of_birth: '',
    gender: '',
    height_cm: 0,
    weight_kg: 0,
    activity_level: '',
  });

  /**
   * ============================
   * SYNC DATA FROM QUERY
   * ============================
   */
  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name,
        avatar: '/images/avatar.jpg',
      });

      setProfileData((prev) => ({
        ...prev,
        name: currentUser.name,
      }));
    }
  }, [currentUser]);

  /**
   * ============================
   * UPDATE PROFILE
   * ============================
   */
  const handleSaveChanges = async () => {
    try {
      const dto: UpdateProfileDto = {
        date_of_birth: profileData.date_of_birth || undefined,
        gender: profileData.gender || undefined,
        height_cm: profileData.height_cm || undefined,
        weight_kg: profileData.weight_kg || undefined,
        activity_level: profileData.activity_level || undefined,
      };

      await updateProfile(dto);

      // update UI saja
      setUser((prev) => ({
        ...prev,
        name: profileData.name,
      }));

      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSync = () => {
    console.log('Syncing Strava data...');
  };

  /**
   * ============================
   * STATIC DATA
   * ============================
   */
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

  /**
   * ============================
   * LOADING STATE
   * ============================
   */
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
      </div>
    );
  }

  /**
   * ============================
   * UI (UNCHANGED)
   * ============================
   */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProfileHeader user={user} />

        {isEditing && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={profileData.gender}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Level
                </label>
                <select
                  value={profileData.activity_level}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      activity_level: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="">Select Activity Level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightly_active">Lightly Active</option>
                  <option value="moderately_active">Moderately Active</option>
                  <option value="very_active">Very Active</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="mb-6">
            <button
              onClick={handleEditToggle}
              className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NutritionCard icon={Flame} {...nutritionData.calories} color="orange" />
              <NutritionCard icon={Activity} {...nutritionData.protein} color="blue" />
              <NutritionCard icon={Droplet} {...nutritionData.carbs} color="yellow" />
              <NutritionCard icon={Droplet} {...nutritionData.fat} color="red" />
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
