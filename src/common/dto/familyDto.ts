export interface CreateFamilyRequestDto {
  name: string;
  description: string;
  familyAvatar: File;
}


export interface UpdateFamilyRequestDto {
    name: string;
    description: string;
}

export interface UpdateFamilyAvatar {
    familyID: string;
    familyAvatar: File;
}

