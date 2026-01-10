import { AIChatDto } from "@/common/dto/ai/ai_chat_Dto";
import { apiClient } from "@/common/lib/apiClient";
import { getCookies } from "@/lib/cookie";

// Maksudnya AICHAt ini chat room nya (bukan message)
class AIChatService {
    async GetUserAIChat() {
        const token = await getCookies();
        return await apiClient<{ data: AIChatDto }>({ url: `/aichats/user`, headers: { Authorization: `Bearer ${token}` } })
    }

    async CreateNewChat() {
        const token = await getCookies();
        return await apiClient<{ message: string, data: AIChatDto }>({ url: `/aichats`, method: "POST", headers: { Authorization: `Bearer ${token}` } })
    }

    async DeleteAIChat(chatId: string) {
        const token = await getCookies();
        return await apiClient<{ message: string, data: AIChatDto }>({
            url: `/aichats/${chatId}`, method: "delete", headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export const aiChatService = new AIChatService();