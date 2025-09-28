/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetQuizAnswersQuery } from "@/lib/redux/features/api/assessments/assessmentsApiSlice";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilFill } from "react-icons/pi";

interface SurveyOption {
  id: string;
  text: string;
}

interface SurveyCard {
  id: string;
  question: string;
  options: SurveyOption[];
}

const surveyData: SurveyCard[] = [
  {
    id: "1",
    question: "What motivates you most in business?",
    options: [
      { id: "1a", text: "Solving problems" },
      { id: "1b", text: "Creating innovative products" },
      { id: "1c", text: "Leading and inspiring team" },
    ],
  },
  {
    id: "2",
    question: "What motivates you most in business?",
    options: [
      { id: "2a", text: "Solving problems" },
      { id: "2b", text: "Creating innovative products" },
      { id: "2c", text: "Leading and inspiring team" },
    ],
  },
  {
    id: "3",
    question: "What motivates you most in business?",
    options: [
      { id: "3a", text: "Solving problems" },
      { id: "3b", text: "Creating innovative products" },
      { id: "3c", text: "Leading and inspiring team" },
    ],
  },
  {
    id: "4",
    question: "What motivates you most in business?",
    options: [
      { id: "4a", text: "Solving problems" },
      { id: "4b", text: "Creating innovative products" },
      { id: "4c", text: "Leading and inspiring team" },
    ],
  },
  {
    id: "5",
    question: "What motivates you most in business?",
    options: [
      { id: "5a", text: "Solving problems" },
      { id: "5b", text: "Creating innovative products" },
      { id: "5c", text: "Leading and inspiring teamsss" },
    ],
  },
];

const SMBViewAnswersPage = () => {
  const [data, setData] = useState(surveyData || []);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("business-overview");
  const { data: quizAnswers, isLoading } =
    useGetQuizAnswersQuery(selectedCategory);

  console.log(selectedCategory);
  console.log(quizAnswers);

  const router = useRouter();

  const handleEdit = (card: SurveyCard) => {
    setEditingCardId(card.id);
    setEditFormData({ ...card });
  };

  const handleSave = () => {
    console.log(editFormData);
    if (editFormData) {
      setData((prevData) =>
        prevData.map((card) =>
          card.id === editFormData.id ? editFormData : card
        )
      );
    }
    setEditingCardId(null);
    setEditFormData(null);
  };

  const handleCancel = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };

  const updateQuestion = (value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, question: value });
    }
  };

  const updateOption = (optionId: string, value: string) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        options: editFormData.options.map((option) =>
          option.id === optionId ? { ...option, text: value } : option
        ),
      });
    }
  };

  const handelChange = (e: any) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="w-full mx-auto p-8  rounded-xl">
      <div className="flex gap-8 justify-between mb-8">
        <div className="flex gap-8 ">
          <button
            onClick={() => router.back()}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Question & Answer
          </button>
          {/* </Link> */}
          <button
            className={`pb-2 text-lg font-medium border-b-2 border-black`}
          >
            Answer Assessment
          </button>
        </div>
        <Select>
          <SelectTrigger className="w-[180px] rounded-md py-5 border-neutral-400 text-black">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="py-2 ">
            <SelectItem
              onChange={(e) => handelChange(e)}
              value="business-overview"
            >
              Business Overview
            </SelectItem>
            <SelectItem
              onChange={(e) => handelChange(e)}
              value="aspiring-business"
            >
              Business Overview
            </SelectItem>
            <SelectItem
              onChange={(e) => handelChange(e)}
              value="current-processes"
            >
              Current Processes & Pain Points
            </SelectItem>
            <SelectItem
              value="operations-growth"
              onChange={(e) => handelChange(e)}
            >
              Operations & Growth
            </SelectItem>
            <SelectItem
              value="future-goals-integration-needs"
              onChange={(e) => handelChange(e)}
            >
              Future Goals & Integration Needs
            </SelectItem>
            <SelectItem
              value="readiness-budget"
              onChange={(e) => handelChange(e)}
            >
              Readiness Budget
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((card) => (
          <Card
            key={card.id}
            className="border border-gray-200 group hover:shadow-md transition-shadow"
          >
            {editingCardId === card.id ? (
              <>
                <CardHeader>
                  <div className="space-y-4">
                    <Input
                      value={editFormData?.question || ""}
                      onChange={(e) => updateQuestion(e.target.value)}
                      placeholder="Enter question"
                      className="text-base py-7 font-medium"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    {editFormData?.options.map((option) => (
                      <Input
                        key={option.id}
                        value={option.text}
                        onChange={(e) =>
                          updateOption(option.id, e.target.value)
                        }
                        placeholder="Enter option text"
                        className="py-7 px-4 bg-gray-50 rounded-2xl border"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="py-5"
                      onClick={handleCancel}
                    >
                      <X /> Cancel
                    </Button>
                    <Button className="py-5" onClick={handleSave}>
                      <Save /> Save
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <h3 className="text-base font-medium leading-relaxed">
                      {card.question}
                    </h3>
                    <button
                      onClick={() => handleEdit(card)}
                      className=" p-2 cursor-pointer rounded-full hover:bg-gray-200 "
                    >
                      <PiPencilFill className="text-2xl font-bold" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {card.options.map((option) => (
                      <div
                        key={option.id}
                        className="py-4 px-4 bg-gray-50 rounded-2xl border"
                      >
                        {option.text}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SMBViewAnswersPage;
