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
    return res.data
  }

async updateQuestionnaires( userId: string, dto: UpdateQuestionnairesDto[]) {
 return await apiClient({
    url: `/quest/answer?userId=${userId}`,
    method: "patch",
    data: {
      answers: dto
    },
  });

}

}

export const questionnaireService = new QuestionnaireService();
