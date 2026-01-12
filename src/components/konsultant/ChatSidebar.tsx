import React from 'react';

interface Message {
  id: number;
  doctorId: number;
  doctorName: string;
  lastMessage: string;
  time: string;
}

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

export const ChatSidebar: React.FC<{ messages: Message[]; activeDoctor: Doctor | null }> = ({ messages, activeDoctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-10 ">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Pesan</h2>
      
      <div className="space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              activeDoctor?.id === message.doctorId ? 'bg-gray-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full shrink-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{message.doctorName}</h3>
                <span className="text-xs text-gray-400 ml-2">{message.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{message.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};