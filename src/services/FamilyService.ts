import { apiClient } from "@/common/lib/apiClient";
import { CreateFamilyRequestDto, UpdateFamilyAvatar, UpdateFamilyRequestDto } from "@/common/dto/familyDto";
import { getCookies } from "@/lib/cookie";

class FamilyService {

  async getFamilies() {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: "/families/user",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

async createNewFamily(dto: CreateFamilyRequestDto) {
  const token = await getCookies();

  if (!dto.familyAvatar) {
    throw new Error("Family avatar file is required");
  }

  const formData = new FormData();
  formData.append("name", dto.name);
  formData.append("description", dto.description);
  formData.append("image", dto.familyAvatar); // WAJIB "image"

  return apiClient({
    method: "post",
    url: "/families",
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
      url: `/families/${id}`,
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

async updateFamilyAvatar(dto: UpdateFamilyAvatar) {
  const token = await getCookies();

  if (!dto.familyAvatar) {
    throw new Error("Avatar file is required");
  }

  const formData = new FormData();
  formData.append("avatar", dto.familyAvatar); 

  return apiClient({
    method: "patch",
    url: `/families/${dto.familyID}/avatar`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}


  async deleteFamily(id: string) {
    const token = await getCookies();
    return apiClient({
      method: "delete",
      url: `/families/${id}/delete`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const familyService = new FamilyService();
