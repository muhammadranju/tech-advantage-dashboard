/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ListCollapse,
  Plus,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export const QuizCreator = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any>([
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
  ]);
  const router = useRouter();

  const handelGoToUpload = () => {
    setActiveTab("upload");
    router.push("/dashboard/discover-strength/upload-admin-videos");
  };

  const handleQuestionChange = (e: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (e: any, answerIndex: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answers[`answer${answerIndex}`] =
      e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Check if all fields for the current question are filled
  const isCurrentQuestionValid = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      currentQuestion.question !== "" &&
      currentQuestion.answers.answer1 !== "" &&
      currentQuestion.answers.answer2 !== "" &&
      currentQuestion.answers.answer3 !== ""
    );
  };

  const handleSave = () => {
    console.log(questions);
  };

  return (
    <div className="mx-auto bg-white rounded-lg border p-6 mt-16">
      {/* Tab Navigation */}
      <div className="flex gap-8 mb-8">
        <button
          onClick={() => setActiveTab("quiz")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "quiz"
              ? "text-black border-b-2 border-black"
              : "text-neutral-500"
          }`}
        >
          Quiz
        </button>
        <button
          onClick={handelGoToUpload}
          className={`pb-2 text-lg font-medium ${
            activeTab === "upload"
              ? "text-black border-b-2 border-black"
              : "text-neutral-500"
          }`}
        >
          Upload Your Video
        </button>
      </div>

      <div className="space-y-6">
        {/* Question Section */}
        <div>
          <label className="block text-lg font-medium mb-3">
            Quizzes Question
          </label>
          <Input
            placeholder="Enter your Quiz Question"
            value={questions[currentQuestionIndex].question}
            onChange={handleQuestionChange}
            className="py-6"
          />
        </div>

        {/* Answer Sections */}
        <div>
          <label className="block text-lg font-medium mb-3">
            1. Answer (User will get 3 marks)
          </label>
          <Input
            placeholder="Enter Mark"
            value={questions[currentQuestionIndex].answers.answer1}
            onChange={(e) => handleAnswerChange(e, 1)}
            className="py-6"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">
            2. Answer (User will get 2 marks)
          </label>
          <Input
            placeholder="Enter Mark"
            value={questions[currentQuestionIndex].answers.answer2}
            onChange={(e) => handleAnswerChange(e, 2)}
            className="py-6"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">
            3. Answer (User will get 1 mark)
          </label>
          <Input
            placeholder="Enter Mark"
            value={questions[currentQuestionIndex].answers.answer3}
            onChange={(e) => handleAnswerChange(e, 3)}
            className="py-6"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 ">
          <Link
            className="flex-1"
            href={"/dashboard/discover-strength/view-quizzes"}
          >
            <Button variant="outline" className=" py-6 bg-transparent w-full">
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
  );
};
