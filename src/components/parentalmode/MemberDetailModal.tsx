'use client';

import React from 'react';
import Image from 'next/image';
import { X, TrendingUp, TrendingDown, Activity, Apple, Flame, Target } from 'lucide-react';
import { FamilyMember } from './FamilyMemberCard';

interface Props {
  member: FamilyMember;
  onClose: () => void;
}

export const MemberDetailModal: React.FC<Props> = ({ member, onClose }) => {
  const progressPercentage = (member.currentCalories / member.targetCalories) * 100;
  const remainingCalories = member.targetCalories - member.currentCalories;
  const isOnTrack = progressPercentage >= 50 && progressPercentage <= 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Detail Anggota</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <Image
              src={member.avatar}
              alt={member.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isOnTrack 
                    ? 'bg-green-100 text-green-700' 
                    : progressPercentage > 100 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {isOnTrack ? '✓ Sesuai target' : progressPercentage > 100 ? '⚠ Melebihi target' : '⏳ Perlu ditingkatkan'}
                </span>
              </div>
            </div>
          </div>

          {/* Calorie Progress Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <h4 className="font-bold text-gray-900">Progress Kalori Hari Ini</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <span className="text-4xl font-bold text-gray-900">
                      {member.currentCalories.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">/ {member.targetCalories.toLocaleString()} kkal</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progressPercentage > 100 ? 'bg-red-500' : 'bg-gradient-to-r from-yellow-400 to-orange-400'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-yellow-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Target Harian</p>
                  <p className="text-xl font-bold text-gray-900">{member.targetCalories.toLocaleString()}</p>
                </div>
                <div className="h-12 w-px bg-yellow-200"></div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Sudah Tercapai</p>
                  <p className="text-xl font-bold text-gray-900">{member.currentCalories.toLocaleString()}</p>
                </div>
                <div className="h-12 w-px bg-yellow-200"></div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Sisa Target</p>
                  <p className={`text-xl font-bold ${remainingCalories > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                    {remainingCalories > 0 ? remainingCalories.toLocaleString() : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Aktivitas</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">5 aktivitas</p>
              <p className="text-xs text-gray-500 mt-1">Minggu ini</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Apple className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Makanan</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">12 scan</p>
              <p className="text-xs text-gray-500 mt-1">Minggu ini</p>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-purple-600" />
              <h4 className="font-bold text-gray-900">Ringkasan Mingguan</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rata-rata kalori harian</span>
                <span className="font-bold text-gray-900">1,850 kkal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Target tercapai</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">5 dari 7 hari</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Aktivitas tercatat</span>
                <span className="font-bold text-gray-900">320 menit</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl transition-colors">
              Lihat Riwayat Lengkap
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
