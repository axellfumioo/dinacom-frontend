import React from "react";

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
}

export const ChatSidebar: React.FC<{
  messages: Message[];
  activeDoctor: Doctor | null;
}> = ({ messages, activeDoctor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Pesan</h2>

      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 p-3 rounded-lg transition ${
              activeDoctor?.id === message.doctorId
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="w-10 h-10 bg-blue-200 rounded-full shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-sm">
                <span className="font-semibold truncate">
                  {message.doctorName}
                </span>
                <span className="text-gray-400">{message.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {message.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
