import { apiClient } from "@/common/lib/apiClient";
import { getCookies } from "@/lib/cookie";
import { ApiResponse } from "@/common/dto/ai/apiResponse";
import {
  DoctorDto,
  DoctorChatRoomDto,
  CreateDoctorChatroomRequest,
} from "@/common/dto/doctorChatDto";

class DoctorChatService {
  /**
   * Get all available doctors
   */
  async GetAllDoctors() {
    const token = await getCookies();
    return await apiClient<ApiResponse<DoctorDto[]>>({
      url: `/doctor-chats/`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Get all user's doctor chat rooms
   */
  async GetAllUserDoctorChatRooms() {
    const token = await getCookies();
    return await apiClient<ApiResponse<DoctorChatRoomDto[]>>({
      url: `/doctor-chats/user`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Get or create a doctor chat room with a specific doctor
   */
  async GetOrCreateDoctorChatRoom(doctorID: string) {
    const token = await getCookies();
    return await apiClient<ApiResponse<DoctorChatRoomDto>>({
      url: `/doctor-chats/${doctorID}`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Create a new doctor chat room
   */
  async CreateDoctorChatroom(data: CreateDoctorChatroomRequest) {
    const token = await getCookies();
    return await apiClient<ApiResponse<DoctorChatRoomDto>>({
      url: `/doctor-chats/`,
      method: "POST",
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new DoctorChatService();
