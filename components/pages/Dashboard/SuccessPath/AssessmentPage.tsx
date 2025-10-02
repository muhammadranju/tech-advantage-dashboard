"use client";
import { AssessmentCardSkeleton } from "@/components/skeletons/AssessmentCardSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSuccessPathAssessmentQuestionAnswerQuery,
  useUpdateSuccessPathAssessmentQuestionAnswerMutation,
} from "@/lib/redux/features/api/successPath/successPathSliceApi";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";

interface Assessment {
  _id: string;
  range: string;
  title?: string;
  begineerData: string;
  IntermediateData: string;
  proData: string;
}

interface SuccessPathTitles {
  [key: string]: string[];
}

type CategoryType =
  | "looking-to-get-into-tech"
  | "small-business"
  | "aspiring-entrepreneur";

const successPathTitles: SuccessPathTitles = {
  "looking-to-get-into-tech": [
    "Early Stage Business",
    "Growing Business",
    "Established Business",
  ],
  "small-business": [
    "You're Building the Basics",
    "You're on the Growth Track!",
    "You're Ready to Scale",
  ],
  "aspiring-entrepreneur": [
    "Time to Shape Your Idea",
    "You're Ready to Launch!",
    "Ready to Launch Big",
  ],
};

export default function AssessmentPage() {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Assessment | null>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    "aspiring-entrepreneur"
  );
  const { data: assessmentData, isLoading } =
    useGetSuccessPathAssessmentQuestionAnswerQuery({
      category: selectedCategory || "aspiring-entrepreneur",
    });

  const [assessments, setAssessments] = useState<Assessment[]>(
    assessmentData?.data?.assessment || []
  );

  const [updateSuccessPathAssessmentQuestionAnswer] =
    useUpdateSuccessPathAssessmentQuestionAnswerMutation();

  // Function to split paragraph by fullstop and return array
  const splitByFullstop = (text: string): string[] => {
    if (!text) return [];
    return text
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const handleEdit = (assessment: Assessment): void => {
    setEditingId(assessment._id);
    setEditForm({ ...assessment });
  };

  const handleCancel = (): void => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = async (): Promise<void> => {
    try {
      const result = await updateSuccessPathAssessmentQuestionAnswer({
        id: editingId,
        category: selectedCategory,
        body: editForm,
      }).unwrap();

      if (result.success && editForm && editingId) {
        setAssessments(
          assessments.map((a) => (a._id === editingId ? editForm : a))
        );
        console.log("Saved data:", editForm); // Only logs the edited item
        setEditingId(null);
        setEditForm(null);
        toast.success("Assessment updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update assessment. Please try again.");
    }

    // if (editForm && editingId) {
    //   setAssessments(
    //     assessments.map((a) => (a._id === editingId ? editForm : a))
    //   );
    //   console.log("Saved data:", editForm); // Only logs the edited item
    //   setEditingId(null);
    //   setEditForm(null);
    // }
  };

  // const handleDelete = async (): Promise<void> => {
  //   try {
  //     const result = await deleteSuccessPathAssessmentQuestionAnswer({
  //       id: deleteDialogId,
  //       category: selectedCategory,
  //     }).unwrap();

  //     if (result.success) {
  //       setAssessments(assessments.filter((a) => a._id !== deleteDialogId));
  //       if (editingId === deleteDialogId) {
  //         setEditingId(null);
  //         setEditForm(null);
  //       }
  //       setDeleteDialogId(null);
  //       toast.success("Assessment deleted successfully");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to delete assessment. Please try again.");
  //   }

  //   // setAssessments(assessments.filter((a) => a._id !== deleteDialogId));
  //   // if (editingId === deleteDialogId) {
  //   //   setEditingId(null);
  //   //   setEditForm(null);
  //   // }
  //   // setDeleteDialogId(null);
  // };

  const updateField = (field: keyof Assessment, value: string): void => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  console.log(editForm);

  useEffect(() => {
    if (assessmentData?.data?.assessment) {
      setAssessments(assessmentData.data.assessment);
    }
  }, [assessmentData?.data?.assessment]);

  if (isLoading) {
    return (
      <div className="w-full mx-auto rounded-xl">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.back()}
            className="pb-2 text-lg font-medium hover:border-b-2 border-black transition-all duration-200"
          >
            Quiz
          </button>
          <button className="pb-2 text-lg font-medium border-b-2 border-black">
            Assessment
          </button>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {[1, 2, 3, 4].map((i) => (
          <AssessmentCardSkeleton key={i} />
        ))}
        {/* </div> */}
      </div>
    );
  }

  return (
    <section className="space-y-3 p-10">
      <div className="flex justify-between gap-8 mb-5">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.back()}
            className="pb-2 text-lg font-medium hover:border-b-2 border-black"
          >
            Quiz
          </button>
          <button className="pb-2 text-lg font-medium border-b-2 border-black">
            Assessment
          </button>
        </div>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as CategoryType)}
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

      {assessments.map((assessment, index) => (
        <Card key={assessment._id} className="w-full">
          {editingId === assessment._id ? (
            <>
              {/* Edit Mode */}
              <CardHeader className="flex justify-between items-start">
                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <label htmlFor="range" className="text-sm font-medium">
                      Range
                    </label>
                    <Input
                      id="range"
                      value={editForm?.range || ""}
                      onChange={(e) => updateField("range", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {successPathTitles[selectedCategory]?.[index] ||
                        "Title not found"}
                    </h3>
                  </div>
                  <div>
                    <label
                      htmlFor="begineerData"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <Textarea
                      id="begineerData"
                      value={editForm?.begineerData || ""}
                      onChange={(e) =>
                        updateField("begineerData", e.target.value)
                      }
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label htmlFor="whatWeFound" className="font-bold block mb-2">
                    What We Found
                  </label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Separate each point with a fullstop (.)
                  </p>
                  <Textarea
                    id="whatWeFound"
                    value={editForm?.IntermediateData || ""}
                    onChange={(e) =>
                      updateField("IntermediateData", e.target.value)
                    }
                    rows={4}
                    placeholder="Point one. Point two. Point three."
                  />
                </div>

                <div>
                  <label
                    htmlFor="recommendedNextSteps"
                    className="font-bold block mb-2"
                  >
                    Recommended Next Steps
                  </label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Separate each point with a fullstop (.)
                  </p>
                  <Textarea
                    id="recommendedNextSteps"
                    value={editForm?.proData || ""}
                    onChange={(e) => updateField("proData", e.target.value)}
                    rows={4}
                    placeholder="Step one. Step two. Step three."
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="py-5"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={handleSave} className="py-5">
                    <Save className="h-4 w-4" /> Save
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              {/* Display Mode */}
              <CardHeader className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <Badge
                    variant="secondary"
                    className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
                  >
                    Range - {assessment.range}
                  </Badge>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {successPathTitles[selectedCategory]?.[index] ||
                        "Title not found"}
                    </h3>

                    {assessment.begineerData && (
                      <p className="leading-relaxed text-muted-foreground">
                        {assessment.begineerData}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(assessment)}
                    className="hover:bg-gray-100 cursor-pointer p-3 rounded-full"
                  >
                    <PiPencilFill className="text-2xl font-bold" />
                  </button>
                  {/* <button
                    onClick={() => setDeleteDialogId(assessment._id)}
                    className="hover:bg-red-100 cursor-pointer p-3 text-2xl rounded-full"
                  >
                    <Trash className="h-5 w-5 text-red-500" />
                  </button> */}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {assessment.IntermediateData && (
                  <div>
                    <h4 className="font-bold mb-2">What We Found</h4>
                    <ul className="space-y-1">
                      {splitByFullstop(assessment.IntermediateData).map(
                        (finding, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-1">•</span>
                            <span className="leading-relaxed">{finding}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {assessment.proData && (
                  <div>
                    <h4 className="font-bold mb-2">Recommended Next Steps</h4>
                    <ul className="space-y-1">
                      {splitByFullstop(assessment.proData).map((step, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </>
          )}
        </Card>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogId !== null}
        onOpenChange={(open) => !open && setDeleteDialogId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteDialogId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              // onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
