"use client";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";

const stats = [
  {
    title: "Total Quiz Questions",
    value: 8642,
    changeType: "positive" as const,
    icon: MdOutlineQuiz,
  },
  {
    title: "Total Long Questions",
    value: 82,
    changeType: "positive" as const,
    icon: MdOutlineQuiz,
  },
];

interface Question {
  question: string;
  answers: string[];
  mark: number;
}

type TabType = "quiz" | "long-question";

function TabToggle({
  active,
  setActive,
}: {
  active: TabType;
  setActive: (t: TabType) => void;
}) {
  return (
    <div className="flex gap-8">
      <button
        onClick={() => setActive("quiz")}
        className={`pb-2 text-lg font-medium ${
          active === "quiz"
            ? "text-black border-b-2 border-black"
            : "text-neutral-500"
        }`}
      >
        Quiz
      </button>
      <button
        onClick={() => setActive("long-question")}
        className={`pb-2 text-lg font-medium ${
          active === "long-question"
            ? "text-black border-b-2 border-black"
            : "text-neutral-500"
        }`}
      >
        Long Question
      </button>
    </div>
  );
}

function QuestionField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Questions</label>
      <Input
        placeholder="Enter your question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-6"
      />
    </div>
  );
}

function AnswersList({
  answers,
  onChange,
  onAdd,
  onRemove,
}: {
  answers: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <>
      {answers.map((answer, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-full flex gap-x-2">
            <div className="w-full">
              <label className="block text-lg font-medium mb-2">
                {index + 1}. Answer (User will get mark)
              </label>
              <Input
                placeholder="Enter question answer"
                value={answer}
                onChange={(e) => onChange(index, e.target.value)}
                className="py-6 flex-1"
              />
            </div>
          </div>
          {answers.length > 1 && (
            <Button
              variant="ghost"
              onClick={() => onRemove(index)}
              className="text-neutral-900 mt-9 hover:text-red-700"
            >
              <IoMdRemove className="text-xl" />
            </Button>
          )}
        </div>
      ))}

      <div className="flex justify-end items-center gap-8">
        <Button
          variant="default"
          className="flex items-center gap-2 py-5"
          onClick={onAdd}
        >
          Add More
          <IoMdAdd className="text-2xl" />
        </Button>
      </div>
    </>
  );
}

function ActionRow({
  viewHref,
  onSave,
  disabled,
}: {
  viewHref: string;
  onSave: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <Link className="flex-1" href={viewHref}>
        <Button variant="outline" className="py-6 bg-transparent w-full">
          <ListCollapse /> View Details
        </Button>
      </Link>
      <Button
        className="flex-1 py-6 hover:bg-neutral-800"
        onClick={onSave}
        disabled={disabled}
      >
        <Save /> Save
      </Button>
    </div>
  );
}

const BusinessPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answers: ["", "", ""], mark: 0 },
  ]);
  const [longAnswer, setLongAnswer] = useState("");

  const handleQuestionChange = useCallback(
    (value: string) => {
      setQuestions((prev) => {
        const copy = [...prev];
        copy[currentQuestionIndex] = {
          ...copy[currentQuestionIndex],
          question: value,
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
        q.answers[index] = value;
        copy[currentQuestionIndex] = q;
        return copy;
      });
    },
    [currentQuestionIndex]
  );

  const isCurrentQuestionValid = useMemo(() => {
    const q = questions[currentQuestionIndex];
    return Boolean(q && q.question.trim());
  }, [questions, currentQuestionIndex]);

  const handleAddMoreAnswers = useCallback(() => {
    setQuestions((prev) => {
      const copy = [...prev];
      const q = { ...copy[currentQuestionIndex] };
      q.answers = [...q.answers, ""];
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

  const handleSave = useCallback(() => {
    if (activeTab === "quiz") {
      console.log("Quiz questions:", questions);
    } else {
      console.log("Long question:", {
        question: questions[currentQuestionIndex]?.question,
        answer: longAnswer,
      });
    }
  }, [activeTab, questions, currentQuestionIndex, longAnswer]);

  return (
    <div className="px-10 py-4">
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
          <div className="space-y-6">
            <QuestionField
              value={questions[currentQuestionIndex].question}
              onChange={handleQuestionChange}
            />
            <AnswersList
              answers={questions[currentQuestionIndex].answers}
              onChange={handleAnswerChange}
              onAdd={handleAddMoreAnswers}
              onRemove={handleRemoveAnswer}
            />
            <ActionRow
              viewHref="/dashboard/business-planning/view-answers"
              onSave={handleSave}
              disabled={!isCurrentQuestionValid}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-6">
              <QuestionField
                value={questions[currentQuestionIndex].question}
                onChange={handleQuestionChange}
              />
              <label className="block text-lg font-medium mb-2">Answer</label>
              <Textarea
                placeholder="Enter question answer"
                value={longAnswer}
                onChange={(e) => setLongAnswer(e.target.value)}
                className="py-6 flex-1"
              />
            </div>
            <ActionRow
              viewHref="/dashboard/business-planning/view-long-answers"
              onSave={handleSave}
              disabled={!isCurrentQuestionValid}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPlanning;
