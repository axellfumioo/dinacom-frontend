import { apiClient } from "@/common/lib/apiClient";
import {
  QuestionnaireResponse,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto";
import { userStore } from "@/common/lib/store";

class QuestionnaireService {
  private getUserId() {
    const user = userStore.state;
    return user?.user_id || null;
  }

  async getUserQuestionnaires() {
    const userId = this.getUserId();

    const res = await apiClient<QuestionnaireResponse>({
      url: "/quest",
      method: "get",
      params: {
        userId,
      },
    });

    if (!userId) return null;

    return res.data;
    
  }

async updateQuestionnaires(dto: UpdateQuestionnairesDto) {
  const userId = this.getUserId();

  await apiClient({
    url: "/quest/answer",
    method: "patch",
    data: {
      ...dto,
      userId,
    },
  });

  return true;
}

}

export const questionnaireService = new QuestionnaireService();
