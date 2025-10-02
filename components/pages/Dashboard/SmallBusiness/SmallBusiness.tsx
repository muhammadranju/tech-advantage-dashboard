/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuizSmallBusinessQuestionAnswerMutation } from "@/lib/redux/features/api/assessments/assessmentsApiSlice";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";
import { toast } from "sonner";

const stats = [
  {
    title: "Total Questions",
    value: 8642,
    changeType: "positive" as const,
    icon: MdOutlineQuiz,
  },
];

interface Question {
  questionText: string;
  answers: { text: string; score: number }[];
}

const SmallBusinessPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("quiz");
  const [question, setQuestion] = useState<Question>({
    questionText: "",
    answers: [
      { text: "", score: 0 },
      { text: "", score: 0 },
      { text: "", score: 0 },
    ],
  });
  const [selectCategory, setSelectCategory] = useState("business-overview");
  const [quizSmallBusinessQuestionAnswer, { isLoading }] =
    useQuizSmallBusinessQuestionAnswerMutation();
  const handelGoToUpload = () => {
    setActiveTab("upload");
    router.push("/dashboard/small-business/assessment");
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      questionText: e.target.value,
    });
  };

  const handleAnswerChange = (
    index: number,
    field: "text" | "score",
    value: string
  ) => {
    const updatedAnswers = [...question.answers];
    if (field === "score") {
      updatedAnswers[index].score = parseInt(value || "0");
    } else {
      updatedAnswers[index].text = value;
    }
    setQuestion({
      ...question,
      answers: updatedAnswers,
    });
  };

  const handleAddAnswer = () => {
    setQuestion({
      ...question,
      answers: [...question.answers, { text: "", score: 0 }],
    });
  };

  const handleRemoveAnswer = (index: number) => {
    if (question.answers.length > 1) {
      const updatedAnswers = question.answers.filter((_, i) => i !== index);
      setQuestion({
        ...question,
        answers: updatedAnswers,
      });
    }
  };

  const isQuestionValid = () => {
    return (
      question.questionText.trim() !== "" &&
      question.answers.every((a) => a.text.trim() !== "")
    );
  };

  const handleSave = async () => {
    try {
      const result = await quizSmallBusinessQuestionAnswer({
        body: question,
        category: selectCategory,
      }).unwrap();

      if (result.success) {
        setQuestion({
          questionText: "",
          answers: [
            { text: "", score: 0 },
            { text: "", score: 0 },
            { text: "", score: 0 },
          ],
        });
        toast.success("Question saved successfully");
      } else {
      }
    } catch (error: any) {
      if (error?.data.message) {
        toast.error(
          error?.data.message + "Provide a valid question at least 3 questions"
        );
      }
      // toast.error("Something went wrong");
    }
  };

  return (
    <div className="px-10  min-h-screen">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div> */}

      <div className="mx-auto bg-white shadow rounded-lg p-6 mt-10 pb-10">
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
          <Select
            value={selectCategory}
            onValueChange={(value) => setSelectCategory(value)}
          >
            <SelectTrigger className="w-[180px] rounded-md py-5 border-neutral-400 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="py-2">
              <SelectItem value="business-overview">
                Business Overview
              </SelectItem>
              <SelectItem value="aspiring-business">
                Aspiring Business
              </SelectItem>
              <SelectItem value="current-processes-pain-points">
                Current Processes & Pain Points
              </SelectItem>
              <SelectItem value="operations-growth">
                Operations & Growth
              </SelectItem>
              <SelectItem value="future-goals-integration-needs">
                Future Goals & Integration Needs
              </SelectItem>
              <SelectItem value="readiness-budget">
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
              value={question.questionText}
              onChange={handleQuestionChange}
              className="py-6"
            />
          </div>

          {/* Answers */}
          {question.answers.map((answer, index) => (
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
                  <label className="block text-lg font-medium mb-2">
                    Score
                  </label>
                  <Input
                    placeholder="0"
                    type="number"
                    value={answer.score}
                    required
                    onChange={(e) =>
                      handleAnswerChange(index, "score", e.target.value)
                    }
                    className="py-6 w-16"
                  />
                </div>
              </div>
              {question.answers.length > 1 && (
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
              disabled={!isQuestionValid() || isLoading}
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
