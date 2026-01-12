'use client';

import React, { useState } from 'react';
import { FamilyMemberCard } from '@/components/parentalmode/FamilyMemberCard';
import { FamilyProfileCard } from '@/components/parentalmode/FamilyProfileCard';

export default function ParentalModePage() {
  const [selectedMember, setSelectedMember] = useState(null);

  const familyData = {
    name: 'Hartono Family',
    profileImage: '/images/family-photo.jpg', 
    createdDate: '01/01/2026'
  };

  const familyMembers = [
    {
      id: 1,
      name: 'Ayah',
      avatar: '/images/avatar1.jpg',
      currentCalories: 1250,
      targetCalories: 2000
    },
    {
      id: 2,
      name: 'Ayah',
      avatar: '/images/avatar2.jpg',
      currentCalories: 1250,
      targetCalories: 2000
    },
    {
      id: 3,
      name: 'Ayah',
      avatar: '/images/avatar3.jpg',
      currentCalories: 1250,
      targetCalories: 2000
    }
  ];

  const handleViewDetail = (member) => {
    setSelectedMember(member);
    console.log('Viewing detail for:', member.name);
  };

  const handleAddMember = () => {
    console.log('Adding new family member');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Family Care</h1>
          <p className="text-gray-600 text-lg">Pantau kesehatan keluarga, lebih mudah!</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Family Members List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <FamilyMemberCard 
                  key={member.id} 
                  member={member} 
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Family Profile */}
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