import { UserModel } from "./user"

export type RoleModel = {
  id: string
  name: string
  user : UserModel[]
}
