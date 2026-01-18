"use client";

import {
  QuestionnaireAnswerDto,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto";
import { questionnaireService } from "@/services/QuestService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetQuestionnaire = () => {
  return useQuery({
    queryKey: ["questionnaire"],
    queryFn: () => questionnaireService.getUserQuestionnaires(),
  });
};


export const useUpdateQuestionnaire = () => {
  return useMutation({
    mutationKey: ["update-questionnaire"],
    mutationFn: (dto: UpdateQuestionnairesDto) =>
      questionnaireService.updateQuestionnaires(dto),
  });
};
