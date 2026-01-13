import { AIChatRoomModel } from "./aichat"
import { UserModel } from "./user"

export type AIMessageModel = {
    id: string
    image_url: string
    content: string
    confidence: string | null
    sender_role: "USER" | "ASSISTANT"

    user_id: string
    chat_id: string
    user: UserModel
    chat: AIChatRoomModel

    created_at: Date
    updated_at: Date
}
