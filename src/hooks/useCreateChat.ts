import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiChatService } from "@/services/AiChatService";
import toast from "react-hot-toast";

interface UseCreateChatProps {
  onSuccess?: (chatId: string) => void;
  onError?: (error: any) => void;
}

export function useCreateChat({ onSuccess, onError }: UseCreateChatProps = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => aiChatService.CreateNewChat(),

    onSuccess: (chat) => {
      console.log("CHAT RESULT:", chat);

      const chatId = chat?.id ?? chat?.ID;

      if (!chatId) {
        toast.error("Chat berhasil dibuat tapi ID tidak ditemukan");
        return;
      }

      toast.success("Chat baru berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["user-chats"] });

      onSuccess?.(chatId);
    },

    onError: (error) => {
      toast.error("Gagal membuat chat baru");
      onError?.(error);
    },
  });

  return {
    createChat: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
