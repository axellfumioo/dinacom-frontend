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
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function ChatAIPage() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const { sidebarCollapsed } = useSidebarLayout();
  
  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  // Fetch user chats
  const { data: chatsData, isLoading: chatsLoading } = useQuery({
    queryKey: ['user-chats'],
    queryFn: () => aiChatService.GetUserAIChat(),
  });

  // Get chats array and chatId
  const chats = Array.isArray(chatsData?.data) ? chatsData.data : chatsData?.data ? [chatsData.data] : [];
  const chatId = chats.length > 0 ? chats[0].id : null;

  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => aiMessageService.getAIChatMessagesByChatID(chatId!),
    enabled: !!chatId,
  });

  const { handleSubmit, isDisabled, isLoading: submitLoading } = useChatSubmit({
    chatId: chatId || "",
    input,
    setInput,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
  });

  const { handleSuggestionClick, isLoading: suggestionLoading } = useSuggestionChat({
    chatId: chatId || "",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
  });

  // Conditional rendering
  if (chatsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading chats...</p>
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
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
            onClick={() => router.push('/dashboard/healtassistent/add')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Buat Chat Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6 -mt-6`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Health Assistant AI</h1>
        <p className="text-sm text-gray-600 mt-1">
          Ada yang bisa aku bantu soal kesehatanmu hari ini?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chat Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Suggestion Cards */}
          {messages.length === 0 && (
            <SuggestionCards onSuggestionClick={handleSuggestionClick} />
          )}

          {/* Chat Messages */}
          {messages.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[500px] max-h-[600px] overflow-y-auto space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {(submitLoading || suggestionLoading) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">AI</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat Input */}
          <ChatInput 
            value={input} 
            onChange={setInput} 
            onSubmit={handleSubmit} 
            disabled={isDisabled} 
          />
        </div>

        {/* Right Column - Nutrition Summary */}
        <div>
          <NutritionSummary />
        </div>
      </div>
    </div>
  );
}