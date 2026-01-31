"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Smile,
  Paperclip,
  ArrowLeft,
  Star,
  User,
  CheckCheck,
  Clock,
  ImagePlus
} from "lucide-react";
import { useGetAllUserDoctorChatRooms, useGetOrCreateDoctorChatRoom } from "@/hooks/useDoctorChat";
import { useGetMessagesByRoomID, useCreateDoctorMessage } from "@/hooks/useDoctorChatMessage";
import { DoctorChatRoomDto, DoctorChatMessageDto } from "@/common/dto/doctorChatDto";

interface Doctor {
  id: number;
  name: string;
  avatar?: string;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "user" | "doctor";
}

interface Conversation {
  id: number;
  roomId: string;
  doctor: Doctor;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export default function KonsultanPage() {
  const router = useRouter();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { sidebarCollapsed } = useSidebarLayout();

  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  // Fetch all user's chat rooms
  const { data: chatRoomsData, isLoading: loadingRooms } = useGetAllUserDoctorChatRooms();
  
  // Fetch messages for selected room
  const { data: messagesData, isLoading: loadingMessages } = useGetMessagesByRoomID(currentRoomId || "");
  
  // Mutation for creating new message
  const createMessageMutation = useCreateDoctorMessage();

  // Transform chat rooms data
  const conversations: Conversation[] = chatRoomsData?.map((room: DoctorChatRoomDto, index: number) => ({
    id: index + 1,
    roomId: room.ID,
    doctor: {
      id: parseInt(room.doctor_id) || index + 1,
      name: room.doctor?.name || "Doctor",
    },
    lastMessage: room.last_message || "Mulai konsultasi",
    lastMessageTime: room.last_message_at 
      ? new Date(room.last_message_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      : "Baru",
    unread: 0,
  })) || [];

  // Transform messages data
  const messages: Message[] = messagesData?.map((msg: DoctorChatMessageDto) => ({
    id: msg.ID,
    text: msg.message,
    time: new Date(msg.CreatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    sender: msg.sender_type,
  })) || [];

  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  // Load doctor from localStorage and get or create chat room
  useEffect(() => {
    const savedDoctorId = localStorage.getItem('selectedDoctorId');
    const savedRoomId = localStorage.getItem('selectedRoomId');
    const savedDoctor = localStorage.getItem('selectedDoctor');

    if (savedRoomId && chatRoomsData) {
      // Find existing conversation by room ID
      const existingConv = conversations.find(c => c.roomId === savedRoomId);
      if (existingConv) {
        setSelectedConversation(existingConv);
        setCurrentRoomId(savedRoomId);
      }
      localStorage.removeItem('selectedRoomId');
    } else if (savedDoctorId && savedDoctor && chatRoomsData) {
      const doctor = JSON.parse(savedDoctor);
      const doctorIdNum = parseInt(savedDoctorId);
      
      // Check if conversation already exists
      const existingConv = conversations.find(c => c.doctor.id === doctorIdNum);
      if (existingConv) {
        setSelectedConversation(existingConv);
        setCurrentRoomId(existingConv.roomId);
      } else {
        // Create new conversation object (room will be created when sending first message)
        const newConv: Conversation = {
          id: parseInt(savedDoctorId) || 0,
          roomId: "", // Will be set when room is created
          doctor: {
            id: parseInt(savedDoctorId) || 0,
            name: doctor.name,
          },
          lastMessage: "Mulai konsultasi",
          lastMessageTime: "Baru",
          unread: 0,
        };
        setSelectedConversation(newConv);
      }
      
      localStorage.removeItem('selectedDoctorId');
      localStorage.removeItem('selectedDoctor');
    }
  }, [chatRoomsData]);

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedConversation) {
      try {
        let roomId = currentRoomId;
        
        // If no room exists yet, we need the backend to create it via GetOrCreateDoctor endpoint
        // But since we're sending a message, the room should already exist
        // If not, you may need to call GetOrCreateDoctorChatRoom first
        
        if (!roomId) {
          // This shouldn't happen if the flow is correct
          console.error("No room ID available");
          return;
        }

        await createMessageMutation.mutateAsync({
          room_id: roomId,
          message: messageText.trim(),
        });

        setMessageText("");
        
        // Simulate doctor typing
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.doctor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentRoomId(conversation.roomId);
  };

  if (loadingRooms) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat percakapan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Tombol Kembali */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white border-b border-gray-200">
        <button 
          onClick={() => router.push('/dashboard/konsultasi')}
          className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Kembali ke Daftar Dokter</span>
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-white via-gray-50 to-white shadow-xl border-t border-gray-100 overflow-hidden flex-1 flex">
        {/* LEFT SIDEBAR - Chat List */}
        <div className={`${selectedConversation ? "hidden md:flex" : "flex"} flex-col w-full md:w-96 border-r border-gray-200 bg-white/50 backdrop-blur-sm`}>
          {/* Header */}
          <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-amber-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               Konsultasi
            </h2>
            
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-yellow-500" />
              <input
                type="text"
                placeholder="Cari dokter..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationSelect(conversation)}
                className={`group flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 relative ${
                  selectedConversation?.id === conversation.id 
                    ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500" 
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg transition-transform duration-200 ${
                    selectedConversation?.id === conversation.id ? "scale-110" : "group-hover:scale-105"
                  }`}>
                    <User className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-yellow-600 transition-colors">
                      {conversation.doctor.name}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0 ml-2 font-medium">{conversation.lastMessageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 ml-2 shadow-md">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Room */}
        <div className={`${selectedConversation ? "flex" : "hidden md:flex"} flex-col flex-1`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-yellow-400 shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">{selectedConversation.doctor.name}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
                    <Phone className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                  </button>
                  <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
                    <Video className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </button>
                  <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
                    <MoreVertical className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Memuat pesan...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {/* Date Divider */}
                    <div className="flex items-center justify-center">
                      <div className="bg-gray-200 text-gray-600 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
                        Hari ini
                      </div>
                    </div>

                    {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2 ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                          message.sender === "user" 
                            ? "bg-gradient-to-br from-gray-400 to-gray-600" 
                            : "bg-gradient-to-br from-blue-400 to-blue-600"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Star className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className="flex flex-col gap-1 max-w-[70%]">
                        <div
                          className={`group relative rounded-2xl p-4 transition-all duration-200 ${
                            message.sender === "user"
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 shadow-lg hover:shadow-xl rounded-br-md"
                              : "bg-white text-gray-900 border border-gray-200 shadow-md hover:shadow-lg rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          
                          {/* Message Status & Time */}
                          <div className={`flex items-center gap-1 mt-2 ${
                            message.sender === "user" ? "justify-end" : ""
                          }`}>
                            <span className={`text-[10px] font-medium ${
                              message.sender === "user" ? "text-gray-700" : "text-gray-500"
                            }`}>
                              {message.time}
                            </span>
                            {message.sender === "user" && (
                              <CheckCheck className="w-3 h-3 text-blue-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 shadow-md">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-md">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white shadow-lg">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all duration-200">
                    <button className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200 group">
                      <Smile className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200 group">
                      <Paperclip className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200 group">
                      <ImagePlus className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors" />
                    </button>
                    
                    <input
                      type="text"
                      placeholder="Ketik pesan..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none placeholder:text-gray-400"
                    />
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim() || createMessageMutation.isPending}
                      className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-200 disabled:to-gray-300 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed group"
                    >
                      {createMessageMutation.isPending ? (
                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5 text-gray-900 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pilih Percakapan</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Pilih dokter dari daftar untuk memulai konsultasi dan dapatkan bantuan medis profesional</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
