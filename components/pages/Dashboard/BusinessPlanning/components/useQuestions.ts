/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState, useMemo } from "react";
import { Question } from "./types";
// import { Question } from "../types";

export function useQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionText: "",
      answers: [{ answer: "" }, { answer: "" }, { answer: "" }],
    },
  ]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuestionChange = useCallback(
    (value: string) => {
      setQuestions((prev) => {
        const copy = [...prev];
        copy[currentQuestionIndex] = {
          ...copy[currentQuestionIndex],
          questionText: value,
        };
        return copy;
      });
    },
    [currentQuestionIndex]
  );

  const handleAnswerChange = useCallback(
    (index: number, value: string) => {
      setQuestions((prev) => {
        const copy = [...prev];
        const q = { ...copy[currentQuestionIndex] };
        q.answers = [...q.answers];
        q.answers[index] = { answer: value };
        copy[currentQuestionIndex] = q;
        return copy;
      });
    },
    [currentQuestionIndex]
  );

  const handleAddAnswer = useCallback(() => {
    setQuestions((prev) => {
      const copy = [...prev];
      const q = { ...copy[currentQuestionIndex] };
      q.answers = [...q.answers, { answer: "" }];
      copy[currentQuestionIndex] = q;
      return copy;
    });
  }, [currentQuestionIndex]);

  const handleRemoveAnswer = useCallback(
    (answerIndex: number) => {
      setQuestions((prev) => {
        const copy = [...prev];
        const q = { ...copy[currentQuestionIndex] };
        q.answers = q.answers.filter((_, i) => i !== answerIndex);
        copy[currentQuestionIndex] = q;
        return copy;
      });
    },
    [currentQuestionIndex]
  );

  const resetQuestions = useCallback((answerCount: number = 3) => {
    setQuestions([
      {
        questionText: "",
        answers: Array(answerCount)
          .fill(null)
          .map(() => ({ answer: "" })),
      },
    ]);
  }, []);

  const isCurrentQuestionValid = useMemo(() => {
    return Boolean(currentQuestion && currentQuestion.questionText.trim());
  }, [currentQuestion]);

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    handleQuestionChange,
    handleAnswerChange,
    handleAddAnswer,
    handleRemoveAnswer,
    resetQuestions,
    isCurrentQuestionValid,
  };
}
