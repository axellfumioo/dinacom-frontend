import { apiClient } from "@/common/lib/apiClient"
import {
  QuestionnaireAnswerDto,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto"
import toast from "react-hot-toast"

class QuestionnaireService {
  async getUserQuestionnaires(dto: QuestionnaireAnswerDto) {
    const res = await apiClient<{
      message: string
      data: QuestionnaireAnswerDto
    }>({
      url: "/quest",
      method: "get",
      data: dto,
    })

    if (!res.data) {
      throw new Error("Invalid response from server")
    }

    return res.data
  }

  async updateQuestionnaires(dto: UpdateQuestionnairesDto) {
    const res = await apiClient<{
      message: string
      data: UpdateQuestionnairesDto
    }>({
      url: "/quest/answer",
      method: "patch",
      data: dto,
    })

    if (!res.data) {
      throw new Error("Invalid response from server")
    }

    toast.success("Questionnaire berhasil disimpan")
    return true
  }
}

export const questionnaireService = new QuestionnaireService()
