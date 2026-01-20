import { apiClient } from "@/common/lib/apiClient";
import {
  QuestionnaireResponse,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto";

class QuestionnaireService {

  async getUserQuestionnaires(userId:  string) {
    const res = await apiClient<QuestionnaireResponse>({
      url: `/quest?userId=${userId}`,
      method: "get",
    });

    if (!userId) return null;

    return res.data;
    
  }

async updateQuestionnaires( userId: string, dto: UpdateQuestionnairesDto[]) {
  await apiClient({
    url: `/quest/answer?userId=${userId}`,
    method: "patch",
    data: dto,
  });

  return true;
}

}

export const questionnaireService = new QuestionnaireService();
