"use client";

import { AIChatDto } from "@/common/dto/ai/aiChatDto";

interface ChatListProps {
  chats: AIChatDto[];
  isDeleting?: boolean;
  onDeleteChat: (id: string) => void;
  onChatSelect: (id: string) => void; // ✅ WAJIB ADA
}

export function ChatList({
  chats,
  isDeleting,
  onDeleteChat,
  onChatSelect,
}: ChatListProps) {
  return (
    <div className="space-y-3">
      {chats.map((chat) => (
        <div
          key={chat.ID}
          className="flex justify-between items-center p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-50"
          onClick={() => onChatSelect(chat.ID)}
        >
          <span className="font-medium">Chat {chat.ID.slice(0, 6)}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteChat(chat.ID);
            }}
            disabled={isDeleting}
            className="text-red-500 text-sm"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}
