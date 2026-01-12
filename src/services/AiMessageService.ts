import { apiClient } from "@/common/lib/apiClient";
import {
  CreateMessageRequestDto,
  CreateMessageWithMediaRequestDto,
} from "@/common/dto/ai/ai_messageDto";
import { getCookies } from "@/lib/cookie";

class AiMessageService {
  // 1. DELETE /aichats/message/{messageId} - DeleteMessageByID
  async deleteMessageById(messageId: string): Promise<void> {
    const token = await getCookies();
    await apiClient({
      url: `/aichats/message/${messageId}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

  }

  // 2. POST /aichats/{aichatID}/message - CreateNewMessage
async createNewMessage(
  aichatID: string,
  dto: CreateMessageRequestDto
) {
  if (!aichatID) {
    throw new Error("Chat ID is required");
  }

  const token = await getCookies();
  return apiClient({
    url: `/aichats/${aichatID}/message`,
    method: "POST",
    data: dto,
    headers: { Authorization: `Bearer ${token}` },
  });
}


  // 3. POST /aichats/{aichatID}/message-img - CreateNewMessageWithImage
  async createNewMessageWithImage(
    aichatID: string,
    dto: CreateMessageWithMediaRequestDto
  ): Promise<any> {
    const formData = new FormData();
    formData.append("content", dto.content);
    formData.append("userId", dto.userId);
    formData.append("chatId", dto.chatId);
    formData.append("image", dto.image);

    const token = await getCookies();
    const res = await apiClient<{ data: any }>({
      url: `/aichats/${aichatID}/message-img`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  // 4. GET /aichats/{chatID}/message - GetAIChatMessageByChatID
  async getAIChatMessagesByChatID(chatID: string): Promise<any[]> {
    const token = await getCookies();
    const res = await apiClient<{ data: any[] }>({
      url: `/aichats/${chatID}/message`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }

  // 5. DELETE /aichats/{chatID}/message - DeleteChatMessages
  async deleteChatMessages(chatId: string): Promise<void> {
    const token = await getCookies();
    await apiClient({
      url: `/aichats/${chatId}/message`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const aiMessageService = new AiMessageService();