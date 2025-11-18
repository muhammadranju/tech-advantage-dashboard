/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateContentMutation,
  useDeleteContentMutation,
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/lib/redux/features/api/courses/contentSliceApi";
import { FileText, Play, Plus, Save, Trash2, X } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import BackButtons from "../BootCamp/BackButtons";
import { CourseContent, PDF, Video } from "./course.interface";

type MediaType = "video" | "pdf";

interface EditingItem {
  id: string;
  title: string;
}

function EmptyCard({ type }: { type: MediaType }) {
  const LabelIcon = type === "video" ? Play : FileText;
  const label = type === "video" ? "videos" : "PDFs";

  return (
    <Card className="border-none">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <LabelIcon className="w-5 h-5 " />
          <h2 className="text-lg font-medium ">{label} (0)</h2>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
          <div className="w-20 h-20  rounded-full flex items-center justify-center mb-6">
            <LabelIcon className="w-20 h-20 " />
          </div>
          <p className=" text-center mb-2">No {label} added yet</p>
          <p className=" text-sm text-center">
            Click &quot;Add {type === "video" ? "Video" : "PDF"}&quot; to get
            started
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CourseContentPage() {
  const { modules, videoID } = useParams();
  const searchParams = useSearchParams();
  const newModuleTitle = searchParams.get("module-title");
  const moduleId = modules as string;
  const videoId = videoID as string;

  const [openDialog, setOpenDialog] = useState<MediaType | null>(null);
  const [courseContent, setCourseContent] = useState<CourseContent>({
    id: videoId,
    title: "Introduction to Programming",
    videos: [],
    pdfs: [],
  });
  const [addTitle, setAddTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: courseData } = useGetContentsQuery({
    videoID: videoId,
    moduleId,
  });

  const [createContent] = useCreateContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const [deleteContent] = useDeleteContentMutation();

  useEffect(() => {
    if (courseData?.data) {
      const videos: Video[] = courseData.data
        .filter((item: any) => item.type === "video")
        .map((item: any) => ({
          id: item._id,
          title: item.title,
          duration: "", // Default, as not provided in API
        }));

      const pdfs: PDF[] = courseData.data
        .filter((item: any) => item.type === "pdf")
        .map((item: any) => ({
          id: item._id,
          title: item.title,
          size: "", // Default, as not provided in API
          pages: 0, // Default, as not provided in API
        }));

      setCourseContent((prev) => ({ ...prev, videos, pdfs }));
    }
  }, [courseData]);

  const handleEdit = (type: MediaType, id: string) => {
    const item =
      type === "video"
        ? courseContent.videos.find((v) => v.id === id)
        : courseContent.pdfs.find((p) => p.id === id);
    if (item) {
      setEditingItem({ id: item.id, title: item.title });
      setAddTitle(item.title);
      setOpenDialog(type);
    }
  };

  const handleDelete = (type: MediaType, id: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      deleteContent({ id, moduleId, videoID: videoId }).unwrap();
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = addTitle.trim();
    if (!title || !openDialog) {
      alert("Please enter a title.");
      return;
    }
    if (!editingItem && !selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting:", {
      title,
      type: openDialog,
      hasFile: !!selectedFile,
      isEdit: !!editingItem,
    });

    try {
      if (editingItem) {
        await updateContent({
          id: editingItem.id,
          title,
          file: selectedFile,
          moduleId,
          videoID: videoId,
        }).unwrap();
        setEditingItem(null);
      } else {
        await createContent({
          title,
          type: openDialog,
          file: selectedFile,
          moduleId,
          videoID: videoId,
        }).unwrap();
      }

      setAddTitle("");
      setSelectedFile(null);
      setOpenDialog(null);
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save. Please check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(null);
    setAddTitle("");
    setSelectedFile(null);
    setEditingItem(null);
  };

  const renderMediaList = (
    items: Video[] | PDF[],
    type: MediaType,
    renderMeta?: (item: Video | PDF) => string
  ) => {
    if (items.length === 0) {
      return <EmptyCard type={type} />;
    }

    return (
      <Card className="bg-white shadow-sm border border-neutral-200 rounded-lg">
        <CardContent className="p-8">
          <div className="flex items-center gap-2 mb-8">
            {type === "video" ? (
              <Play className="w-5 h-5 text-neutral-600" />
            ) : (
              <FileText className="w-5 h-5 text-neutral-600" />
            )}
            <h2 className="text-lg font-medium text-neutral-900">
              {type === "video" ? "Videos" : "PDFs"} ({items.length})
            </h2>
          </div>

          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors "
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer">
                    {type === "video" ? (
                      <Play className="w-5 h-5 text-neutral-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-neutral-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">{it.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {renderMeta ? renderMeta(it) : null}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(type, it.id)}
                    className="p-2 rounded-full h-auto text-neutral-400 hover:text-neutral-600"
                  >
                    <PiPencilFill className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(type, it.id)}
                    className="p-1 h-auto text-neutral-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const currentType = openDialog;
  let title = "";
  let inputId = "";
  let labelText = "";
  let placeholder = "";
  let uploadLabel = "";
  let accept = "";
  if (currentType) {
    title = currentType === "video" ? "Add Video" : "Add PDF";
    if (editingItem) {
      title = currentType === "video" ? "Edit Video" : "Edit PDF";
    }
    inputId = currentType === "video" ? "videoTitle" : "pdfTitle";
    labelText = currentType === "video" ? "Video Title" : "PDF Title";
    placeholder = `Enter your ${currentType} title`;
    uploadLabel = `Upload ${currentType === "video" ? "Video" : "PDF"}`;
    accept = currentType === "video" ? "video/*" : ".pdf";
  }

  return (
    <div className="min-h-screen px-10">
      <div className="mx-auto">
        {/* Navigation Tabs */}
        {/* Header */}
        <BackButtons backTitle="Modules" title={"Contents"} />

        <div className="flex items-center justify-between mb-12 mt-5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-neutral-900">
              {newModuleTitle || ""}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setOpenDialog("video")}
              className="bg-black hover:bg-neutral-800 text-white px-6  rounded-lg flex items-center gap-2 py-6"
            >
              <Plus className="w-4 h-4" />
              Add Video
            </Button>
            <Button
              onClick={() => setOpenDialog("pdf")}
              variant="outline"
              className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-6 py-6 rounded-lg flex items-center gap-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              Add PDF
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderMediaList(
            courseContent.videos,
            "video",
            (v: any) => v.duration || ""
          )}
          {renderMediaList(
            courseContent.pdfs,
            "pdf",
            (p: any) => `${p.size || ""} - ${p.pages || 0} Pages`
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      {currentType && (
        <Dialog open={!!openDialog} onOpenChange={handleDialogClose}>
          <form onSubmit={handleAddSubmit}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor={inputId}>{labelText}</Label>
                  <Input
                    id={inputId}
                    name={inputId}
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                    placeholder={placeholder}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="file">{uploadLabel}</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={accept}
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                    required={!editingItem}
                  />
                  {selectedFile && (
                    <p className="text-sm text-neutral-500">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                  {editingItem && !selectedFile && (
                    <p className="text-sm text-neutral-500">
                      No new file selected. Current file will remain unchanged.
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : editingItem ? "Update" : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </div>
  );
}
