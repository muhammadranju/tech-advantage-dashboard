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
import axios from "axios";
import { useAppSelector } from "@/lib/redux/hooks";

export default function CourseContentPage() {
  const { modules, videoID } = useParams();
  const searchParams = useSearchParams();
  const moduleId = modules as string;
  const videoId = videoID as string;
  const moduleTitle = searchParams.get("module-title") || "Module";

  // States
  const [videos, setVideos] = useState<any[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([]);
  
  // Video Dialog State
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  
  // PDF/Edit Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add-pdf" | "edit">("add-pdf");
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Delete confirmation state
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // API Hooks
  const { data: contentData, refetch } = useGetContentsQuery({
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
    setTitle("");
    setFile(null);
    setEditId(null);
    setIsVideoDialogOpen(true);
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

  // Submit Form (PDF & Edit)
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
        await createContent({
          title,
          type: "pdf",
          file,
          moduleId,
          videoID: videoId,
        }).unwrap();
        toast.success("PDF added successfully!");
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

  // Submit Video Form (Axios)
  const token = useAppSelector((state) => state.auth.token);
  
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required!");
    if (!file) return toast.error("Please select a video file!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", "video");
    formData.append("media", file);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bootcamp/courses/${moduleId}/modules/${videoID}/videos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Content-Type is set automatically by axios/browser for FormData
          },
        }
      );
      
      toast.success("Video added successfully!");
      setIsVideoDialogOpen(false);
      setTitle("");
      setFile(null);
      refetch(); // Refresh the list
    } catch (err) {
      toast.error("Failed to upload video!");
      console.error(err);
    }
  };

  return (
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
                    •
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog - PDF & Edit Only */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {dialogMode === "edit" ? (
                <>Edit Content Title</>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-red-600" />
                  <span>Add New PDF</span>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-base font-medium flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-black rounded-full" />
                Content Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title..."
                className="text-base h-12 border-2 focus:border-black transition-all"
                required
              />
            </div>

            {/* File Upload - Only for Add Mode */}
            {dialogMode !== "edit" && (
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full" />
                  Upload PDF Document
                </Label>

                <div className="relative">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${
                  file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText
                        className={`w-16 h-16 mb-4 ${
                          file ? "text-green-600" : "text-gray-400"
                        }`}
                      />

                      {file ? (
                        <>
                          <p className="mb-2 text-sm text-green-700 font-medium">
                            <span className="font-semibold">{file.name}</span>
                          </p>
                          <p className="text-xs text-green-600">
                            File selected ✓
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="mb-2 text-sm text-gray-600">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF files only
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" /> Remove file
                  </Button>
                )}
              </div>
            )}

            {/* Edit Mode Info */}
            {dialogMode === "edit" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 flex items-center gap-2">
                  <span className="text-lg">ℹ️</span>
                  Only the title will be updated. The file remains unchanged.
                </p>
              </div>
            )}

            <DialogFooter className="flex gap-3 sm:justify-center">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setIsDialogOpen(false)}
                className="px-8"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="px-10 bg-black hover:bg-gray-800"
              >
                <Save className="w-5 h-5 mr-2" />
                {dialogMode === "edit" ? "Update Title" : "Upload & Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Upload Dialog - Axios */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              <div className="flex items-center justify-center gap-3">
                <Play className="w-8 h-8 text-blue-600" />
                <span>Add New Video</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleVideoSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label
                htmlFor="video-title"
                className="text-base font-medium flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-black rounded-full" />
                Video Title
              </Label>
              <Input
                id="video-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title..."
                className="text-base h-12 border-2 focus:border-black transition-all"
                required
              />
            </div>

            {/* Video File Upload */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                Upload Video File
              </Label>

              <div className="relative">
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
                <label
                  htmlFor="video-upload"
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all
              ${
                file
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }
            `}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Play
                      className={`w-16 h-16 mb-4 ${
                        file ? "text-green-600" : "text-gray-400"
                      }`}
                    />

                    {file ? (
                      <>
                        <p className="mb-2 text-sm text-green-700 font-medium">
                          <span className="font-semibold">{file.name}</span>
                        </p>
                        <p className="text-xs text-green-600">
                          File selected ✓
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-sm text-gray-600">
                          <span className="font-semibold">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          MP4, AVI, MOV up to 500MB
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" /> Remove file
                </Button>
              )}
            </div>

            <DialogFooter className="flex gap-3 sm:justify-center">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setIsVideoDialogOpen(false)}
                className="px-8"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="px-10 bg-black hover:bg-gray-800"
              >
                <Save className="w-5 h-5 mr-2" />
                Upload Video
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
  );
}
