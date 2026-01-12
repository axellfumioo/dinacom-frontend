"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatInput } from "@/components/healtassistent/BtnChat";
import { SuggestionCards } from "@/components/healtassistent/SuggestionAI";
import { NutritionSummary } from "@/components/healtassistent/RingkasanNutrition";
import { ChatMessage } from "@/components/healtassistent/Message";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { useChatSubmit } from "@/hooks/useChatSubmit";
import { useSuggestionChat } from "@/hooks/useSuggestionChat";
import { aiMessageService } from "@/services/AiMessageService";
import { aiChatService } from "@/services/AiChatService";
import { ChatList } from "@/components/healtassistent/ChatList";
import { useDeleteChat } from "@/hooks/useDeleteChat";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChatAIPage() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const chatId = searchParams.get("chatId");

  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );


  const { data: chatsData, isLoading: chatsLoading } = useQuery({
    queryKey: ["user-chats"],
    queryFn: () => aiChatService.GetUserAIChat(),
  });

  const chats = Array.isArray(chatsData?.data) ? chatsData.data : [];

  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => aiMessageService.getAIChatMessagesByChatID(chatId!),
    enabled: Boolean(chatId),
  });

  const messages = Array.isArray(messagesData) ? messagesData : [];


  const { handleSubmit, isDisabled, isLoading: submitLoading } = useChatSubmit({
    chatId: chatId ?? "",
    input,
    setInput,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", chatId],
      });
    },
  });


  const { handleSuggestionClick, isLoading: suggestionLoading } =
    useSuggestionChat({
      chatId: chatId ?? "",
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["messages", chatId],
        });
      },
    });

  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat();


  if (chatsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
      </div>
    );
  }


  if (!chatId && chats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Belum Ada Chat
          </h1>
          <p className="text-gray-600 mb-6">
            Mulai percakapan baru dengan Health Assistant AI
          </p>
          <button
            onClick={() => router.push("/dashboard/healtassistent/add")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl"
          >
            Buat Chat Baru
          </button>
        </div>
      </div>
    );
  }

  if (!chatId && chats.length > 0) {
    return (
      <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6 -mt-6`}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Health Assistant AI
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Pilih chat atau buat chat baru
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Daftar Chat
              </h2>
              <div className="space-y-3">
                {chats.map((chat) => (
                  <div
                    key={chat.ID}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => router.push(`/dashboard/healtassistent?chatId=${chat.ID}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Chat {chat.ID}
                      </p>
                      <p className="text-sm text-gray-600">
                        Dibuat pada {new Date(chat.CreatedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.ID);
                      }}
                      disabled={isDeleting}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push("/dashboard/healtassistent/add")}
                className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl"
              >
                Buat Chat Baru
              </button>
            </div>
          </div>

          <NutritionSummary />
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6 -mt-6`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Health Assistant AI
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Ada yang bisa aku bantu soal kesehatanmu hari ini?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHAT OR CHAT LIST */}
        <div className="lg:col-span-2 space-y-4">
          {chatId ? (
            <>
              {messages.length === 0 && (
                <SuggestionCards onSuggestionClick={handleSuggestionClick} />
              )}

              {messages.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[500px] max-h-[600px] overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}

                  {(submitLoading || suggestionLoading) && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">AI</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-4 flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                disabled={isDisabled}
              />
            </>
          ) : (
            <ChatList
              chats={chats}
              onDeleteChat={deleteChat}
              isDeleting={isDeleting}
            />
          )}
        </div>

        <NutritionSummary />
      </div>
    </div>
  );
}
