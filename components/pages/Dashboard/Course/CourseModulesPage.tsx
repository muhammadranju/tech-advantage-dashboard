/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { VideoUploadComponent } from "@/components/discoverStrength/VideoUpload/VideoUploadComponent";
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
import { Label } from "@radix-ui/react-label";
import { FileText, Play, Plus, Save, Trash2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilFill } from "react-icons/pi";

interface Video {
  id: string;
  title: string;
  duration: string;
}

interface PDF {
  id: string;
  title: string;
  size: string;
  pages: number;
}

interface CourseContent {
  id: string;
  title: string;
  videos: Video[];
  pdfs: PDF[];
}

type MediaType = "video" | "pdf";

function IconForType({ type }: { type: MediaType }) {
  return type === "video" ? (
    <Play className="w-5 h-5 text-neutral-600" />
  ) : (
    <FileText className="w-5 h-5 text-neutral-600" />
  );
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

function MediaList<T extends { id: string }>(props: {
  items: T[];
  type: MediaType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  renderMeta?: (item: any) => React.ReactNode;
}) {
  const { items, type, onEdit, onDelete, renderMeta } = props;

  return (
    <Card className="bg-white shadow-sm border border-neutral-200 rounded-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <IconForType type={type} />
          <h2 className="text-lg font-medium text-neutral-900">
            {type === "video" ? "Videos" : "PDF"} ({items.length})
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((it: any) => (
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
                  onClick={() => onEdit(it.id)}
                  className="p-2 rounded-full h-auto text-neutral-400 hover:text-neutral-600"
                >
                  <PiPencilFill className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(it.id)}
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
}

function AddDialog({
  open,
  setOpen,
  type,
  onSave,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  type: MediaType;
  onSave: (payload: any) => void;
}) {
  const title = type === "video" ? "Add Video" : "Add PDF";
  const inputId = type === "video" ? "videoTitle" : "pdfTitle";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // minimal payload since original handlers just logged
          onSave({ title: (e.target as any)[inputId].value });
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor={inputId}>
                {type === "video" ? "Video Title" : "PDF Title"}
              </Label>
              <Input
                id={inputId}
                name={inputId}
                placeholder={`Enter your ${type} title`}
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="upload">
                Upload {type === "video" ? "Video" : "PDF"}
              </Label>
              <VideoUploadComponent />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <X />
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              <Save /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default function CourseContentPage() {
  const { moduleID } = useParams();
  const params = moduleID as string;
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState<MediaType | null>(null);

  const [courseContent, setCourseContent] = useState<CourseContent>({
    id: params,
    title: "Introduction to Programming",
    videos: [
      {
        id: "1",
        title: "Setting Up Your Development Environment",
        duration: "8:45",
      },
      { id: "2", title: "Intro to Variables", duration: "6:12" },
      { id: "3", title: "Control Flow Basics", duration: "10:00" },
    ],
    pdfs: [
      {
        id: "1",
        title: "Business Fundamentals Guide",
        size: "1.8 MB",
        pages: 2,
      },
      { id: "2", title: "API Design Checklist", size: "900 KB", pages: 12 },
      { id: "3", title: "Testing Guide", size: "2.1 MB", pages: 8 },
    ],
  });

  const handleEditTitle = () => {
    console.log("Edit course title");
  };

  const handleAdd = (type: MediaType, payload: any) => {
    setOpenDialog(null);
    if (type === "video") {
      setCourseContent((prev) => ({
        ...prev,
        videos: [
          ...prev.videos,
          {
            id: String(Date.now()),
            title: payload.title || "New Video",
            duration: "0:00",
          },
        ],
      }));
      console.log("Add video", payload);
    } else {
      setCourseContent((prev) => ({
        ...prev,
        pdfs: [
          ...prev.pdfs,
          {
            id: String(Date.now()),
            title: payload.title || "New PDF",
            size: "0 KB",
            pages: 0,
          },
        ],
      }));
      console.log("Add PDF", payload);
    }
  };

  const handleEdit = (type: MediaType, id: string) => {
    if (type === "video") console.log("Edit video:", id);
    else console.log("Edit PDF:", id);
  };

  const handleDelete = (type: MediaType, id: string) => {
    setCourseContent((prev) => ({
      ...prev,
      videos:
        type === "video" ? prev.videos.filter((v) => v.id !== id) : prev.videos,
      pdfs: type === "pdf" ? prev.pdfs.filter((p) => p.id !== id) : prev.pdfs,
    }));
  };

  return (
    <div className="min-h-screen px-10">
      <div className="mx-auto">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.back()}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Back to Modules
          </button>
          <button
            className={`pb-2 text-lg font-medium  border-b-2 border-black`}
          >
            {courseContent.title}
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-neutral-900">
              {courseContent.title}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditTitle}
              className="p-2 h-auto rounded-full text-neutral-400 hover:text-neutral-600 "
            >
              <PiPencilFill className="w-5 h-5" />
            </Button>
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
          <MediaList
            items={courseContent.videos}
            type="video"
            onEdit={(id) => handleEdit("video", id)}
            onDelete={(id) => handleDelete("video", id)}
            renderMeta={(v: Video) => v.duration}
          />

          <MediaList
            items={courseContent.pdfs}
            type="pdf"
            onEdit={(id) => handleEdit("pdf", id)}
            onDelete={(id) => handleDelete("pdf", id)}
            renderMeta={(p: PDF) => `${p.size} - ${p.pages} Pages`}
          />
        </div>

        {/* Empty states (kept as separate row similar to original) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-1">
          <EmptyCard type="video" />
          <EmptyCard type="pdf" />
        </div>
      </div>

      {/* Dialogs (one component handles both) */}
      <AddDialog
        open={openDialog === "video"}
        setOpen={(v) => (v ? setOpenDialog("video") : setOpenDialog(null))}
        type="video"
        onSave={(payload) => handleAdd("video", payload)}
      />

      <AddDialog
        open={openDialog === "pdf"}
        setOpen={(v) => (v ? setOpenDialog("pdf") : setOpenDialog(null))}
        type="pdf"
        onSave={(payload) => handleAdd("pdf", payload)}
      />
    </div>
  );
}
