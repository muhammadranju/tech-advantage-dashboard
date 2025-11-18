"use client";
import Pagination from "@/components/pagination/Pagination";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import {
  AlertDialog,
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
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteBusinessPlanLongQuestionAnswerMutation,
  useGetBusinessPlanLongQuestionAnswerQuery,
  useUpdateBusinessPlanLongQuestionAnswerMutation,
} from "@/lib/redux/features/api/businessPlanning/businessPlanningApiSlice";
import { Save, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";
import { SurveyCard } from "./business_planning.interface";

const ViewLongAnswersPage = () => {
  const [data, setData] = useState<SurveyCard[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteBusinessPlanLongQuestionAnswer] =
    useDeleteBusinessPlanLongQuestionAnswerMutation();
  const { data: longQuestionAnswerData, isLoading } =
    useGetBusinessPlanLongQuestionAnswerQuery(null);

  const [updateBusinessPlanLongQuestionAnswer] =
    useUpdateBusinessPlanLongQuestionAnswerMutation();

  const itemsPerPage = 6;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData =
    data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) ||
    [];

  const startEdit = (card: SurveyCard) => {
    setEditingCardId(card._id);
    setEditFormData({ ...card });
  };

  const cancelEdit = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };


  const updateQuestion = (value: string) =>
    editFormData && setEditFormData({ ...editFormData, questionText: value });

  const updateAnswer = (value: string) =>
    editFormData && setEditFormData({ ...editFormData, answer: value });

  const handelDelete = async (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handelDeleteConfirmed = async () => {
    try {
      await deleteBusinessPlanLongQuestionAnswer({
        id: deleteId,
      }).unwrap();
      toast.success("Answer deleted successfully");
      // Filter out the deleted item from current state
      setData((prevData: SurveyCard[]) =>
        prevData.filter((card) => card._id !== deleteId)
      );
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete answer. Please try again.");
    }
  };
  const saveEdit = async () => {
    if (editFormData) {
      try {
        const result = await updateBusinessPlanLongQuestionAnswer({
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
        toast.error(error as string || "Failed to update answer. Please try again.");
        // Optionally, revert the local state if the update failed
      }
    }
  };

  useEffect(() => {
    if (longQuestionAnswerData?.data) {
      setData(longQuestionAnswerData.data);
      setCurrentPage(1);
    }
  }, [longQuestionAnswerData?.data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {paginatedData.map((card) => (
          <Card
            key={card._id}
            className="border border-gray-200 group hover:shadow-md transition-shadow"
          >
            {editingCardId === card._id ? (
              <>
                <CardHeader>
                  <Input
                    value={editFormData?.questionText || ""}
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
                    <Button
                      variant="outline"
                      className="py-5"
                      onClick={cancelEdit}
                    >
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button className="py-5" onClick={saveEdit}>
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
                  <div className="py-4 px-4 bg-gray-50 rounded-2xl border">
                    {card.answer}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              answer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handelDeleteConfirmed}
              className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewLongAnswersPage;
