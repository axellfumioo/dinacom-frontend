import { MessageDto } from "./ai_messageDto"

export interface AIChatDto {
    id : string
    user_id : string

    messages : MessageDto[]

    created_at : Date
    updated_at : Date
}