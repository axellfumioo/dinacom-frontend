import { aiMessageService } from "@/services/AiMessageService"
import { useQuery } from "@tanstack/react-query"


export const useGetAIChatMessagesByChatID = (chatId: string) => {
    return useQuery({
        queryKey: ["AIMessage", chatId],
        queryFn: () => aiMessageService.getAIChatMessagesByChatID(chatId),
        staleTime: 2 * 60 * 60
    })
}