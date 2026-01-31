import { UserModel } from "../model/user";

export interface FoodInsightDto {
    ID: string;
    health_score: number;
    personal_ai_insight: string;
    ai_important_notice: string;
    confidence: number;

    UserID: string;
    User: UserModel;

    created_at: string;
}