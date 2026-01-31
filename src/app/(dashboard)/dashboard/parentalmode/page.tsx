'use client';

import React, { useState } from 'react';
import { useGetFamily, useDeleteFamily } from '@/hooks/useFamily';
import { useGetFamilyMembers } from '@/hooks/useMember';
import { useRouter } from 'next/navigation';
import { FamilyProfileCard } from '@/components/parentalmode/FamilyProfileCard';
import { FamilyMemberCard } from '@/components/parentalmode/FamilyMemberCard';
import { AddFamilyMemberForm } from '@/components/parentalmode/AddMember';
import { MemberDetailModal } from '@/components/parentalmode/MemberDetailModal';
import { Users, Plus } from 'lucide-react';

export default function ParentalModePage() {
  const router = useRouter();
  const { data: family, isLoading } = useGetFamily();
  const deleteFamily = useDeleteFamily();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { data: members, isLoading: membersLoading } =
    useGetFamilyMembers(family?.data.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!isLoading && !family?.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Belum ada Family</h1>
          <p className="text-gray-600 mb-6">
            Mulai pantau kesehatan keluarga dengan membuat family terlebih dahulu
          </p>
          <button
            onClick={() => router.push('/dashboard/parentalmode/add')}
            className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors w-full"
          >
            Buat Family
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mode Parental
          </h1>
          <p className="text-gray-600">
            Pantau dan kelola kesehatan anggota keluarga Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Family Profile - Sidebar */}
          <div className="lg:col-span-1">
            <FamilyProfileCard
              family={family}
              onDelete={() => deleteFamily.mutate(family?.data.id || '')}
            />
          </div>

          {/* Members List - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm">
              {/* Header with Add Button */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Anggota Keluarga
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {members?.length || 0} anggota terdaftar
                  </p>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Member
                </button>
              </div>

              {/* Add Member Form */}
              {showAddForm && (
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <AddFamilyMemberForm familyID={family?.data.id || ''} />
                </div>
              )}

              {/* Members List */}
              <div className="p-6">
                {membersLoading && (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
                  </div>
                )}

                {!membersLoading && members?.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium mb-2">
                      Belum ada anggota keluarga
                    </p>
                    <p className="text-sm text-gray-400">
                      Tambahkan anggota untuk mulai memantau kesehatan mereka
                    </p>
                  </div>
                )}

                {!membersLoading && members && members.length > 0 && (
                  <div className="space-y-4">
                    {members.map((member: any) => (
                      <FamilyMemberCard
                        key={member.id}
                        member={member}
                        onViewDetail={(m) => setSelectedMember(m)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
