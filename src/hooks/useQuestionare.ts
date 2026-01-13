"use client";

import { QuestionnaireAnswerDto, UpdateQuestionnairesDto } from "@/common/dto/questionDto";
import { questionnaireService } from "@/services/QuestService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useQuestionnaire = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ['getquestionnaire'],
        mutationFn: (dto: QuestionnaireAnswerDto) => questionnaireService.getUserQuestionnaires(dto),
        onSuccess: () => {
            console.log("Berhasil mendapatkan questionnaire!");
        },
        onError: (err) => {
            console.log(err);
        }
    })
}

export const useUpdateQuestionnaire = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ['updatequestionnaire'],
        mutationFn: (dto: UpdateQuestionnairesDto) => questionnaireService.updateQuestionnaires(dto),
        onSuccess: () => {
            console.log("Berhasil mengupdate questionnaire!");
        },
        onError: (err) => {
            console.log(err);
        }
    })
}