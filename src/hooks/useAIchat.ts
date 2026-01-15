import { AIChatDto } from "@/common/dto/ai/aiChatDto"
import { aiChatService } from "@/services/AiChatService"
import { useQuery } from "@tanstack/react-query"

export const useGetUserAIChat = () => {
    return useQuery({
        queryKey: ["userAIChat"],
        queryFn: () => aiChatService.GetUserAIChat(),
        staleTime: 2 * 60 * 60
    })
}
