import React from "react";
import { QuestionField } from "./QuestionField";
import { AnswersList } from "./AnswersList";
import { ActionRow } from "./ActionRow";
import { Question } from "./types";
// import { Question } from "../types";

interface QuizFormProps {
  question: Question;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (index: number, value: string) => void;
  onAddAnswer: () => void;
  onRemoveAnswer: (index: number) => void;
  onSave: () => void;
  isValid: boolean;
}

export function QuizForm({
  question,
  onQuestionChange,
  onAnswerChange,
  onAddAnswer,
  onRemoveAnswer,
  onSave,
  isValid,
}: QuizFormProps) {
  return (
    <div className="space-y-6">
      <QuestionField value={question.questionText} onChange={onQuestionChange} />
      <AnswersList
        answers={question.answers}
        onChange={onAnswerChange}
        onAdd={onAddAnswer}
        onRemove={onRemoveAnswer}
      />
      <ActionRow
        viewHref="/dashboard/business-planning/view-answers"
        onSave={onSave}
        disabled={!isValid}
      />
    </div>
  );
}