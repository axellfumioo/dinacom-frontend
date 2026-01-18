import { apiClient } from "@/common/lib/apiClient";
import {
  QuestionnaireResponse,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto";
import { userStore } from "@/common/lib/store";

class QuestionnaireService {
  private getUserId() {
    const user = userStore.state;
    if (!user?.user_id) {
      throw new Error("User belum login");
    }
    return user.user_id
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

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

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
