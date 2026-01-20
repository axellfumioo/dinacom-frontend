export interface QuestionnaireDto {
  ID: string;
  Question: string;
  Number: number;
  Answer: string;
}

export interface UpdateQuestionnairesDto {
  question_id : string;
  number : number;
  answer : string;
}

// hanya untuk GET response
export interface QuestionnaireResponse {
  message: string;
  data: QuestionnaireDto[];
}
