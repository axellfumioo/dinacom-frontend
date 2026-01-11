"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { aiMessageService } from "@/services/AiMessageService";
import { ChatMessage } from "@/components/healtassistent/Message";
import { ChatInput } from "@/components/healtassistent/BtnChat";
import { SuggestionCards } from "@/components/healtassistent/SuggestionAI";
import { useChatSubmit } from "@/hooks/useChatSubmit";

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => aiMessageService.getAIChatMessagesByChatID(id),
    enabled: Boolean(id),
  });

  const messages = Array.isArray(data?.data) ? data.data : [];

  const { handleSubmit, isLoading: sending } = useChatSubmit({
    chatId: id,
    input,
    setInput,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-yellow-400 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm p-4 min-h-[500px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <SuggestionCards onSuggestionClick={() => {}} />
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {sending && (
          <div className="text-sm text-gray-400">AI sedang mengetik...</div>
        )}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={sending}
      />
    </div>
  );
}
