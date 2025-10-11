/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import data from "@/data/success-assessment.json";
import { Trash, Save, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type IncomingAssessment =
  | {
      range: string;
      title: string;
      subtitle?: string;
      description?: string;
      findings?: string[];
      what_we_found?: string[];
      recommendations?: string[];
      recommended_next_steps?: string[];
    }
  | Record<string, never>;

interface NormalizedAssessment {
  range: string;
  title: string;
  description: string;
  whatWeFound: string[];
  recommendedNextSteps: string[];
}

const normalize = (a: IncomingAssessment): NormalizedAssessment => ({
  range: a.range ?? "",
  title: a.title ?? "",
  description: a.description ?? a.subtitle ?? "",
  whatWeFound: a.what_we_found ?? a.findings ?? [],
  recommendedNextSteps: a.recommended_next_steps ?? a.recommendations ?? [],
});

const AssessmentLoading = () => (
  <div className="space-y-3 mt-10">
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const BusinessAssessmentContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const rawList: IncomingAssessment[] = useMemo(() => {
    if (query === "small-business") return (data as any).SmallBusiness ?? [];
    if (query === "aspiring-entrepreneur")
      return (data as any).AspiringEntrepreneur ?? [];
    if (query === "looking-tech")
      return (data as any).LookingToGetIntoTech ?? [];
    return [];
  }, [query]);

  const [assessmentData, setAssessmentData] = useState<NormalizedAssessment[]>(
    []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<NormalizedAssessment | null>(
    null
  );

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setAssessmentData(rawList.map(normalize));
  }, [rawList]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditFormData({ ...assessmentData[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditFormData(null);
  };

  const handleSave = () => {
    if (editFormData !== null && editingIndex !== null) {
      const updated = [...assessmentData];
      updated[editingIndex] = editFormData;
      setAssessmentData(updated);
      setEditingIndex(null);
      setEditFormData(null);
    }

  };

  const handleDeleteConfirmed = () => {
    if (deleteIndex !== null) {
      const updated = [...assessmentData];
      updated.splice(deleteIndex, 1);
      setAssessmentData(updated);

      if (editingIndex === deleteIndex) {
        setEditingIndex(null);
        setEditFormData(null);
      }

      setDeleteIndex(null);
      setOpenDialog(false);
    }
  };

  const updateField = (
    field: keyof NormalizedAssessment,
    value: string | string[]
  ) => {
    if (!editFormData) return;
    setEditFormData({ ...editFormData, [field]: value });
  };

  const updateArrayItem = (
    field: "whatWeFound" | "recommendedNextSteps",
    index: number,
    value: string
  ) => {
    if (!editFormData) return;
    const updatedArray = [...editFormData[field]];
    updatedArray[index] = value;
    setEditFormData({ ...editFormData, [field]: updatedArray });
  };

  const addArrayItem = (field: "whatWeFound" | "recommendedNextSteps") => {
    if (!editFormData) return;
    setEditFormData({ ...editFormData, [field]: [...editFormData[field], ""] });
  };

  const removeArrayItem = (
    field: "whatWeFound" | "recommendedNextSteps",
    index: number
  ) => {
    if (!editFormData) return;
    const updatedArray = [...editFormData[field]];
    updatedArray.splice(index, 1);
    setEditFormData({ ...editFormData, [field]: updatedArray });
  };

  return (
    <div className="space-y-3 mt-10">
      {assessmentData.map((assessment, index) => (
        <Card key={`${assessment.range}-${index}`} className="w-full">
          {editingIndex === index ? (
            <>
              {/* Edit Mode */}
              <CardHeader className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <label htmlFor="range">Range</label>
                  <Input
                    value={editFormData?.range || ""}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="text-sm font-bold"
                  />
                  <h3 className="text-xl font-bold">{assessment.title}</h3>
                  <Input
                    value={editFormData?.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold">What We Found</h4>
                  {editFormData?.whatWeFound.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateArrayItem("whatWeFound", i, e.target.value)
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        onClick={() => removeArrayItem("whatWeFound", i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addArrayItem("whatWeFound")}>
                    Add
                  </Button>
                </div>

                <div>
                  <h4 className="font-bold">Recommended Next Steps</h4>
                  {editFormData?.recommendedNextSteps.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            "recommendedNextSteps",
                            i,
                            e.target.value
                          )
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        onClick={() =>
                          removeArrayItem("recommendedNextSteps", i)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addArrayItem("recommendedNextSteps")}>
                    Add
                  </Button>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleCancel}>
                    <X /> Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save /> Save
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
                    <h3 className="text-xl font-bold">{assessment.title}</h3>
                    {assessment.description && (
                      <p className="leading-relaxed">
                        {assessment.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="hover:bg-gray-100 cursor-pointer p-3 rounded-full"
                  >
                    <PiPencilFill className="text-2xl font-bold" />
                  </button>

                  <Dialog
                    open={openDialog && deleteIndex === index}
                    onOpenChange={setOpenDialog}
                  >
                    <DialogTrigger asChild>
                      <button
                        onClick={() => {
                          setDeleteIndex(index);
                          setOpenDialog(true);
                        }}
                        className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                      >
                        <Trash className="text-2xl font-bold text-red-500" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this assessment?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setDeleteIndex(null);
                            setOpenDialog(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteConfirmed}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {assessment.whatWeFound.length > 0 && (
                  <div>
                    <h4 className="font-bold">What We Found</h4>
                    <ul className="space-y-1">
                      {assessment.whatWeFound.map((finding, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span className="leading-relaxed">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {assessment.recommendedNextSteps.length > 0 && (
                  <div>
                    <h4 className="font-bold">Recommended Next Steps</h4>
                    <ul className="space-y-1">
                      {assessment.recommendedNextSteps.map((rec, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span className="leading-relaxed">{rec}</span>
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
    </div>
  );
};

const BusinessAssessment = () => {
  return (
    <Suspense fallback={<AssessmentLoading />}>
      <BusinessAssessmentContent />
    </Suspense>
  );
};

export default BusinessAssessment;
