import { apiClient } from "@/common/lib/apiClient";
import {
  CreateMessageRequestDto,
  CreateMessageWithMediaRequestDto,
  MessageDto,
} from "@/common/dto/ai/ai_messageDto";
import { getCookies } from "@/lib/cookie";

class AiMessageService {
  // 1. DELETE /aichats/message/{messageId} - DeleteMessageByID
  async deleteMessageById(messageId: string) {
    const res = await apiClient<{ message: string, data: any }>({
      url: `/aichats/message/${messageId}`,
      method: "DELETE",
    });

    return res
  }

  // 2. POST /aichats/{aichatID}/message - CreateNewMessage
  async createNewMessage(
    aichatID: string,
    dto: CreateMessageRequestDto
  ) {
    const token = await getCookies();
    const res = await apiClient<{ data: MessageDto }>({
      url: `/aichats/${aichatID}/message`,
      headers : {
        Authorization : `Bearer ${token}`
      },
      method: "POST",
      data: dto,
    });

    return res;
  }

  // 3. POST /aichats/{aichatID}/message-img - CreateNewMessageWithImage
  async createNewMessageWithImage(
    aichatID: string,
    dto: CreateMessageWithMediaRequestDto
  ): Promise<MessageDto> {
    const token = await getCookies();
    const formData = new FormData();
    formData.append("content", dto.content);
    formData.append("chatId", dto.chatId);
    formData.append("image", dto.image);

    const res = await apiClient<{ data: MessageDto }>({
      url: `/aichats/${aichatID}/message-img`,
      method: "POST",
      headers : {
        "Content-Type": "multipart/form-data",
        Authorization : `Bearer ${token}`
      },
      data: formData,
    });

    return res.data;
  }

  // 4. GET /aichats/{chatID}/message - GetAIChatMessageByChatID
  async getAIChatMessagesByChatID(chatID: string): Promise<MessageDto[]> {
    const res = await apiClient<{ data: MessageDto[] }>({
      url: `/aichats/${chatID}/message`,
      method: "GET",
    });

    return res.data;
  }

  // 5. DELETE /aichats/{chatID}/message - DeleteChatMessages
  async deleteChatMessages(chatID: string): Promise<void> {
    await apiClient({
      url: `/aichats/${chatID}/message`,
      method: "DELETE",
    });
  }
}

export const aiMessageService = new AiMessageService();
