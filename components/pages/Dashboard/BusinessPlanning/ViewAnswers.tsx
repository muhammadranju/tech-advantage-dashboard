"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const surveyData: SurveyCard[] = Array.from({ length: 5 }, (_, i) => ({
  id: (i + 1).toString(),
  question: "What motivates you most in business?",
  options: [
    { id: `${i + 1}a`, text: "Solving problems" },
    { id: `${i + 1}b`, text: "Creating innovative products" },
    { id: `${i + 1}c`, text: "Leading and inspiring team" },
  ],
}));

const ViewAnswersPage = () => {
  const [data, setData] = useState<SurveyCard[]>(surveyData);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);

  const router = useRouter();

  const startEdit = (card: SurveyCard) => {
    setEditingCardId(card.id);
    setEditFormData({ ...card });
  };

  const cancelEdit = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };

  const saveEdit = () => {
    if (editFormData) {
      setData((prev) =>
        prev.map((c) => (c.id === editFormData.id ? editFormData : c))
      );
    }
    cancelEdit();
  };

  const updateQuestion = (value: string) =>
    editFormData && setEditFormData({ ...editFormData, question: value });

  const updateOption = (optionId: string, value: string) =>
    editFormData &&
    setEditFormData({
      ...editFormData,
      options: editFormData.options.map((opt) =>
        opt.id === optionId ? { ...opt, text: value } : opt
      ),
    });

  const EditForm = ({ card }: { card: SurveyCard }) => (
    <>
      <CardHeader>
        <Input
          value={editFormData?.question || ""}
          onChange={(e) => updateQuestion(e.target.value)}
          placeholder="Enter question"
          className="text-base py-7 font-medium"
        />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 mb-4">
          {editFormData?.options.map((opt) => (
            <Input
              key={opt.id}
              value={opt.text}
              onChange={(e) => updateOption(opt.id, e.target.value)}
              placeholder="Enter option text"
              className="py-7 px-4 bg-gray-50 rounded-2xl border"
            />
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" className="py-5" onClick={cancelEdit}>
            <X /> Cancel
          </Button>
          <Button className="py-5" onClick={saveEdit}>
            <Save /> Save
          </Button>
        </div>
      </CardContent>
    </>
  );

  const DisplayCard = ({ card }: { card: SurveyCard }) => (
    <>
      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="text-base font-medium leading-relaxed">
            {card.question}
          </h3>
          <button
            onClick={() => startEdit(card)}
            className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
          >
            <PiPencilFill className="text-2xl font-bold" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {card.options.map((opt) => (
            <div
              key={opt.id}
              className="py-4 px-4 bg-gray-50 rounded-2xl border"
            >
              {opt.text}
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );

  return (
    <div className="w-full mx-auto p-8 rounded-xl">
      <div className="flex gap-8 mb-5">
        <button
          onClick={() => router.back()}
          className="pb-2 text-lg font-medium hover:border-b-2 border-black"
        >
          Question
        </button>
        <button className="pb-2 text-lg font-medium border-b-2 border-black">
          Answer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((card) => (
          <Card
            key={card.id}
            className="border border-gray-200 group hover:shadow-md transition-shadow"
          >
            {editingCardId === card.id ? (
              <EditForm card={card} />
            ) : (
              <DisplayCard card={card} />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewAnswersPage;
