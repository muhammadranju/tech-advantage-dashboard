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
import { Category, Question, TabType } from "@/interface/successPath.interface";
import { useCreateSuccessPathQuizQuestionAnswerMutation } from "@/lib/redux/features/api/successPath/successPathSliceApi";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const SuccessPathPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [selectedCategory, setSelectedCategory] = useState(
    "aspiring-entrepreneur"
  ); // Simplified questions object with one question and answers
  const [question, setQuestion] = useState<Question>({
    question: "",
  });
  const [createSuccessPathQuizQuestionAnswer, { isLoading: isCreating }] =
    useCreateSuccessPathQuizQuestionAnswerMutation();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({ ...prev, question: e.target.value }));
  };

  // Check if all fields for the current question are filled
  const isQuestionValid = () => {
    return question.question !== "";
  };

  const handleSave = async () => {
    try {
      const result = await createSuccessPathQuizQuestionAnswer({
        body: {
          questionText: question.question,
        },
        category: selectedCategory,
      }).unwrap();

      if (result.success) {
        setQuestion({
          question: "",
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
    }
  };
  return (
    <div className="px-10 mt-5 min-h-screen">
      <h1 className="text-3xl font-bold text-black">Success Path</h1>
      <div className="mx-auto bg-white rounded-lg border p-6 my-5 pb-16">
        {/* Tab Navigation */}
        <div className="flex justify-between ">
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
              onClick={() => router.push("/dashboard/success-path/assessment")}
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
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as Category)}
          >
            <SelectTrigger className="w-[180px] rounded-md py-5 border-neutral-400 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="py-2">
              <SelectItem value="aspiring-entrepreneur">
                Aspiring Entrepreneur
              </SelectItem>
              <SelectItem value="small-business">Small Business</SelectItem>
              <SelectItem value="looking-to-get-into-tech">
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
          <div className="flex gap-4 flex-row">
            <div className="flex-1">
              <label className="block text-lg font-medium mb-3">
                1.Yes (User will get 1 mark)
              </label>
              <Input
                placeholder="Enter Answer"
                className="py-6"
                disabled
                defaultValue={"Yes"}
              />
            </div>

            <div className="flex-1">
              <label className="block text-lg font-medium mb-3">
                2. No (User will get 0 mark)
              </label>
              <Input
                placeholder="Enter Answer"
                className="py-6"
                disabled
                defaultValue={"No"}
              />
            </div>
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
              disabled={!isQuestionValid() || isCreating}
            >
              {isCreating ? (
                <>
                  <ClipLoader color="#ffffff" size={16} />
                  Saving...
                </>
              ) : (
                <>
                  <Save /> Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPathPage;
