import { aiChatService } from "@/services/AiChatService"
import { useQuery } from "@tanstack/react-query"

export const useGetUserAIChat = () => {
    return useQuery({
        queryKey: ["userAIChat"],
        queryFn: async () => {
            const data = await aiChatService.GetUserAIChat()
            return data[0]
        },
        staleTime: 2 * 60 * 60
    })
}