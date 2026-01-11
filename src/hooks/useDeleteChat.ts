import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiChatService } from "@/services/AiChatService";
import { useRouter } from "next/navigation";

export function useDeleteChat() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => aiChatService.DeleteAIChat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-chats"] });
      // If current chat is deleted, redirect to list
      router.push("/dashboard/healtassistent");
    },
    onError: (error) => {
      console.error("Failed to delete chat:", error);
      // You can add toast notification here
    },
  });
}