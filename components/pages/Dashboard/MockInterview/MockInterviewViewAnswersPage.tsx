"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Trash, X } from "lucide-react";
import { useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import BackButtons from "../BootCamp/BackButtons";

interface SurveyOption {
  id: string;
  text: string;
  marks: number;
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
      { id: "1a", text: "Solving problems", marks: 1 },
      { id: "1b", text: "Creating innovative products", marks: 0.5 },
      { id: "1c", text: "Leading and inspiring team", marks: 0 },
    ],
  },
  {
    id: "2",
    question: "What motivates you most in business?",
    options: [
      { id: "2a", text: "Solving problems", marks: 1 },
      { id: "2b", text: "Creating innovative products", marks: 0.5 },
      { id: "2c", text: "Leading and inspiring team", marks: 0 },
    ],
  },
];

const MockInterviewViewAnswersPage = () => {
  const [data, setData] = useState<SurveyCard[]>(surveyData || []);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);

  const handleEdit = (card: SurveyCard) => {
    setEditingCardId(card.id);
    setEditFormData({ ...card });
  };

  const handleSave = () => {
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

  const handleDeleteConfirmed = (cardId: string) => {
    setData((prevData) => prevData.filter((card) => card.id !== cardId));
  };

  const updateQuestion = (value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, question: value });
    }
  };

  const updateOption = (
    optionId: string,
    field: "text" | "marks",
    value: string | number
  ) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        options: editFormData.options.map((option) =>
          option.id === optionId
            ? { ...option, [field]: field === "marks" ? Number(value) : value }
            : option
        ),
      });
    }
  };

  return (
    <div className="w-full mx-auto p-8 rounded-xl">
      <BackButtons backTitle="Quiz" title={"Answers"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((card) => (
          <Card
            key={card.id}
            className="border border-gray-200 group hover:shadow-md transition-shadow"
          >
            {editingCardId === card.id ? (
              <>
                <CardHeader>
                  <Input
                    value={editFormData?.question || ""}
                    onChange={(e) => updateQuestion(e.target.value)}
                    placeholder="Enter question"
                    className="text-base py-7 font-medium"
                  />
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {editFormData?.options.map((option) => (
                    <div key={option.id} className="flex gap-2">
                      <Input
                        value={option.text}
                        onChange={(e) =>
                          updateOption(option.id, "text", e.target.value)
                        }
                        placeholder="Enter option text"
                        className="py-7 px-4 bg-gray-50 rounded-2xl border flex-1"
                      />
                      <Input
                        type="number"
                        value={option.marks}
                        onChange={(e) =>
                          updateOption(option.id, "marks", e.target.value)
                        }
                        placeholder="Marks"
                        className="py-7 w-24"
                      />
                    </div>
                  ))}
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
                  <div className="flex items-start justify-between w-full">
                    <h3 className="text-base font-medium leading-relaxed">
                      {card.question}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(card)}
                        className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
                      >
                        <PiPencilFill className="text-2xl font-bold" />
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 cursor-pointer rounded-full hover:bg-red-100">
                            <Trash className="text-2xl font-bold text-red-500" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Question</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this entire
                              question and all its answers? This action cannot
                              be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-end gap-2 mt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteConfirmed(card.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {card.options.map((option) => (
                    <div
                      key={option.id}
                      className="py-4 px-4 bg-gray-50 rounded-2xl border flex justify-between"
                    >
                      <span>{option.text}</span>
                      <span className="font-medium">{option.marks}</span>
                    </div>
                  ))}
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MockInterviewViewAnswersPage;
