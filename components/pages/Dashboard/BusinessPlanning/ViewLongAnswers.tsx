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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem blanditiis expedita saepe illum maxime est excepturi, aut suscipit voluptates sed similique natus perspiciatis eos et facere laborum itaque nobis doloribus esse fuga, unde at? Excepturi voluptates ipsa veritatis labore quaerat itaque ex modi?",
  },
  {
    id: "2",
    question: "How do you handle difficult business decisions?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem blanditiis expedita saepe illum maxime est excepturi, aut suscipit voluptates sed similique natus perspiciatis eos et facere laborum itaque nobis doloribus esse fuga, unde at? Excepturi voluptates ipsa veritatis labore quaerat itaque ex modi?",
  },
  {
    id: "3",
    question: "What is your leadership style?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem blanditiis expedita saepe illum maxime est excepturi, aut suscipit voluptates sed similique natus perspiciatis eos et facere laborum itaque nobis doloribus esse fuga, unde at? Excepturi voluptates ipsa veritatis labore quaerat itaque ex modi?",
  },
  {
    id: "4",
    question: "How do you manage work-life balance?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem blanditiis expedita saepe illum maxime est excepturi, aut suscipit voluptates sed similique natus perspiciatis eos et facere laborum itaque nobis doloribus esse fuga, unde at? Excepturi voluptates ipsa veritatis labore quaerat itaque ex modi?",
  },
  {
    id: "5",
    question: "What drives innovation in your company?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi quidem blanditiis expedita saepe illum maxime est excepturi, aut suscipit voluptates sed similique natus perspiciatis eos et facere laborum itaque nobis doloribus esse fuga, unde at? Excepturi voluptates ipsa veritatis labore quaerat itaque ex modi?",
  },
];

const ViewLongAnswersPage = () => {
  const [data, setData] = useState<SurveyCard[]>(surveyData);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);

  const router = useRouter();

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
      setEditingCardId(null);
      setEditFormData(null);
    }
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

  const updateAnswer = (value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, answer: value });
    }
  };

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
                    <Textarea
                      placeholder="Enter question answer"
                      value={editFormData?.answer || ""}
                      onChange={(e) => updateAnswer(e.target.value)}
                      className="py-7 px-4 bg-gray-50 rounded-2xl border min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="py-5"
                      onClick={handleCancel}
                    >
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button className="py-5" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> Save
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
                      className="p-2 cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      <PiPencilFill className="text-2xl font-bold" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="py-4 px-4 bg-gray-50 rounded-2xl border">
                      {card.answer}
                    </div>
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

export default ViewLongAnswersPage;
