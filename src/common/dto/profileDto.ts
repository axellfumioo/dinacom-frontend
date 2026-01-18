export interface UpdateProfileDto {
  date_of_birth?: string; // ISO string (YYYY-MM-DD / ISO8601)
  height_cm?: number;
  weight_kg?: number;
  activity_level?: string;
}

export interface UploadAvatarDto {
  user_id: string;
  avatar: File;
}
