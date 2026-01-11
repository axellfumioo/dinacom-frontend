"use client";

import { useRouter } from "next/navigation";
import { useCreateChat } from "@/hooks/useCreateChat";

export default function AddChatPage() {
  const router = useRouter();

  const { createChat, isLoading } = useCreateChat({
    onSuccess: (chatId) => {
        router.push(`/dashboard/healtassistent?chatId=${chatId}`)
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Buat Chat Baru
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Mulai percakapan baru dengan Health Assistant AI
        </p>

        <button
          onClick={() => createChat()}
          disabled={isLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          {isLoading ? "Membuat Chat..." : "Buat Chat Baru"}
        </button>
      </div>
    </div>
  );
}
