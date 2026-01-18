import { apiClient } from "@/common/lib/apiClient"
import {
  QuestionnaireAnswerDto,
  QuestionnaireResponse,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto"
import toast from "react-hot-toast"


class QuestionnaireService {
  async getUserQuestionnaires() {
    const res = await apiClient<QuestionnaireResponse>({
      url: "/quest",
      method: "get",
    });

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

    return res.data; // { message, data }
  }

  async updateQuestionnaires(dto: UpdateQuestionnairesDto) {
    const res = await apiClient({
      url: "/quest/answer",
      method: "patch",
      data: dto,
    });

    return true;
  }
}

export const questionnaireService = new QuestionnaireService()
