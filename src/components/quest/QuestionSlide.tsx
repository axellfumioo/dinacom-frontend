"use client";

import { QuestionnaireDto,UpdateQuestionnairesDto } from "@/common/dto/questionDto";

interface Props {
  question: QuestionnaireDto;
  step: number;
  total: number;
  answers: UpdateQuestionnairesDto[];
  onAnswer: (val: string) => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function QuestionSlide({
  question,
  step,
  total,
  answers,
  onAnswer,
  onNext,
  onSubmit,
}: Props) {
  const currentAnswer = answers.find(
    (a) => a.question_id === question.ID
  )?.answer;

  const isLast = step === total - 1;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Pertanyaan {step + 1} dari {total}
      </p>

      <h2 className="text-lg font-semibold">{question.Question}</h2>

      {/* QUESTION TYPE HANDLING */}
      {step === 0 && (
        <div className="flex gap-4">
          {["Ya", "Tidak"].map((v) => (
            <button
              key={v}
              onClick={() => onAnswer(v)}
              className={`px-4 py-2 rounded border ${
                currentAnswer === v ? "bg-black text-white" : ""
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="flex gap-4">
          {["Ya", "Tidak"].map((v) => (
            <button
              key={v}
              onClick={() => onAnswer(v)}
              className={`px-4 py-2 rounded border ${
                currentAnswer === v ? "bg-black text-white" : ""
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="range"
            min={1}
            max={12}
            value={currentAnswer || 6}
            onChange={(e) => onAnswer(e.target.value)}
            className="w-full"
          />
          <p className="text-center mt-2">{currentAnswer || 6} Jam</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
          {[
            { label: "< 1 Jam", value: "<1" },
            { label: "> 1 Jam", value: ">1" },
            { label: "> 2 Jam", value: ">2" },
            { label: "> 3 Jam", value: ">3" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="exercise"
                checked={currentAnswer === opt.value}
                onChange={() => onAnswer(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4">
        {!isLast ? (
          <button
            disabled={!currentAnswer}
            onClick={onNext}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            disabled={!currentAnswer}
            onClick={onSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
