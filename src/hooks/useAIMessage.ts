import { CreateMessageRequestDto } from "@/common/dto/ai/ai_messageDto"
import { aiMessageService } from "@/services/AiMessageService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useGetAIChatMessagesByChatID = (chatId: string) => {
    return useQuery({
        queryKey: ["AIMessages", chatId],
        queryFn: () => aiMessageService.getAIChatMessagesByChatID(chatId),
        staleTime: 2 * 60 * 60
    })
}

export const useCreateNewMessage = (chatId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createNewMessage'],
        mutationFn: (dto: CreateMessageRequestDto) => aiMessageService.createNewMessage(chatId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["AIMessages", chatId], type: "all" });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })
}

export const useCreateMessageWithSuggestion = (chatId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (message: CreateMessageRequestDto) => aiMessageService.createNewMessage(chatId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["AIMessages", chatId] });
        },
        onError: () => {
            toast.error("Gagal mengirim suggestion");
        },
    });
}