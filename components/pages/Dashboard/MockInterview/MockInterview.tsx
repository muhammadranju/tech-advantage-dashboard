"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AssessmentComment } from "@/components/mockInterview/AssessmentComment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListCollapseIcon,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Question {
  question: string;
  answers: {
    answer1: string;
    answer2: string;
    answer3: string;
  };
}

type TabType = "quiz" | "assessment";

const stats = [
  {
    title: "Total Participant",
    value: 124563,
    change: "+12.5%",
    changeType: "positive" as const,
    icon: FileText,
  },
];

const MockInterview = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answers: { answer1: "", answer2: "", answer3: "" } },
    { question: "", answers: { answer1: "", answer2: "", answer3: "" } },
    { question: "", answers: { answer1: "", answer2: "", answer3: "" } },
    { question: "", answers: { answer1: "", answer2: "", answer3: "" } },
    { question: "", answers: { answer1: "", answer2: "", answer3: "" } },
  ]);

  const router = useRouter();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: 1 | 2 | 3
  ) => {
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
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
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
                placeholder="Enter quiz question"
                value={questions[currentQuestionIndex].question}
                onChange={handleQuestionChange}
                className="py-6"
              />
            </div>

            {/* Answer Sections */}
            <div>
              <label className="block text-lg font-medium mb-3">
                1. Answer (User will get 1 marks)
              </label>
              <Input
                placeholder="Enter quiz answer"
                value={questions[currentQuestionIndex].answers.answer1}
                onChange={(e) => handleAnswerChange(e, 1)}
                className="py-6"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-3">
                2. Answer (User will get 0.5 marks)
              </label>
              <Input
                placeholder="Enter quiz answer"
                value={questions[currentQuestionIndex].answers.answer2}
                onChange={(e) => handleAnswerChange(e, 2)}
                className="py-6"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-3">
                3. Answer (User will get 0 mark)
              </label>
              <Input
                placeholder="Enter quiz answer"
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
              <Button
                onClick={() =>
                  router.push("/dashboard/mock-interview/view-answers")
                }
                variant="outline"
                className="flex-1 py-6 bg-transparent"
              >
                <ListCollapseIcon /> View Details
              </Button>

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

        {activeTab === "assessment" && <AssessmentComment />}
      </div>
    </div>
  );
};

export default MockInterview;
