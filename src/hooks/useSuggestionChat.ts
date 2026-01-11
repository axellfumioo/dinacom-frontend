import { useMutation } from "@tanstack/react-query";
import { aiMessageService } from "@/services/AiMessageService";
import { CreateMessageRequestDto } from "@/common/dto/ai/ai_messageDto";
import toast from "react-hot-toast";

interface UseSuggestionChatProps {
  chatId: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useSuggestionChat({ chatId, onSuccess, onError }: UseSuggestionChatProps) {
  const mutation = useMutation({
    mutationFn: (message: CreateMessageRequestDto) => aiMessageService.createNewMessage(chatId, message),
    onSuccess: (data) => {
      toast.success("Suggestion berhasil dikirim");
      onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error("Gagal mengirim suggestion");
      onError?.(error);
    },
  });

  const handleSuggestionClick = (suggestion: string) => {
    mutation.mutate({ content: suggestion });
  };

  return {
    handleSuggestionClick,
    isLoading: mutation.isPending,
  };
}