import { AIMessageModel } from "./aimessage"
import { UserModel } from "./user"

export type AIChatRoomModel = {
    id: string
    user_id: string

    user: UserModel
    messages: AIMessageModel[]

    created_at: Date
    updated_at: Date
}