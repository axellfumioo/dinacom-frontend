"use client";

import { useMemo, useState } from "react";
import { ChatInput } from "@/components/healtassistent/BtnChat";
import { SuggestionCards } from "@/components/healtassistent/SuggestionAI";
import { NutritionSummary } from "@/components/healtassistent/RingkasanNutrition";
import { ChatMessage } from "@/components/healtassistent/Message";
import { useSidebarLayout } from "@/components/ui/LayoutClient";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function ChatAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

    const { sidebarCollapsed } = useSidebarLayout();
  
    const containerWidth = useMemo(
      () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
      [sidebarCollapsed]
    );

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Terima kasih atas pertanyaan Anda. Saya akan membantu menjawab pertanyaan kesehatan Anda dengan informasi yang akurat dan bermanfaat.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className={`${containerWidth} mx-auto px-4 min-h-screen py-6`}>
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
              
              {isTyping && (
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
          <ChatInput onSendMessage={handleSendMessage} />
        </div>

        {/* Right Column - Nutrition Summary */}
        <div>
          <NutritionSummary />
        </div>
      </div>
    </div>
  );
}