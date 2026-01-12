import { apiClient } from "@/common/lib/apiClient"
import axios from "axios"
import { UpdateQuestionnairesDto } from "@/common/dto/questionDto"
import toast from "react-hot-toast"

class QuestionnaireService {


  async getUserQuestionnaires() {
    try {
      const res = await apiClient<{
        message: string
        data: any[] // nanti bisa diganti QuestionnaireDto[]
      }>({
        url: "/quest",
        method: "get",
      })

      if (!res.data) {
        throw new Error("Invalid response from server")
      }

      return res.data.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message
      }
      throw error
    }
  }


  async updateQuestionnaires(dto: UpdateQuestionnairesDto) {
    try {
      const res = await apiClient<{
        message: string
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message
      }
      throw error
    }
  }
}

export const questionnaireService = new QuestionnaireService()
