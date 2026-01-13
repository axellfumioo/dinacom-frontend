import { RoleModel } from "./role"

export interface UserModel {
  user_id: string
  email: string
  full_name: string
  phone_number: string | null
  role_id: string
  role: RoleModel | null
  profile: any
  created_at: string
  updated_at: string
}