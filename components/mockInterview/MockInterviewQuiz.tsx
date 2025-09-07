/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AssessmentComment } from "./AssessmentComment";

export const MockInterviewQuiz = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any>([
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
    { question: "", answers: { answer1: "3", answer2: "2", answer3: "1" } },
  ]);
  // const router = useRouter();

  // const handelGoToUpload = () => {
  //   setActiveTab("upload");
  //   router.push("/dashboard/discover-strength/upload-admin-videos");
  // };

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
    <div className="mx-auto bg-white rounded-lg p-6 mt-16">
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
          onClick={() => setActiveTab("assessment")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "assessment"
              ? "text-black border-b-2 border-black"
              : "text-neutral-500"
          }`}
        >
          Assessment Comment
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          {/* Question Section */}
          <div>
            <label className="block text-lg font-medium mb-3">
              {currentQuestionIndex + 1}. Question
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

          {/* Navigation */}
          <div className="flex justify-end items-center gap-8 py-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-neutral-600"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Question
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-neutral-600"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === 4}
            >
              Next Question
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1 py-6 bg-transparent">
              View Details
            </Button>
            <Button
              className="flex-1 py-6 hover:bg-neutral-800"
              onClick={handleSave}
              disabled={!isCurrentQuestionValid()}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      {activeTab === "assessment" && <AssessmentComment />}
    </div>
  );
};
