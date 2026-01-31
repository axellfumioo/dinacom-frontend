"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatInput } from "@/components/healtassistent/BtnChat";
import { ChatMessage } from "@/components/healtassistent/Message";
import { useSidebarLayout } from "@/components/ui/LayoutClient";
import { useChatSubmit } from "@/hooks/useChatSubmit";
import { useSearchParams } from "next/navigation";
import { useGetAIChatMessagesByChatID } from "@/hooks/useAIMessage";
import { useSocket } from "@/common/lib/socketIo";

export default function ChatAIPage() {
  const socket = useSocket();
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const chatId = searchParams.get("chatId");

  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidth = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed]
  );

  const { data: messagesData } =
    useGetAIChatMessagesByChatID(chatId || "");

  const messages = Array.isArray(messagesData) ? messagesData : [];

  const {
    handleSubmit,
    isDisabled,
    isLoading: submitLoading,
  } = useChatSubmit({
    chatId: chatId ?? "",
    input,
    setInput,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["AIMessages", chatId],
      });
    },
  });

  useEffect(() => {
    if (!chatId) return;
    socket?.emit("join:room", chatId);
  }, [socket, chatId]);

  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["AIMessages", chatId],
        refetchType: "all",
      });
    };

    socket?.on("refresh:room", handler);
    return () => {
      socket?.off("refresh:room", handler);
    };
  }, [socket, queryClient, chatId]);

  return (
    <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6 -mt-6`}>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Health Assistant AI
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Ada yang bisa aku bantu soal kesehatanmu hari ini?
        </p>
      </div>

      {/* CHAT FULL WIDTH */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm h-133.75 overflow-y-auto flex flex-col space-y-4">
          {/* EMPTY STATE */}
          {messages.length === 0 && !submitLoading && (
            <div className="flex-1 flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                Mulai chat dengan AI 
              </span>
            </div>
          )}

          {/* CHAT MESSAGES */}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* AI LOADING */}
          {submitLoading && (
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

        {/* INPUT */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
