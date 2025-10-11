/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/pagination/Pagination";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SurveyCard } from "@/interface/assessments.interface";
import {
  useDeleteSuccessPathQuizQuestionAnswerMutation,
  useGetSuccessPathQuizQuestionAnswerQuery,
  useUpdateSuccessPathQuizQuestionAnswerMutation,
} from "@/lib/redux/features/api/successPath/successPathSliceApi";
import { Save, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";

const QuizzesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "aspiring-entrepreneur"
  );
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: quizData, isLoading } =
    useGetSuccessPathQuizQuestionAnswerQuery({
      category: selectedCategory || "aspiring-entrepreneur",
    });
  const [data, setData] = useState<SurveyCard[]>([]);

  const [deleteSuccessPathQuizQuestionAnswer] =
    useDeleteSuccessPathQuizQuestionAnswerMutation();

  const [updateSuccessPathQuizQuestionAnswer, { isLoading: isUpdating }] =
    useUpdateSuccessPathQuizQuestionAnswerMutation();

  const itemsPerPage = 4;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData =
    data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) ||
    [];

  const handleEdit = (card: SurveyCard) => {
    setEditingCardId(card._id);
    setEditFormData({ ...card });
  };

  const handleSave = async () => {
    try {
      await updateSuccessPathQuizQuestionAnswer({
        body: editFormData,
        category: selectedCategory,
        id: editFormData?._id,
      }).unwrap();

      toast.success("Question updated successfully");

      if (editFormData) {
        setData((prevData) =>
          prevData.map((card) =>
            card._id === editFormData._id ? editFormData : card
          )
        );
      }
      setEditingCardId(null);
      setEditFormData(null);
    } catch (error) {
      console.error("Failed to update:", error);
      toast.error("Failed to update question. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };

  const updateQuestion = (value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, questionText: value });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteSuccessPathQuizQuestionAnswer({
        id: deleteId,
        category: selectedCategory,
      }).unwrap();

      if (result.success) {
        setData((prevData: SurveyCard[]) =>
          prevData.filter((item) => item._id !== deleteId)
        );

        setOpenDeleteDialog(false);
        setDeleteId(null);
        toast.success("Quiz question deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete question. Please try again.");
    }
  };

  const handelDeleteAlert = async (deleteId: string) => {
    setDeleteId(deleteId);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    if (quizData?.data?.questions) {
      setData(quizData.data.questions);
      setCurrentPage(1);
    }
  }, [quizData?.data?.questions]);

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-8 rounded-xl">
        <BackButtons backTitle="Question" title={"Answer"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 ">
      <div className="flex justify-between gap-8 mb-5">
        <BackButtons backTitle="Quiz" title={"Answer"} />
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedData?.map((card: any) => (
          <Card
            key={card._id}
            className="border border-gray-200 group hover:shadow-md transition-shadow"
          >
            {editingCardId === card._id ? (
              <>
                <CardHeader>
                  <div className="space-y-4">
                    <Input
                      value={editFormData?.questionText || ""}
                      onChange={(e) => updateQuestion(e.target.value)}
                      placeholder="Enter question"
                      className="text-base py-7 font-medium"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    {card.answers?.map((answer: any) => (
                      <Input
                        key={answer}
                        value={answer}
                        placeholder="Enter question"
                        className="text-base py-7 font-medium"
                        disabled
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
                    <Button
                      className="py-5"
                      onClick={handleSave}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
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
                        onClick={() => handleEdit(card)}
                        className=" p-2 cursor-pointer rounded-full hover:bg-gray-200 "
                      >
                        <PiPencilFill className="text-2xl font-bold" />
                      </button>
                      <button
                        onClick={() => handelDeleteAlert(card._id)}
                        className=" p-2 cursor-pointer rounded-full hover:bg-gray-200 "
                      >
                        <Trash className="text-2xl text-red-500 font-bold " />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {card.answers?.map((answer: any) => (
                      <Input
                        key={answer}
                        value={answer}
                        placeholder="Enter question"
                        className="text-base py-7 font-medium"
                        disabled
                      />
                    ))}
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
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              question and all its answers from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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

export default QuizzesPage;
