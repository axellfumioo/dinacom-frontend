import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Users, Trash2, Edit } from 'lucide-react';
import { Family } from '@/common/model/family';

interface FamilyProfileCardProps {
  family: Family
  onDelete: () => void
}

export const FamilyProfileCard = ({ family, onDelete }: FamilyProfileCardProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-sm sticky top-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-t-2xl p-6 text-center">
        <div className="bg-white w-32 h-32 rounded-full mx-auto mb-4 p-1">
          <Image
            alt="avatar"
            src={family.avatar}
            width={120}
            height={120}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-white drop-shadow-sm">
          {family.name}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Deskripsi
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {family.description || 'Tidak ada deskripsi'}
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {family.memberCount || 0}
              </p>
              <p className="text-sm text-gray-600">Anggota Keluarga</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onDelete}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border-2 border-red-200"
          >
            <Trash2 className="w-5 h-5" />
            Hapus Family
          </button>
        </div>
      </div>
    </div>
  );
};
