import { useMutation } from "@tanstack/react-query";
import { aiMessageService } from "@/services/AiMessageService";
import { CreateMessageRequestDto } from "@/common/dto/ai/ai_messageDto";
import toast from "react-hot-toast";

interface UseChatSubmitProps {
  chatId?: string;
  input: string;
  setInput: (value: string) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useChatSubmit({
  chatId,
  input,
  setInput,
  onSuccess,
  onError,
}: UseChatSubmitProps) {
  const mutation = useMutation({
    mutationFn: (message: CreateMessageRequestDto) =>
      aiMessageService.createNewMessage(chatId!, message),

    onSuccess: (data) => {
      setInput("");
      onSuccess?.(data);
    },

    onError: (error) => {
      toast.error("Gagal mengirim pesan");
      onError?.(error);
    },
  });

  const isValid = input.trim().length > 0;
  const isDisabled = !chatId || !isValid || mutation.isPending;

  const handleSubmit = () => {
    if (!chatId) {
      toast.error("Chat belum siap");
      return;
    }

    if (!isValid) return;

    mutation.mutate({ content: input.trim() });
  };

  return {
    handleSubmit,
    isDisabled,
    isLoading: mutation.isPending,
  };
}
