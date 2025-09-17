/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import DropdownAndLinks from "./DropdownAndLinks";
import { StatsCards } from "@/components/dashboard/StatsCards";
import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { FileText } from "lucide-react";
import { SiQuizlet } from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  {
    title: "Total Participant",
    value: "8,642",

    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Total Quizzes",
    value: "12",

    changeType: "positive" as const,
    icon: SiQuizlet,
  },
];

const SuccessPathPage = () => {
  const [activeTab, setActiveTab] = useState("quiz");

  // Simplified questions object with one question and answers
  const [question, setQuestion] = useState({
    question: "",
    answers: {
      answer1: "",
      answer2: "",
      answer3: "",
    },
  });

  const router = useRouter();

  const handelGoToUpload = () => {
    setActiveTab("upload");
    router.push("/dashboard/success-path/small-business?q=small-business");
  };

  const handleQuestionChange = (e: any) => {
    setQuestion((prev) => ({ ...prev, question: e.target.value }));
  };

  const handleAnswerChange = (e: any, answerIndex: string) => {
    setQuestion((prev) => ({
      ...prev,
      answers: { ...prev.answers, [answerIndex]: e.target.value },
    }));
  };

  // Check if all fields for the current question are filled
  const isQuestionValid = () => {
    return (
      question.question !== "" &&
      question.answers.answer1 !== "" &&
      question.answers.answer2 !== ""
    );
  };

  const handleSave = () => {
    console.log(question);
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
        <div className="flex justify-between">
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
              Assessment
            </button>
          </div>
          <Select>
            <SelectTrigger className="w-[180px] rounded-md py-5 border-neutral-400 text-black">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="py-2 ">
              <SelectItem value="Aspiring Entrepreneur">
                Aspiring Entrepreneur
              </SelectItem>
              <SelectItem value="  Small Business">Small Business</SelectItem>
              <SelectItem value="Looking to Get Into Tech">
                Looking to Get Into Tech
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {/* Question Section */}
          <div>
            <label className="block text-lg font-medium mb-3">Question</label>
            <Input
              placeholder="Enter your Quiz Question"
              value={question.question}
              onChange={handleQuestionChange}
              className="py-6"
            />
          </div>

          {/* Answer Sections */}
          <div>
            <label className="block text-lg font-medium mb-3">
              1.Yes (User will get 1 mark)
            </label>
            <Input
              placeholder="Enter Answer"
              value={question.answers.answer1}
              onChange={(e) => handleAnswerChange(e, "answer1")}
              className="py-6"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">
              1.Yes (User will get 0 mark)
            </label>
            <Input
              placeholder="Enter Answer"
              value={question.answers.answer2}
              onChange={(e) => handleAnswerChange(e, "answer2")}
              className="py-6"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              className="flex-1"
              href={"/dashboard/success-path/view-quizzes"}
            >
              <Button variant="outline" className="py-6 bg-transparent w-full">
                <ListCollapse /> View Details
              </Button>
            </Link>
            <Button
              className="flex-1 py-6 hover:bg-neutral-800"
              onClick={handleSave}
              disabled={!isQuestionValid()}
            >
              <Save /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPathPage;
