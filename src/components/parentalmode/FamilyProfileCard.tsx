import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Family } from '@/common/model/family';

interface FamilyProfileCardProps {
  family: Family
  onDelete: () => void
}

export const FamilyProfileCard = ({ family, onDelete }: FamilyProfileCardProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm relative">
      <div className="flex flex-col items-center text-center">
        <Image
          alt="avatar"
          src={family.avatar_url}
          className="w-40 h-40 rounded-full object-cover mb-4"
        />

        <h2 className="text-2xl font-bold">{family.name}</h2>
        <p className="text-gray-500 mb-6">{family.description}</p>

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/dashboard/parentalmode/add-member')}
            className="bg-yellow-400 px-5 py-2 rounded-lg"
          >
            Add Member
          </button>

          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Delete Family
          </button>
        </div>
      </div>
    </div>
  );
};
