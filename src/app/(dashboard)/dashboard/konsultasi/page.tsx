"use client";

import React, { useMemo, useState } from 'react';
import { DoctorCard } from '@/components/konsultant/DoctorCard';
import { ChatSidebar } from '@/components/konsultant/ChatSidebar';
import { useSidebarLayout } from "@/components/ui/LayoutClient";

interface Doctor {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  alumnus: string;
  practice: string;
  str: string;
}

export default function KonsultanPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const { sidebarCollapsed } = useSidebarLayout();
    const containerWidth = useMemo(
      () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
      [sidebarCollapsed]
    );

  const doctors = [
    {
      id: 1,
      name: 'Dr. Elina Toba',
      rating: 4.8,
      reviews: 120,
      price: 'Rp25.000',
      alumnus: 'Universitas Kedokteran Airlangga, Surabaya, Indonesia 2012',
      practice: 'Senin-Rabu, 08:00-17:00',
      str: '1234567890',
    },
    {
      id: 2,
      name: 'Dr. Elina Toba',
      rating: 4.8,
      reviews: 120,
      price: 'Rp25.000',
      alumnus: 'Universitas Kedokteran Airlangga, Surabaya, Indonesia 2012',
      practice: 'Senin-Rabu, 08:00-17:00',
      str: '1234567890',
    },
    {
      id: 3,
      name: 'Dr. Elina Toba',
      rating: 4.8,
      reviews: 120,
      price: 'Rp25.000',
      alumnus: 'Universitas Kedokteran Airlangga, Surabaya, Indonesia 2012',
      practice: 'Senin-Rabu, 08:00-17:00',
      str: '1234567890',
    },
    {
      id: 4,
      name: 'Dr. Elina Toba',
      rating: 4.8,
      reviews: 120,
      price: 'Rp25.000',
      alumnus: 'Universitas Kedokteran Airlangga, Surabaya, Indonesia 2012',
      practice: 'Senin-Rabu, 08:00-17:00',
      str: '1234567890',
    },
  ];

  const messages = [
    {
      id: 1,
      doctorId: 1,
      doctorName: 'Dr. Elina Toba',
      lastMessage: 'Halo kak, ada yang bisa saya bantu?',
      time: '10:30'
    },
    {
      id: 2,
      doctorId: 2,
      doctorName: 'Dr. Elina Toba',
      lastMessage: 'Halo kak, ada yang bisa saya bantu?',
      time: '09:15'
    },
    {
      id: 3,
      doctorId: 3,
      doctorName: 'Dr. Elina Toba',
      lastMessage: 'Halo kak, ada yang bisa saya bantu?',
      time: '08:45'
    },
  ];

  const handleChat = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    console.log('Opening chat with:', doctor.name);
  };

  return (
<div className={`${containerWidth} mx-auto px-4 py-6 md:py-8`}>      <div className="container mx-auto px-4 py-2">
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-2xl font-thin text-gray-300 mb-2">----Dokter Umum</h1>
            </div>

            {/* Doctor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
              {doctors.slice(0, 3).map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onChat={handleChat} />
              ))}
            </div>

            {/* Specialist Section */}
            <div className="mb-4">
                            <h1 className="text-2xl font-thin text-gray-300 mb-2">----Dokter Umum</h1>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.slice(3, 4).map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onChat={handleChat} />
              ))}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 shrink-0">
            <ChatSidebar messages={messages} activeDoctor={selectedDoctor} />
          </div>
        </div>
      </div>
    </div>
  );

}