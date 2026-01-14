'use client';

import React, { useState } from 'react';
import { FamilyMemberCard } from '@/components/parentalmode/FamilyMemberCard';
import { FamilyProfileCard } from '@/components/parentalmode/FamilyProfileCard';
import { useFamilyMembers } from '@/hooks/useFamilyMember';

export default function ParentalModePage() {
  const familyID = 'family-id-dari-backend'; 

  const {
    members,
    isLoading,
    addMember,
  } = useFamilyMembers(familyID);

  const [selectedMember, setSelectedMember] = useState(null);

  const familyData = {
    name: 'Hartono Family',
    profileImage: '/images/family-photo.jpg',
    createdDate: '01/01/2026',
  };

  const handleViewDetail = (member: any) => {
    setSelectedMember(member);
    console.log('Viewing detail for:', member.name);
  };

  const handleAddMember = () => {
    addMember({
      member: 'user-id-member-baru',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Family Care
          </h1>
          <p className="text-gray-600 text-lg">
            Pantau kesehatan keluarga, lebih mudah!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              {members?.map((member: any) => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          </div>

          {/* Family Profile */}
          <div>
            <FamilyProfileCard
              family={familyData}
              onAddMember={handleAddMember}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
