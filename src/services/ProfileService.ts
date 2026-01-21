import { apiClient } from "@/common/lib/apiClient";
import { UpdateProfileDto, UploadAvatarDto } from "@/common/dto/profileDto";
import { getCookies } from "@/lib/cookie";

class ProfileService {

  async getProfile() {
    const token = await getCookies();
    return await apiClient({
      method: "get",
      url: "/profiles",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  async updateProfile(dto: UpdateProfileDto) {
    const token = await getCookies();
    return apiClient({
      method: "patch",
      url: "/profiles",
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async uploadAvatar(dto: UploadAvatarDto) {
    const token = await getCookies();
    const formData = new FormData();
    formData.append("avatar", dto.avatar);

    if (!dto.avatar) {
      throw new Error("Avatar file is required");
    }

    return apiClient({
      method: "post",
      url: "/profiles/avatar",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const profileService = new ProfileService();
