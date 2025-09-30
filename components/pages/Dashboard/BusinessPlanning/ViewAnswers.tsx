"use client";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useDeleteBusinessPlanQuizQuestionAnswerMutation,
  useGetBusinessPlanQuizQuestionAnswerQuery,
  useUpdateBusinessPlanQuizQuestionAnswerMutation,
} from "@/lib/redux/features/api/businessPlanning/businessPlanningApiSlice";
import { Save, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";

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

  const router = useRouter();

  const startEdit = (card: SurveyCard) => {
    setEditingCardId(card._id);
    setEditFormData({ ...card });
  };

  const cancelEdit = () => {
    setEditingCardId(null);
    setEditFormData(null);
    toast.info("Answer editing canceled!");
  };

  const handelDelete = async (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };
  const handelDeleteConfirmed = async () => {
    try {
      await deleteBusinessPlanQuizQuestionAnswer({
        id: deleteId,
      }).unwrap();
      toast.success("Answer deleted successfully");

      // Filter out the deleted item from current state
      setData((prevData: SurveyCard[]) =>
        prevData.filter((card) => card._id !== deleteId)
      );
      // if (editFormData) {
      //   setEditingCardId(deleteId);
      //   setEditFormData(null);
      // }
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete answer. Please try again.");
    }
  };

  const saveEdit = async () => {
    if (editFormData) {
      try {
        const result = await updateBusinessPlanQuizQuestionAnswer({
          body: editFormData,
        }).unwrap();

        if (result.success) {
          setData((prevData: SurveyCard[]) =>
            prevData.map((card) =>
              card._id === editFormData._id ? editFormData : card
            )
          );
        }

        console.log(editFormData);
        toast.success("Answer updated successfully");
      } catch (err) {
        cancelEdit();
        console.error("Failed to update:", err);
        // Optionally handle error, e.g., show toast or revert
        return; // Don't cancel if failed, or handle as needed
      }
    }
  };

  useEffect(() => {
    if (answers?.data) {
      setData(answers.data);
    }
  }, [answers?.data]);

  const EditForm = () => (
    <>
      <CardHeader>
        <Input
          value={editFormData?.questionText}
          placeholder="Enter question"
          className="text-base py-7 font-medium"
        />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 mb-4">
          {editFormData?.answers.map((opt, index) => (
            <Input
              key={index}
              value={opt.answer}
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
            {card.questionText}
          </h3>
          <div>
            <button
              onClick={() => startEdit(card)}
              className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
            >
              <PiPencilFill className="text-2xl font-bold" />
            </button>
            <button
              onClick={() => handelDelete(card._id)}
              className="p-2 cursor-pointer rounded-full hover:bg-red-200"
            >
              <Trash className="text-2xl text-red-500 font-bold " />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {card.answers.map((opt, index) => (
            <div
              key={index}
              className="py-4 px-4 bg-gray-50 rounded-2xl border"
            >
              {opt.answer}
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
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          data.map((card) => (
            <Card
              key={card._id}
              className="border border-gray-200 group hover:shadow-md transition-shadow"
            >
              {editingCardId === card._id ? (
                <EditForm />
              ) : (
                <DisplayCard card={card} />
              )}
            </Card>
          ))
        )}
      </div>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                onClick={handelDeleteConfirmed}
                className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewAnswersPage;
