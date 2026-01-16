export interface ProfileModel {
  id: string;
  user_id: string;
  avatar: string | null;
  date_of_birth: string; // ISO Date string
  height_cm: number | null;
  weight_kg: number | null;
  created_at: string; // ISO Date string
}

//   gender: "PRIA" | "WANITA";
//   activity_level: string | null;