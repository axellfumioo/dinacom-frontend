"use client";

import { useState } from "react";
import {
  QuestionnaireAnswerDto,
  UpdateQuestionnairesDto,
} from "@/common/dto/questionDto";
import { useGetQuestionnaire, useUpdateQuestionnaire } from "@/hooks/useQuestionare";
import QuestionSlide from "./QuestionSlide";
import StravaPopup from "./StravaPopUp";

export default function QuestionnaireContainer() {
  const { data, isLoading } = useGetQuestionnaire();
  const updateMutation = useUpdateQuestionnaire();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswerDto[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Questionnaire tidak ditemukan</p>;

  const questions = data;

  const currentQuestion = questions[step];

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => {
      const filtered = prev.filter(
        (a) => a.question_id !== currentQuestion.question_id
      );
      return [
        ...filtered,
        {
          question_id: currentQuestion.question_id,
          number: currentQuestion.number,
          answer,
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
    const payload: UpdateQuestionnairesDto = {
      answers,
    };

    await updateMutation.mutateAsync(payload);
    setShowPopup(true);
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
