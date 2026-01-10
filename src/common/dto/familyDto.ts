export interface CreateFamilyRequestDto {
    name: string;
    description: string;
    memberIds: string[];
    familyAvatar: File;
}

export interface UpdateFamilyRequestDto {
    name: string;
    description: string;
}

