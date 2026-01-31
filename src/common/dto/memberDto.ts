export interface FamilyMemberDto {
  ID: string;
  Role: string;
  FamilyID: string;
  UserID: string;
  Family: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface AddFamilyMemberDto {
  userID: string;
  role: string;
}

export interface AddFamilyMembersRequestDto {
  familyID: string;
  members: AddFamilyMemberDto[];
}
