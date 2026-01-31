import { apiClient } from "@/common/lib/apiClient";
import { getCookies } from "@/lib/cookie";
import { ApiResponse } from "@/common/dto/ai/apiResponse";
import {
  DoctorChatMessageDto,
  CreateDoctorChatMessageRequest,
} from "@/common/dto/doctorChatDto";

class DoctorChatMessageService {
  /**
   * Get all messages for a specific room
   */
  async GetMessagesByRoomID(roomID: string) {
    const token = await getCookies();
    return await apiClient<ApiResponse<DoctorChatMessageDto[]>>({
      url: `/doctor-messages/${roomID}`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Create a new message in a room
   */
  async CreateNewMessage(data: CreateDoctorChatMessageRequest) {
    const token = await getCookies();
    return await apiClient<ApiResponse<DoctorChatMessageDto>>({
      url: `/doctor-messages/`,
      method: "POST",
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new DoctorChatMessageService();
