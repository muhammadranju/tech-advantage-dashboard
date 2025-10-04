"use client";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useDeleteBusinessPlanQuizQuestionAnswerMutation,
  useGetBusinessPlanQuizQuestionAnswerQuery,
  useUpdateBusinessPlanQuizQuestionAnswerMutation,
} from "@/lib/redux/features/api/businessPlanning/businessPlanningApiSlice";
import { Save, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";

interface SurveyOption {
  answer: string;
}

interface SurveyCard {
  _id: string;
  questionText: string;
  answers: SurveyOption[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const ViewAnswersPage = () => {
  const [data, setData] = useState<SurveyCard[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const { data: answers, isLoading } =
    useGetBusinessPlanQuizQuestionAnswerQuery(null);
  const [updateBusinessPlanQuizQuestionAnswer] =
    useUpdateBusinessPlanQuizQuestionAnswerMutation();

  const [deleteBusinessPlanQuizQuestionAnswer] =
    useDeleteBusinessPlanQuizQuestionAnswerMutation();

  const startEdit = (card: SurveyCard) => {
    setEditingCardId(card._id);
    setEditFormData({ ...card });
  };

  const cancelEdit = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteBusinessPlanQuizQuestionAnswer({
        id: deleteId!,
      }).unwrap();
      toast.success("Answer deleted successfully");

      setData((prevData: SurveyCard[]) =>
        prevData.filter((card) => card._id !== deleteId)
      );

      setOpenDeleteDialog(false);
      setEditingCardId(null);
      setEditFormData(null);
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete answer. Please try again.");
    }
  };

  const saveEdit = async () => {
    // if (editFormData) {
    //   try {
    //     const result = await updateBusinessPlanQuizQuestionAnswer({
    //       body: editFormData,
    //       id: editFormData._id,
    //     }).unwrap();

    //     if (result.success) {
    //       setData((prevData: SurveyCard[]) =>
    //         prevData.map((card) =>
    //           card._id === editFormData._id ? editFormData : card
    //         )
    //       );
    //       toast.success("Answer updated successfully");
    //       setEditingCardId(null);
    //       setEditFormData(null);
    //     }
    //   } catch (err) {
    //     console.error("Failed to update:", err);
    //     toast.error("Failed to update answer. Please try again.");
    //     cancelEdit();
    //   }
    // }
    if (editFormData) {
      try {
        const result = await updateBusinessPlanQuizQuestionAnswer({
          body: editFormData,
          id: editFormData._id,
        }).unwrap();

        if (result.success) {
          setData((prev) =>
            prev.map((card) =>
              card._id === editFormData._id ? editFormData : card
            )
          );
          toast.success("Answer updated successfully");
          setEditingCardId(null);
          setEditFormData(null);
          cancelEdit();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update answer. Please try again.");
        // Optionally, revert the local state if the update failed
      }
    }
  };

  useEffect(() => {
    if (answers?.data) {
      setData(answers.data);
    }
  }, [answers?.data]);

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-8 rounded-xl">
        <BackButtons backTitle="Question" title={"Answer"} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 rounded-xl">
      <BackButtons backTitle="Question" title={"Answer"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((card) => (
          <Card
            key={card._id}
            className="group hover:shadow-md transition-shadow"
          >
            {editingCardId === card._id ? (
              <>
                <CardHeader>
                  <Input
                    type="text"
                    value={editFormData?.questionText || ""}
                    onChange={(e) =>
                      setEditFormData((prev) =>
                        prev ? { ...prev, questionText: e.target.value } : null
                      )
                    }
                    placeholder="Enter question"
                    className="text-base py-7 font-medium"
                  />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3 mb-4">
                    {editFormData?.answers.map((opt, index) => (
                      <Input
                        key={index}
                        type="text"
                        value={opt.answer}
                        onChange={(e) => {
                          setEditFormData((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  answers: prev.answers.map((a, i) =>
                                    i === index
                                      ? { ...a, answer: e.target.value }
                                      : a
                                  ),
                                }
                              : null
                          );
                        }}
                        placeholder="Enter option text "
                        className="py-7 px-4 bg-gray-50 rounded-2xl border min-h-[120px]"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      className="py-5"
                      onClick={cancelEdit}
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                    <Button className="py-5" onClick={saveEdit}>
                      <Save className="w-4 h-4 mr-2 " /> Save
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <h3 className="text-base font-medium leading-relaxed">
                      {card.questionText}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(card)}
                        // size="icon"
                        className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
                      >
                        <PiPencilFill className="text-2xl font-bold" />
                      </button>
                      <button
                        onClick={() => handleDelete(card._id)}
                        // size="icon"
                        className="p-2 cursor-pointer rounded-full hover:bg-red-200"
                      >
                        <Trash className="text-2xl text-red-500 font-bold " />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {card.answers.map((opt, index) => (
                      <div
                        key={index}
                        className="py-4 px-4 bg-gray-50 rounded-2xl border border-gray-200"
                      >
                        {opt.answer}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              answer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewAnswersPage;
