"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ListCollapseIcon, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AssessmentComment } from "./AssessmentComment";

interface Answer {
  text: string;
  score: number | "";
}

interface Question {
  question: string;
  answers: Answer[];
}

type TabType = "quiz" | "assessment";

const MockInterview = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Single question with multiple answers
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([
    { text: "", score: "" },
    { text: "", score: "" },
    { text: "", score: "" },
  ]);

  const router = useRouter();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[answerIndex].text = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleAnswerScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const updatedAnswers = [...answers];
    const value = e.target.value;
    updatedAnswers[answerIndex].score = value === "" ? "" : parseFloat(value);
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    // Not needed for single question
  };

  const handlePreviousQuestion = () => {
    // Not needed for single question
  };

  const isQuestionValid = () => {
    return (
      question.trim() !== "" &&
      answers.every((a) => a.text.trim() !== "" && a.score !== "")
    );
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: "", score: "" }]);
  };

  const handleRemoveAnswer = (index: number) => {
    if (answers.length > 1) {
      const updatedAnswers = answers.filter((_, i) => i !== index);
      setAnswers(updatedAnswers);
    }
  };

  const handleSave = () => {
    // Format as a single object with question and answers array
    const formattedQuestion = {
      question: question,
      answers: answers
        .filter((a) => a.text.trim() !== "")
        .map((a) => ({
          text: a.text,
          score: a.score === "" ? 0 : a.score,
        })),
    };
    console.log(formattedQuestion);
    // Here you would send formattedQuestion to your API
  };

  return (
    <div className="px-10 mt-5 min-h-screen">
      <h1 className="text-3xl font-bold  text-black">Mock Interview</h1>
      <div className="mx-auto bg-white rounded-lg p-10 mt-5 border ">
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
            {/* Question */}
            <div>
              <label className="block text-lg font-medium mb-3">Question</label>
              <Input
                placeholder="Enter quiz question"
                value={question}
                onChange={handleQuestionChange}
                className="py-6"
              />
            </div>

            {/* Answers */}
            {answers.map((answer, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-lg font-medium mb-2">
                    {index + 1}. Answer
                  </label>
                  <Input
                    placeholder="Enter answer text"
                    value={answer.text}
                    onChange={(e) => handleAnswerTextChange(e, index)}
                    className="py-6"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-lg font-medium mb-2">
                    Score
                  </label>
                  <Input
                    type="number"
                    placeholder="Score"
                    value={answer.score}
                    onChange={(e) => handleAnswerScoreChange(e, index)}
                    className="py-6"
                  />
                </div>
                {answers.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAnswer(index)}
                    className="mt-8"
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}

            {/* Add Answer Button */}
            <Button
              variant="outline"
              onClick={handleAddAnswer}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Answer
            </Button>

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
                disabled={!isQuestionValid()}
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
