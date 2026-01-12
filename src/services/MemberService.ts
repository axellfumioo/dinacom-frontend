import { apiClient } from "@/common/lib/apiClient";
import { AddFamilyRequestDto } from "@/common/dto/memberDto";
import { getCookies } from "@/lib/cookie";

class MemberService {

  async addFamilyMembers(dto: AddFamilyRequestDto) {
    const token = await getCookies();
    return apiClient({
      method: "post",
      url: "/members",
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getFamilyMembers(familyID: string) {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: `/members/family/${familyID}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteFamilyMember(ID: string, familyID: string) {
    const token = await getCookies();
    return apiClient({
      method: "delete",
      url: `/members/${ID}/family/${familyID}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const memberService = new MemberService();
