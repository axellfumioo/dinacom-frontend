export interface QuestionModel {
  question_id: string
  number: number
  title: string
  type: "boolean" | "slider" | "radio"
  options?: { label: string; value: string }[]
  min?: number
  max?: number
}
