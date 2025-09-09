"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SmallBusinessQsn = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", ""] },
  ]);
  const router = useRouter();

  const handelGoToUpload = () => {
    setActiveTab("upload");
    router.push("/dashboard/discover-strength/upload-admin-videos");
  };

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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
    console.log(questions);
  };

  return (
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
        <Select>
          <SelectTrigger className="w-[180px] rounded-md py-6 text-black">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="py-2 ">
            <SelectItem value="Business Overview">Business Overview</SelectItem>
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
          <label className="block text-lg font-medium mb-3">Questions</label>
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
              <div className="flex-1">
                <label className="block text-lg font-medium mb-3">
                  {index + 1}. Answer (User will get mark)
                </label>
                <Input
                  placeholder="Enter question answer"
                  value={answer}
                  onChange={(e) => handleAnswerChange(e, index)}
                  className="py-6"
                />
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
            href={"/dashboard/discover-strength/view-quizzes"}
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
  );
};
