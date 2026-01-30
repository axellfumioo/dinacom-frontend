export interface CreateFamilyRequestDto {
  name: string;
  description: string;
  familyAvatar: File;
}


export interface UpdateFamilyRequestDto {
    name: string;
    description: string;
}

export interface UpdateFamilyAvatarDto {
    familyID: string;
    familyAvatar: File;
}

