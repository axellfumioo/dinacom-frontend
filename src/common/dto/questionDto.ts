export interface QuestionnaireAnswerDto {
  question_id: string;
  number: number;
  answer: string;
}

export interface UpdateQuestionnairesDto {
  answers: QuestionnaireAnswerDto[];
}

// hanya untuk GET response
export interface QuestionnaireResponse {
  message: string;
  data: QuestionnaireAnswerDto[];
}
