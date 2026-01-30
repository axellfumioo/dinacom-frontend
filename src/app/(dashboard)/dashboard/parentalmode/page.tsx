'use client';

import React from 'react';
import { useGetFamily, useDeleteFamily } from '@/hooks/useFamily';
import { useGetFamilyMembers } from '@/hooks/useMember';
import { useRouter } from 'next/navigation';
import { FamilyProfileCard } from '@/components/parentalmode/FamilyProfileCard';
import { FamilyMemberCard } from '@/components/parentalmode/FamilyMemberCard';
import { AddFamilyMemberForm } from '@/components/parentalmode/AddMember';

export default function ParentalModePage() {
  const router = useRouter();
  const { data: family, isLoading } = useGetFamily();
  const deleteFamily = useDeleteFamily();

  const { data: members, isLoading: membersLoading } =
    useGetFamilyMembers(family?.id);

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (!family) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Belum ada family</h1>
        <button
          onClick={() => router.push('/dashboard/parentalmode/add')}
          className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold"
        >
          Create Family
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Members */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <AddFamilyMemberForm familyID={family.id} />

          {membersLoading && <p>Loading members...</p>}

          {members?.map((member: any) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              onViewDetail={() => {}}
            />
          ))}
        </div>

        {/* Profile */}
        <FamilyProfileCard
          family={family}
          onDelete={() => deleteFamily.mutate(family.id)}
        />
      </div>
    </div>
  );
}
