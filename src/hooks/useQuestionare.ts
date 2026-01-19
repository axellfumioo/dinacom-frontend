"use client";

import { UpdateQuestionnairesDto } from "@/common/dto/questionDto";
import { userStore } from "@/common/lib/store";
import { questionnaireService } from "@/services/QuestService";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetQuestionnaire = () => {
  return useQuery({
    queryKey: ["questionnaire", userStore.state?.user_id],
    queryFn: () => questionnaireService.getUserQuestionnaires(),
    enabled: !!userStore.state?.user_id,
  });
};

export const useUpdateQuestionnaire = () => {
  return useMutation({
    mutationKey: ["update-questionnaire"],
    mutationFn: (dto: UpdateQuestionnairesDto) =>
      questionnaireService.updateQuestionnaires(dto),
  });
};
