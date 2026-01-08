import { User } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-gray-200" : "bg-yellow-400"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-gray-600" />
        ) : (
          <span className="text-sm font-bold text-gray-900">AI</span>
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? "bg-yellow-400 text-gray-900"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className="text-[10px] text-gray-600 mt-2 block">
          {message.timestamp.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}