import { ProfileModel } from "./profile"
import { RoleModel } from "./role"

export interface UserModel {
  user_id: string
  email: string
  full_name: string
  phone_number: string | null
  role_id: string
  role: RoleModel | null
  profile: ProfileModel
  created_at: string
  updated_at: string
  avatar: string;
}