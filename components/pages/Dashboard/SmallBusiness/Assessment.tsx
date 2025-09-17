"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { PiCheckBold, PiPencilFill, PiXBold } from "react-icons/pi";
import { toast } from "sonner";

// Type interfaces
interface Recommend {
  title: string;
  options: string;
}

interface Comment {
  id: number;
  title: string;
  content: string;
  range: string;
  recommend?: Recommend;
}

interface EditData extends Comment {
  recommend?: Recommend;
}

const initialComments: Comment[] = [
  {
    id: 1,
    title: "Minor Tweaks",
    content:
      "Based on your answers, your current setup needs targeted improvements rather than a full rebuild.",
    range: "Range - 0-4",
    recommend: {
      title: "We recommend",
      options:
        "add automations for X. connect Y to Z. deploy 3–5 key reports. 1 coaching session to lock a simple process",
    },
  },
  {
    id: 2,
    title: "Growth Solution",
    content:
      "You're ready for a tailored system that connects tools and automates your workflows.",
    range: "Range - 5-7",
    recommend: {
      title: "We recommend",
      options:
        "custom CRM layer. 1–2 integrations. marketing funnel. dashboard. a quarterly strategy cadence",
    },
  },
  {
    id: 3,
    title: "End-to-End Solution",
    content:
      "Your needs point to a complete solution: data model, CRM, multi-integration, compliance-grade reporting, advanced automations, migration, training, and KPI governance",
    range: "Range - 8-10",
  },
];

const AssessmentPage: React.FC = () => {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<EditData>({} as EditData);

  const handleEdit = (commentId: number): void => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditData({ ...comment });

      setEditingId(commentId);
    }
  };

  const handleSave = (commentId: number): void => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? editData : comment))
    );
    setEditingId(null);
    toast.success("Assessment saved successfully!");
    setEditData({} as EditData);
  };

  const handleDelete = (commentId: number): void => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    toast.success("Assessment deleted successfully!");
  };

  const handleCancel = (): void => {
    setEditingId(null);
    setEditData({} as EditData);
    toast.warning("Assessment canceled!");
  };

  const handleInputChange = (field: keyof Comment, value: string): void => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionsChange = (value: string): void => {
    setEditData((prev) => ({
      ...prev,
      recommend: {
        ...prev.recommend,
        title: prev.recommend?.title || "",
        options: value,
      },
    }));
  };

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    field: keyof Comment
  ): void => {
    handleInputChange(field, e.target.value);
  };

  const handleInputFieldChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Comment
  ): void => {
    handleInputChange(field, e.target.value);
  };

  return (
    <div className="space-y-5">
      <div className=" mx-auto bg-white">
        {/* Comment Cards */}
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.back()}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Question & Answer
          </button>
          <button
            className={`pb-2 text-lg font-medium border-b-2 border-black`}
          >
            Assessment
          </button>
        </div>
        <div className="space-y-6">
          {comments.map((comment) => {
            const isEditing: boolean = editingId === comment.id;
            const currentData: Comment = isEditing ? editData : comment;

            return (
              <Card key={comment.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentData.range}
                            onChange={(e) => handleInputFieldChange(e, "range")}
                            className="bg-transparent border-none outline-none text-sm w-24"
                          />
                        ) : (
                          currentData.range
                        )}
                      </Badge>
                    </div>

                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(comment.id)}
                          className="hover:bg-green-100 cursor-pointer p-3 rounded-full"
                          type="button"
                        >
                          <PiCheckBold className="text-2xl font-bold text-green-600" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                          type="button"
                        >
                          <PiXBold className="text-2xl font-bold text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(comment.id)}
                          className="hover:bg-gray-100 cursor-pointer p-3 rounded-full"
                          type="button"
                        >
                          <PiPencilFill className="text-2xl font-bold " />
                        </button>

                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                          type="button"
                        >
                          <Trash className="text-2xl font-bold text-red-500 " />
                        </button>
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold">{currentData.title}</h1>

                  {isEditing ? (
                    <textarea
                      value={currentData.content}
                      onChange={(e) => handleTextareaChange(e, "content")}
                      className="leading-relaxed border rounded-lg border-gray-300 px-2 py-1 w-full min-h-[80px] resize-y"
                    />
                  ) : (
                    <p className="leading-relaxed">{currentData.content}</p>
                  )}

                  {currentData.recommend && (
                    <div className="">
                      <h4 className="text-lg font-semibold">
                        {currentData.recommend.title}
                      </h4>

                      <div className="flex flex-col">
                        {isEditing ? (
                          <textarea
                            value={currentData.recommend.options}
                            onChange={(e) =>
                              handleOptionsChange(e.target.value)
                            }
                            placeholder="Enter options separated by periods (e.g., option 1. option 2. option 3)"
                            className="border border-gray-300 capitalize rounded-lg px-2 py-2 w-full min-h-[80px] resize-y"
                          />
                        ) : (
                          currentData.recommend.options
                            .split(".")
                            .filter((option: string) => option.trim() !== "")
                            .map((option: string, index: number) => (
                              <ol
                                key={index}
                                className="list-disc list-inside capitalize"
                              >
                                <li>{option.trim()}</li>
                              </ol>
                            ))
                        )}
                      </div>
                    </div>
                  )}
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
