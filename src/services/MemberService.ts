import { apiClient } from "@/common/lib/apiClient";
import { AddFamilyMembersRequestDto, FamilyMemberDto } from "@/common/dto/memberDto";
import { getCookies } from "@/lib/cookie";

class MemberService {

  async getFamilyMembers(familyID: string) {
    const token = await getCookies();
    return apiClient<FamilyMemberDto[]>({
      method: "get",
      url: `/members/family/${familyID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addFamilyMembers(dto: AddFamilyMembersRequestDto) {
    const token = await getCookies();
    return apiClient({
      method: "post",
      url: "/members",
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteFamilyMember(memberID: string, familyID: string) {
    const token = await getCookies();
    return apiClient({
      method: "delete",
      url: `/members/${memberID}/family/${familyID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const memberService = new MemberService();
