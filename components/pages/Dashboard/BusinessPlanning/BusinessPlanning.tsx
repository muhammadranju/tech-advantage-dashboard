"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import React, { useCallback, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { QuizForm } from "./components/QuizForm";
import { TabToggle } from "./components/TabToggle";
import {
  useCreateBusinessPlanLongQuestionAnswerMutation,
  useCreateBusinessPlanQuizQuestionAnswerMutation,
  useGetBusinessPlanLongQuestionAnswerQuery,
  useGetBusinessPlanQuizQuestionAnswerQuery,
} from "@/lib/redux/features/api/businessPlanning/businessPlanningApiSlice";
import { toast } from "sonner";
import { LongQuestionForm } from "./components/LongQuestionForm";
import { Stat, TabType } from "./components/types";
import { useQuestions } from "./components/useQuestions";

const BusinessPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [longAnswer, setLongAnswer] = useState("");
  const { data: answers } = useGetBusinessPlanQuizQuestionAnswerQuery(null);
  const { data: longQuestionAnswerData } =
    useGetBusinessPlanLongQuestionAnswerQuery(null);

  // create quiz question answer
  const [createBusinessPlanQuizQuestionAnswer, { isLoading: isCreating }] =
    useCreateBusinessPlanQuizQuestionAnswerMutation();
  // create long question answer
  const [createBusinessPlanLongQuestionAnswer, { isLoading: isCreatingLong }] =
    useCreateBusinessPlanLongQuestionAnswerMutation();

  const {
    currentQuestion,
    handleQuestionChange,
    handleAnswerChange,
    handleAddAnswer,
    handleRemoveAnswer,
    resetQuestions,
    isCurrentQuestionValid,
  } = useQuestions();
  const stats: Stat[] = [
    {
      title: "Total Quiz Questions",
      value: answers?.data?.length || 0,
      changeType: "positive" as const,
      icon: MdOutlineQuiz,
    },
    {
      title: "Total Long Questions",
      value: longQuestionAnswerData?.data?.length || 0,
      changeType: "positive" as const,
      icon: MdOutlineQuiz,
    },
  ];

  const handleSave = useCallback(async () => {
    if (activeTab === "quiz") {
      try {
        const result = await createBusinessPlanQuizQuestionAnswer({
          body: {
            questionText: currentQuestion.questionText,
            answers: currentQuestion.answers,
          },
        }).unwrap();

        if (result.success) {
          resetQuestions(3);
          toast.success("Quiz question saved successfully");
        }
      } catch (error) {
        toast.error(
          (error as string) || "Failed to save quiz question. Please try again."
        );
      }
    } else {
      try {
        const result = await createBusinessPlanLongQuestionAnswer({
          body: {
            questionText: currentQuestion.questionText,
            answer: longAnswer,
          },
        }).unwrap();

        if (result.success) {
          resetQuestions(1);
          setLongAnswer("");
          toast.success("Long question saved successfully");
        }
      } catch (error) {
        toast.error(
          (error as string) || "Failed to save long question. Please try again."
        );
      }
    }
  }, [
    activeTab,
    currentQuestion,
    longAnswer,
    resetQuestions,
    createBusinessPlanQuizQuestionAnswer,
    createBusinessPlanLongQuestionAnswer,
  ]);

  return (
    <div className="px-10 mt-5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>

      <div className="mx-auto bg-white rounded-lg border p-6 mt-16">
        <div className="flex gap-8 justify-between mb-8">
          <TabToggle active={activeTab} setActive={setActiveTab} />
        </div>

        {activeTab === "quiz" ? (
          <QuizForm
            question={currentQuestion}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={handleAnswerChange}
            onAddAnswer={handleAddAnswer}
            onRemoveAnswer={handleRemoveAnswer}
            onSave={handleSave}
            isUpdating={isCreating}
            isValid={isCurrentQuestionValid}
          />
        ) : (
          <LongQuestionForm
            questionText={currentQuestion.questionText}
            answerText={longAnswer}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={setLongAnswer}
            onSave={handleSave}
            isUpdating={isCreatingLong}
            isValid={isCurrentQuestionValid}
          />
        )}
      </div>
    </div>
  );
};

export default BusinessPlanning;
