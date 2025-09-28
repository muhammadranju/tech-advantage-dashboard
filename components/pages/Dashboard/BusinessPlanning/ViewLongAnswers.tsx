"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilFill } from "react-icons/pi";

interface SurveyCard {
  id: string;
  question: string;
  answer: string;
}

const surveyData: SurveyCard[] = [
  {
    id: "1",
    question: "What motivates you most in business?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem...",
  },
  {
    id: "2",
    question: "How do you handle difficult business decisions?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem...",
  },
  {
    id: "3",
    question: "What is your leadership style?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem...",
  },
  {
    id: "4",
    question: "How do you manage work-life balance?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem...",
  },
  {
    id: "5",
    question: "What drives innovation in your company?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem...",
  },
];

const ViewLongAnswersPage = () => {
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
        prev.map((card) => (card.id === editFormData.id ? editFormData : card))
      );
      cancelEdit();
    }
  };

  const updateQuestion = (value: string) =>
    editFormData && setEditFormData({ ...editFormData, question: value });

  const updateAnswer = (value: string) =>
    editFormData && setEditFormData({ ...editFormData, answer: value });

  const EditForm = () => (
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
        <Textarea
          value={editFormData?.answer || ""}
          onChange={(e) => updateAnswer(e.target.value)}
          placeholder="Enter answer"
          className="py-7 px-4 bg-gray-50 rounded-2xl border min-h-[120px]"
        />
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" className="py-5" onClick={cancelEdit}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button className="py-5" onClick={saveEdit}>
            <Save className="mr-2 h-4 w-4" /> Save
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
            className="p-2 cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <PiPencilFill className="text-2xl font-bold" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="py-4 px-4 bg-gray-50 rounded-2xl border">
          {card.answer}
        </div>
      </CardContent>
    </>
  );

  return (
    <div className="w-full mx-auto p-8 rounded-xl">
      <div className="flex gap-8 mb-5">
        <button
          onClick={() => router.back()}
          className="pb-2 text-lg font-medium hover:border-b-2 border-black transition-all duration-200"
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
              <EditForm />
            ) : (
              <DisplayCard card={card} />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewLongAnswersPage;
