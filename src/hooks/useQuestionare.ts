"use client";

import { UpdateQuestionnairesDto } from "@/common/dto/questionDto";
import { questionnaireService } from "@/services/QuestService";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetQuestionnaire = (userId :string) => {
  return useQuery({
    queryKey: ["questionnaire", userId],
    queryFn: () => questionnaireService.getUserQuestionnaires(userId),
    enabled: !!userId,
  });
};

export const useUpdateQuestionnaire = (userId: string) => {
  return useMutation({
    mutationKey: ["update-questionnaire", userId],
    mutationFn: (dto: UpdateQuestionnairesDto[]) =>
      questionnaireService.updateQuestionnaires(userId, dto),
  });
};
