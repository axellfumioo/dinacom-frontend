"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DoctorCard } from "@/components/konsultant/DoctorCard";
import { ChatSidebar } from "@/components/konsultant/ChatSidebar";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { useGetAllDoctors, useGetAllUserDoctorChatRooms, useGetOrCreateDoctorChatRoom } from "@/hooks/useDoctorChat";
import { DoctorDto, DoctorChatRoomDto } from "@/common/dto/doctorChatDto";

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
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  // Fetch doctors and chat rooms from API
  const { data: doctorsData, isLoading: loadingDoctors } = useGetAllDoctors();
  const { data: chatRoomsData, isLoading: loadingChatRooms } = useGetAllUserDoctorChatRooms();

  // Transform backend data to frontend format
  const doctors: Doctor[] = doctorsData?.map((doc: DoctorDto, index: number) => ({
    id: parseInt(doc.ID) || index + 1,
    name: doc.name,
    rating: doc.rating,
    reviews: doc.reviews,
    price: doc.price,
    alumnus: doc.alumnus,
    practice: doc.practice,
    str: doc.str,
  })) || [];

  // Transform chat rooms to messages format for sidebar
  const messages = chatRoomsData?.map((room: DoctorChatRoomDto, index: number) => ({
    id: index + 1,
    doctorId: parseInt(room.doctor_id) || index + 1,
    doctorName: room.doctor?.name || "Doctor",
    lastMessage: room.last_message || "Mulai konsultasi",
    time: room.last_message_at ? new Date(room.last_message_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : "",
    roomId: room.ID,
  })) || [];

  const handleChat = (doctor: Doctor) => {
    // Store doctor info and navigate to chat
    localStorage.setItem('selectedDoctorId', doctor.id.toString());
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    
    router.push('/dashboard/konsultasi/chat');
  };

  const handleChatFromSidebar = (message: any) => {
    // Navigate to existing chat room
    if (message.roomId) {
      localStorage.setItem('selectedRoomId', message.roomId);
    }
    const doctor = doctors.find(d => d.id === message.doctorId);
    if (doctor) {
      localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    }
    router.push('/dashboard/konsultasi/chat');
  };

  if (loadingDoctors || loadingChatRooms) {
    return (
      <div className={`${containerWidth} mx-auto px-4 py-6 md:py-8`}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data dokter...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerWidth} mx-auto px-4 py-6 md:py-8`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* MAIN CONTENT */}
        <div className="flex-1">
          <h1 className="text-2xl font-thin text-gray-300 mb-4">
            ----Dokter Umum
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {doctors.slice(0, 3).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onChat={handleChat} />
            ))}
          </div>

          {doctors.length > 3 && (
            <>
              <h1 className="text-2xl font-thin text-gray-300 mb-4">
                ----Dokter Spesialis
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.slice(3).map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} onChat={handleChat} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* DESKTOP CHAT SIDEBAR */}
        <div className="hidden md:block w-80 shrink-0">
          <ChatSidebar 
            messages={messages} 
            activeDoctor={selectedDoctor} 
            onChatClick={handleChatFromSidebar}
          />
        </div>
      </div>

      {/* MOBILE CHAT BOTTOM SHEET */}
      {mobileChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Pesan</h2>
              <button
                onClick={() => setMobileChatOpen(false)}
                className="text-sm text-gray-500"
              >
                Tutup
              </button>
            </div>

            <ChatSidebar 
              messages={messages} 
              activeDoctor={selectedDoctor} 
              onChatClick={handleChatFromSidebar}
            />
          </div>
        </div>
      )}
    </div>
  );
}
