"use client";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";

const stats = [
  {
    title: "Total Questions",
    value: 8642,
    changeType: "positive" as const,
    icon: MdOutlineQuiz,
  },
];

interface Question {
  question: string;
  answers: { text: string; mark: number }[];
}

type TabType = "quiz" | "upload";
type CategoryType =
  | "Business Overview"
  | "Current Processes & Pain Points"
  | "Operations & Growth"
  | "Future Goals & Integration Needs"
  | "Readiness & Budget";

const SmallBusinessPage = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answers: [{ text: "", mark: 0 }] },
  ]);
  const router = useRouter();

  const handelGoToUpload = () => {
    setActiveTab("upload");
    router.push("/dashboard/small-business/assessment");
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...questions];
    updated[currentQuestionIndex].question = e.target.value;
    setQuestions(updated);
  };

  const handleAnswerChange = (
    index: number,
    field: "text" | "mark",
    value: string
  ) => {
    const updated = [...questions];
    if (field === "mark") {
      updated[currentQuestionIndex].answers[index].mark = parseInt(
        value || "0"
      );
    } else {
      updated[currentQuestionIndex].answers[index].text = value;
    }
    setQuestions(updated);
  };

  const handleAddAnswer = () => {
    const updated = [...questions];
    updated[currentQuestionIndex].answers.push({ text: "", mark: 0 });
    setQuestions(updated);
  };

  const handleRemoveAnswer = (index: number) => {
    const updated = [...questions];
    if (updated[currentQuestionIndex].answers.length > 1) {
      updated[currentQuestionIndex].answers.splice(index, 1);
      setQuestions(updated);
    }
  };

  const isCurrentQuestionValid = () => {
    const current = questions[currentQuestionIndex];
    return (
      current.question.trim() !== "" &&
      current.answers.every((a) => a.text.trim() !== "")
    );
  };

  const handleSave = () => {
    console.log(questions);
  };

  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards
            stat={{
              title: stat.title,
              value: stat.value,
              changeType: stat.changeType,
              icon: stat.icon,
            }}
            key={stat.title}
          />
        ))}
      </div>

      <div className="mx-auto bg-white rounded-lg border p-6 mt-16">
        <div className="flex gap-8 justify-between mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`pb-2 text-lg font-medium ${
                activeTab === "quiz"
                  ? "text-black border-b-2 border-black"
                  : "text-neutral-500"
              }`}
            >
              Question & Answer
            </button>
            <button
              onClick={handelGoToUpload}
              className={`pb-2 text-lg font-medium ${
                activeTab === "upload"
                  ? "text-black border-b-2 border-black"
                  : "text-neutral-500"
              }`}
            >
              Assessment
            </button>
          </div>
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="w-[180px] rounded-md py-5 border-neutral-400 text-black">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="py-2">
              <SelectItem value="Business Overview">
                Business Overview
              </SelectItem>
              <SelectItem value="Current Processes & Pain Points">
                Current Processes & Pain Points
              </SelectItem>
              <SelectItem value="Operations & Growth">
                Operations & Growth
              </SelectItem>
              <SelectItem value="Future Goals & Integration Needs">
                Future Goals & Integration Needs
              </SelectItem>
              <SelectItem value="Readiness & Budget">
                Readiness & Budget
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {/* Question Section */}
          <div>
            <label className="block text-lg font-medium mb-2">Question</label>
            <Input
              placeholder="Enter your question"
              value={questions[currentQuestionIndex].question}
              onChange={handleQuestionChange}
              className="py-6"
            />
          </div>

          {/* Answers */}
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-full flex gap-x-2">
                <div className="w-full">
                  <label className="block text-lg font-medium mb-2">
                    {index + 1}. Answer
                  </label>
                  <Input
                    placeholder="Enter answer"
                    value={answer.text}
                    onChange={(e) =>
                      handleAnswerChange(index, "text", e.target.value)
                    }
                    className="py-6 flex-1"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Mark</label>
                  <Input
                    placeholder="0"
                    type="number"
                    value={answer.mark}
                    onChange={(e) =>
                      handleAnswerChange(index, "mark", e.target.value)
                    }
                    className="py-6 w-16"
                  />
                </div>
              </div>
              {questions[currentQuestionIndex].answers.length > 1 && (
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveAnswer(index)}
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
              onClick={handleAddAnswer}
            >
              Add More
              <IoMdAdd className="text-2xl" />
            </Button>
          </div>

          <div className="flex gap-4">
            <Link
              className="flex-1"
              href={"/dashboard/small-business/view-answers"}
            >
              <Button variant="outline" className="py-6 bg-transparent w-full">
                <ListCollapse /> View Details
              </Button>
            </Link>
            <Button
              className="flex-1 py-6 hover:bg-neutral-800"
              onClick={handleSave}
              disabled={!isCurrentQuestionValid()}
            >
              <Save /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallBusinessPage;
