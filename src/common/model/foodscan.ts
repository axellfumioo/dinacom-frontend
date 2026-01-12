import { FoodScanResultModel } from "./result"
import { UserModel } from "./user"

export type FoodScanModel = {
    id: string
    image_url: string
    status: "SUCCESS" | "FAILED" | "PENDING"
    user_id: string
    user: UserModel
    result: FoodScanResultModel
    created_at: Date
    updated_at: Date
}

export interface Profile {
    id: string
    avatar_url?: string
    address?: string
}
