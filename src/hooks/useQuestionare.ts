"use client";

import { UpdateQuestionnairesDto } from "@/common/dto/questionDto";
import { questionnaireService } from "@/services/QuestService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import { userStore } from "@/common/lib/store";

export const useGetQuestionnaire = () => {
  const user = useStore(userStore);

  return useQuery({
    queryKey: ["questionnaire", user?.user_id],
    queryFn: () => questionnaireService.getUserQuestionnaires(),
    enabled: !!user?.user_id 
  });
};

export const useUpdateQuestionnaire = () => {
  return useMutation({
    mutationKey: ["update-questionnaire"],
    mutationFn: (dto: UpdateQuestionnairesDto) =>
      questionnaireService.updateQuestionnaires(dto),
  });
};
