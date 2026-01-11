"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled = false }: ChatInputProps) {
  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSubmit();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tanyakan sesuatu tentang kesehatanmu..."
          className="flex-1 px-4 py-3 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center transition-all
            ${!disabled && value.trim()
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}