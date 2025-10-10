"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateMockInterviewMutation } from "@/lib/redux/features/api/mockInterview/mockInterviewSliceApi";
import { ListCollapseIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AssessmentComment } from "./AssessmentComment";
import { Answer, TabType } from "./mock_interview.interface";

const MockInterview = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");

  // Single question with multiple answers
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([
    { text: "", score: "3" },
    { text: "", score: "2" },
    { text: "", score: "1" },
  ]);
  const [createMockInterview, { isLoading }] = useCreateMockInterviewMutation();
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

  const isQuestionValid = () => {
    return (
      question.trim() !== "" &&
      answers.every((a) => a.text.trim() !== "" && a.score !== "")
    );
  };

  const handleSave = async () => {
    // Format as a single object with question and answers array

    try {
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

      const result = await createMockInterview({
        body: formattedQuestion,
      }).unwrap();

      if (result.success) {
        toast.success("Question saved successfully");
        setQuestion("");
        setAnswers([
          { text: "", score: "3" },
          { text: "", score: "2" },
          { text: "", score: "1" },
        ]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save question. Please try again.");
    }
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
                <div className="w-16">
                  <label className="block text-lg font-medium mb-2">
                    Score
                  </label>
                  <Input
                    type="number"
                    value={answer.score}
                    onChange={(e) => handleAnswerScoreChange(e, index)}
                    className="py-6"
                  />
                </div>
              </div>
            ))}

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
                disabled={!isQuestionValid() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="size-6" /> Saving...
                  </>
                ) : (
                  <>
                    <Save /> Save
                  </>
                )}
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
