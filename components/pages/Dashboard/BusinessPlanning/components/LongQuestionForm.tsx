import React from "react";
import { QuestionField } from "./QuestionField";
import { LongAnswerField } from "./LongAnswerField";
import { ActionRow } from "./ActionRow";

interface LongQuestionFormProps {
  questionText: string;
  answerText: string;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
  onSave: () => void;
  isValid: boolean;
}

export function LongQuestionForm({
  questionText,
  answerText,
  onQuestionChange,
  onAnswerChange,
  onSave,
  isValid,
}: LongQuestionFormProps) {
  return (
    <div className="space-y-6">
      <QuestionField value={questionText} onChange={onQuestionChange} />
      <LongAnswerField value={answerText} onChange={onAnswerChange} />
      <ActionRow
        viewHref="/dashboard/business-planning/view-long-answers"
        onSave={onSave}
        disabled={!isValid}
      />
    </div>
  );
}
