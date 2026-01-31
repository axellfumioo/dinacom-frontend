import { apiClient } from "@/common/lib/apiClient";
import { UserModel } from "@/common/model/user";
import { getCookies } from "@/lib/cookie";

export interface AiInsightResponse {
    ID: string;
    health_score: string;
    personal_ai_insight: string;
    ai_important_notice: string;
    confidence: number;
    UserID: string;
    User: UserModel;
    created_at: string;
}

class AiInsight {
  async getAiInsight(): Promise<AiInsightResponse> {
    const token = await getCookies();

    return apiClient<AiInsightResponse>({
      method: "get",
      url: "/ai-insights/latest",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const aiInsightService = new AiInsight();
