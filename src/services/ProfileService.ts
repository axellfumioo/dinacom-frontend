import { apiClient } from "@/common/lib/apiClient";
import { UpdateProfileDto, UploadAvatarDto } from "@/common/dto/profileDto";
import { getCookies } from "@/lib/cookie";

class ProfileService {

  async updateProfile(dto: UpdateProfileDto) {
    const token = await getCookies();
    return apiClient({
      method: "patch",
      url: "api/v1/profiles",
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async uploadAvatar(dto: UploadAvatarDto) {
    const token = await getCookies();
    const formData = new FormData();
    formData.append("user_id", dto.user_id);
    formData.append("avatar", dto.avatar);

    if (!dto.avatar) {
      throw new Error("Avatar file is required");
    }

    return apiClient({
      method: "post",
      url: "api/v1/profiles/avatar",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const profileService = new ProfileService();
