"use client";

import { useState } from "react";
import {
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto";
import { useGetQuestionnaire, useUpdateQuestionnaire } from "@/hooks/useQuestionare";
import QuestionSlide from "./QuestionSlide";
import StravaPopup from "./StravaPopUp";
import { userIdStore } from "@/common/lib/userId";
export default function QuestionnaireContainer() {  
const  userId = userIdStore.state;
  console.log(userId);
  const { data, isLoading } = useGetQuestionnaire(userId || "");
  const { mutate : updateQuestion, isPending: updatePending } = useUpdateQuestionnaire(userId || "");

  console.log(data);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<UpdateQuestionnairesDto[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Questionnaire tidak ditemukan</p>;

  const questions = data;

  const currentQuestion = questions[step];

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => {
      const filtered = prev.filter(
        (a) => a.question_id !== currentQuestion.ID
      );
      return [
        ...filtered,
        {
          question_id: currentQuestion.ID,
          number: currentQuestion.Number,
          answer :answer,
        },
      ];
    });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    const payload: UpdateQuestionnairesDto[] = answers 

updateQuestion(payload, {
  onSuccess: () => {
    setShowPopup(true);
  },
});
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl p-6 shadow">
      <QuestionSlide
        question={currentQuestion}
        step={step}
        total={questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onSubmit={handleSubmit}
        answers={answers}
      />

      {showPopup && <StravaPopup />}
    </div>
  );
}
