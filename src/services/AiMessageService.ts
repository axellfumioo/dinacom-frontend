import { apiClient } from "@/common/lib/apiClient";
import {
  CreateMessageRequestDto,
  CreateMessageWithMediaRequestDto,
  MessageDto,
} from "@/common/dto/ai/ai_messageDto";
import toast from "react-hot-toast";

class AiMessageService {
  // 1. DELETE /aichats/message/{messageId} - DeleteMessageByID
  async deleteMessageById(messageId: string): Promise<void> {
    await apiClient({
      url: `/aichats/message/${messageId}`,
      method: "DELETE",
    });

    toast.success("Pesan berhasil dihapus");
  }

  // 2. POST /aichats/{aichatID}/message - CreateNewMessage
  async createNewMessage(
    aichatID: string,
    dto: CreateMessageRequestDto
  ): Promise<MessageDto> {
    const res = await apiClient<{ data: MessageDto }>({
      url: `/aichats/${aichatID}/message`,
      method: "POST",
      data: dto,
    });

    toast.success("Pesan baru berhasil dibuat");
    return res.data;
  }

  // 3. POST /aichats/{aichatID}/message-img - CreateNewMessageWithImage
  async createNewMessageWithImage(
    aichatID: string,
    dto: CreateMessageWithMediaRequestDto
  ): Promise<MessageDto> {
    const formData = new FormData();
    formData.append("content", dto.content);
    formData.append("userId", dto.userId);
    formData.append("chatId", dto.chatId);
    formData.append("image", dto.image);

    const res = await apiClient<{ data: MessageDto }>({
      url: `/aichats/${aichatID}/message-img`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Pesan dengan gambar berhasil dibuat");
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

    toast.success("Semua pesan chat berhasil dihapus");
  }
}

export const aiMessageService = new AiMessageService();
