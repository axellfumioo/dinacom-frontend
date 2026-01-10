import { apiClient } from "@/common/lib/apiClient";
import { CreateFamilyRequestDto, UpdateFamilyRequestDto } from "@/common/dto/familyDto";
import { getCookies } from "@/lib/cookie";

class FamilyService {

  async createNewFamily(dto: CreateFamilyRequestDto) {
    const token = await getCookies();
    const formData = new FormData();
    formData.append("name", dto.name);
    formData.append("description", dto.description);
    formData.append("memberIds", JSON.stringify(dto.memberIds));
    formData.append("familyAvatar", dto.familyAvatar);

    if (!dto.familyAvatar) {
      throw new Error("Family avatar file is required");
    }

    return apiClient({
      method: "post",
      url: "api/v1/families",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async updateFamily(id: string, dto: UpdateFamilyRequestDto) {
    const token = await getCookies();
    return apiClient({
      method: "patch",
      url: `api/v1/families/${id}`,
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async updateFamilyAvatar(id: string, avatar: File) {
    const token = await getCookies();
    const formData = new FormData();
    formData.append("avatar", avatar);

    if (!avatar) {
      throw new Error("Avatar file is required");
    }

    return apiClient({
      method: "patch",
      url: `api/v1/families/${id}/avatar`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteFamily(id: string) {
    const token = await getCookies();
    return apiClient({
      method: "delete",
      url: `api/v1/families/${id}/delete`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const familyService = new FamilyService();
