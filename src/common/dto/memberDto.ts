export interface FamilyMemberDto {
  userID: string;
  role: string;
}

export interface AddFamilyMembersRequestDto {
  familyID: string;
  members: FamilyMemberDto[];
}
