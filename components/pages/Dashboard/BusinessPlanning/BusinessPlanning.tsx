/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
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

const BusinessPlanning = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answers: ["", "", ""], mark: 0 },
  ]);
  const [longAnswer, setLongAnswer] = useState("");

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answers[answerIndex] =
      e.target.value;
    setQuestions(updatedQuestions);
  };

  // Check if all fields for the current question are filled
  const isCurrentQuestionValid = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return currentQuestion.question !== "";
  };

  // Handle adding new answer field
  const handleAddMoreAnswers = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answers.push(""); // Add an empty answer field
    setQuestions(updatedQuestions);
  };

  // Handle removing an answer field
  const handleRemoveAnswer = (answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answers.splice(answerIndex, 1); // Remove the answer at the given index
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    if (activeTab === "quiz") {
      console.log("Quiz questions:", questions);
    } else {
      console.log("Long question:", {
        question: questions[currentQuestionIndex].question,
        answer: longAnswer,
      });
    }
  };

  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <div className="mx-auto bg-white rounded-lg border p-6 mt-16">
        {/* Tab Navigation */}
        <div className="flex gap-8 justify-between mb-8">
          <div className="flex gap-8 ">
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
              onClick={() => setActiveTab("long-question")}
              className={`pb-2 text-lg font-medium ${
                activeTab === "long-question"
                  ? "text-black border-b-2 border-black"
                  : "text-neutral-500"
              }`}
            >
              Long Question
            </button>
          </div>
        </div>

        {/* Answer Sections */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {/* Question Section */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Questions
              </label>
              <Input
                placeholder="Enter your question"
                value={questions[currentQuestionIndex].question}
                onChange={handleQuestionChange}
                className="py-6"
              />
            </div>

            {/* Answer Sections */}
            {questions[currentQuestionIndex].answers.map(
              (answer: string, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-full flex gap-x-2">
                    <div className="w-full">
                      <label className="block text-lg font-medium mb-2">
                        {index + 1}. Answer (User will get mark)
                      </label>
                      <Input
                        placeholder="Enter question answer"
                        value={answer}
                        onChange={(e) => handleAnswerChange(e, index)}
                        className="py-6 flex-1"
                      />
                    </div>
                  </div>
                  {/* Remove Icon */}
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
              )
            )}

            {/* Add More Button */}
            <div className="flex justify-end items-center gap-8 ">
              <Button
                variant="default"
                className="flex items-center gap-2 py-5"
                onClick={handleAddMoreAnswers}
              >
                Add More
                <IoMdAdd className="text-2xl" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 ">
              <Link
                className="flex-1"
                href={"/dashboard/business-planning/view-answers"}
              >
                <Button
                  variant="outline"
                  className="py-6 bg-transparent w-full"
                >
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
        )}

        {/* Long Question */}
        {activeTab === "long-question" && (
          <div className="space-y-6">
            {/* Question Section */}
            <div className="space-y-6">
              <label className="block text-lg font-medium mb-2">
                Questions
              </label>
              <Input
                placeholder="Enter your question"
                value={questions[currentQuestionIndex].question}
                onChange={handleQuestionChange}
                className="py-6"
              />
              <label className="block text-lg font-medium mb-2">Answer</label>
              <Textarea
                placeholder="Enter question answer"
                value={longAnswer}
                onChange={(e) => setLongAnswer(e.target.value)}
                className="py-6 flex-1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 ">
              <Link
                className="flex-1"
                href={"/dashboard/business-planning/view-long-answers"}
              >
                <Button
                  variant="outline"
                  className="py-6 bg-transparent w-full"
                >
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
        )}
      </div>
    </div>
  );
};

export default BusinessPlanning;
