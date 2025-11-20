/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // ← নতুন যোগ হয়েছে
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
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
import { toast } from "sonner";

export default function CourseContentPage() {
  const { modules, videoID } = useParams();
  const searchParams = useSearchParams();
  const moduleId = modules as string;
  const videoId = videoID as string;
  const moduleTitle = searchParams.get("module-title") || "Module";

  // States
  const [videos, setVideos] = useState<any[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<
    "add-video" | "add-pdf" | "edit"
  >("add-video");
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Delete confirmation state
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // API Hooks
  const { data: contentData } = useGetContentsQuery({
    moduleId,
    videoID: videoId,
  });
  const [createContent] = useCreateContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const [deleteContent] = useDeleteContentMutation();

  // Load data
  useEffect(() => {
    if (contentData?.data) {
      const all = contentData.data;
      setVideos(all.filter((item: any) => item.type === "video"));
      setPdfs(all.filter((item: any) => item.type === "pdf"));
    }
  }, [contentData]);

  // Open dialogs
  const openAddVideo = () => {
    setDialogMode("add-video");
    setTitle("");
    setFile(null);
    setEditId(null);
    setIsDialogOpen(true);
  };

  const openAddPdf = () => {
    setDialogMode("add-pdf");
    setTitle("");
    setFile(null);
    setEditId(null);
    setIsDialogOpen(true);
  };

  const openEdit = (id: string, currentTitle: string) => {
    setDialogMode("edit");
    setEditId(id);
    setTitle(currentTitle);
    setFile(null);
    setIsDialogOpen(true);
  };

  // Delete with AlertDialog
  const openDeleteConfirm = (id: string) => {
    setItemToDelete(id);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteContent({
        id: itemToDelete,
        moduleId,
        videoID: videoId,
      }).unwrap();
      setItemToDelete(null);
      toast.success("Content deleted successfully!");
    }
    setDeleteAlertOpen(false);
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");
    if (dialogMode !== "edit" && !file) return alert("Please select a file!");

    try {
      if (dialogMode === "edit" && editId) {
        await updateContent({
          id: editId,
          title,
          moduleId,
          videoID: videoId,
        }).unwrap();
        toast.success("Content updated successfully!");
      } else {
        const type = dialogMode === "add-video" ? "video" : "pdf";
        await createContent({
          title,
          type,
          file,
          moduleId,
          videoID: videoId,
        }).unwrap();
        toast.success("Content added successfully!");
      }
      setIsDialogOpen(false);
      setTitle("");
      setFile(null);
      setEditId(null);
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen px-10 py-8">
        <BackButtons backTitle="Modules" title="Contents" />

        <div className="mt-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{moduleTitle}</h1>
            <div className="flex gap-4">
              <Button onClick={openAddVideo} className="bg-black text-white">
                <Plus className="w-4 h-4 mr-2" /> Add Video
              </Button>
              <Button onClick={openAddPdf} variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add PDF
              </Button>
            </div>
          </div>

          <div className="flex justify-between gap-5">
            {/* Videos Section */}
            <div className="mb-12 flex-1">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5" /> Videos ({videos.length})
              </h2>

              {videos.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>No videos added yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {videos.map((video) => (
                    <div
                      key={video._id}
                      className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6" />
                        </div>
                        <h3 className="font-medium">{video.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(video._id, video.title)}
                        >
                          <PiPencilFill className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteConfirm(video._id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PDFs Section */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> PDFs ({pdfs.length})
              </h2>

              {pdfs.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>No PDFs added yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pdfs.map((pdf) => (
                    <div
                      key={pdf._id}
                      className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="font-medium">{pdf.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(pdf._id, pdf.title)}
                        >
                          <PiPencilFill className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteConfirm(pdf._id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dialogMode === "edit"
                  ? "Edit Title"
                  : dialogMode === "add-video"
                  ? "Add New Video"
                  : "Add New PDF"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                </div>

                {dialogMode !== "edit" && (
                  <div>
                    <Label>
                      Upload {dialogMode === "add-video" ? "Video" : "PDF"}
                    </Label>
                    <Input
                      type="file"
                      accept={dialogMode === "add-video" ? "video/*" : ".pdf"}
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                    />
                    {file && (
                      <p className="text-sm text-gray-500 mt-1">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {dialogMode === "edit" ? "Update" : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation AlertDialog */}
        <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Yes, delete it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
