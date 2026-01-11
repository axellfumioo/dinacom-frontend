import { AIChatDto } from "@/common/dto/ai/aiChatDto";
import { apiClient } from "@/common/lib/apiClient";
import { getCookies } from "@/lib/cookie";
import { ApiResponse } from "@/common/dto/ai/apiResponse";

class AIChatService {
  async GetUserAIChat() {
    const token = await getCookies();

    const res = await apiClient<ApiResponse<AIChatDto[]>>({
      url: `/api/v1/aichats/user`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }


async CreateNewChat(): Promise<AIChatDto & { id: string }> {
  const token = await getCookies();

  const res = await apiClient<ApiResponse<AIChatDto>>({
    url: `/api/v1/aichats/`,
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const chat = res.data;

  return {
    ...chat,
    id: chat.ID, 
  };
}


  async DeleteAIChat(id: string) {
    const token = await getCookies();

    const res = await apiClient<ApiResponse<AIChatDto>>({
      url: `/api/v1/aichats/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });

    return res.data;
  }


}

export const aiChatService = new AIChatService();
