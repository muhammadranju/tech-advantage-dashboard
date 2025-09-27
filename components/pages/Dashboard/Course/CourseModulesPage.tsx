"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, FileText, Play, Plus, Trash2 } from "lucide-react";
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

export default function CourseContentPage() {
  const { moduleID } = useParams();
  const params = moduleID as string;
  const router = useRouter();

  const [courseContent, setCourseContent] = useState<CourseContent>({
    id: params,
    title: "Introduction to Programming",
    videos: [
      {
        id: "1",
        title: "Setting Up Your Development Environment",
        duration: "8:45",
      },
      {
        id: "2",
        title: "Setting Up Your Development Environment",
        duration: "8:45",
      },
      {
        id: "3",
        title: "Setting Up Your Development Environment",
        duration: "8:45",
      },
    ],
    pdfs: [
      {
        id: "1",
        title: "Business Fundamentals Guide",
        size: "1.8 MB",
        pages: 2,
      },
      {
        id: "2",
        title: "Business Fundamentals Guide",
        size: "1.8 MB",
        pages: 2,
      },
      {
        id: "3",
        title: "Business Fundamentals Guide",
        size: "1.8 MB",
        pages: 2,
      },
    ],
  });

  const handleEditTitle = () => {
    console.log("Edit course title");
  };

  const handleAddVideo = () => {
    console.log("Add video");
  };

  const handleAddPDF = () => {
    console.log("Add PDF");
  };

  const handleEditVideo = (videoId: string) => {
    console.log("Edit video:", videoId);
  };

  const handleDeleteVideo = (videoId: string) => {
    setCourseContent((prev) => ({
      ...prev,
      videos: prev.videos.filter((video) => video.id !== videoId),
    }));
  };

  const handleEditPDF = (pdfId: string) => {
    console.log("Edit PDF:", pdfId);
  };

  const handleDeletePDF = (pdfId: string) => {
    setCourseContent((prev) => ({
      ...prev,
      pdfs: prev.pdfs.filter((pdf) => pdf.id !== pdfId),
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
              className="p-1 h-auto text-neutral-400 hover:text-neutral-600 "
            >
              <Edit className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddVideo}
              className="bg-black hover:bg-neutral-800 text-white px-6  rounded-lg flex items-center gap-2 py-6"
            >
              <Plus className="w-4 h-4" />
              Add Video
            </Button>
            <Button
              onClick={handleAddPDF}
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
          {/* Videos Section */}
          <Card className="bg-white shadow-sm border border-neutral-200 rounded-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-8">
                <Play className="w-5 h-5 text-neutral-600" />
                <h2 className="text-lg font-medium text-neutral-900">
                  Videos ({courseContent.videos.length})
                </h2>
              </div>

              <div className="space-y-4">
                {courseContent.videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors "
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer">
                        <Play className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {video.title}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {video.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditVideo(video.id)}
                        className="p-1 h-auto text-neutral-400 hover:text-neutral-600"
                      >
                        <PiPencilFill className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVideo(video.id)}
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

          {/* PDFs Section */}
          <Card className="bg-white shadow-sm border border-neutral-200 rounded-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-8">
                <FileText className="w-5 h-5 text-neutral-600" />
                <h2 className="text-lg font-medium text-neutral-900">
                  PDF ({courseContent.pdfs.length})
                </h2>
              </div>

              <div className="space-y-4">
                {courseContent.pdfs.map((pdf) => (
                  <div
                    key={pdf.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {pdf.title}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {pdf.size} - {pdf.pages} Pages
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPDF(pdf.id)}
                        className="p-1 h-auto text-neutral-400 hover:text-neutral-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePDF(pdf.id)}
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
        </div>

        {/* Content Sections2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-1">
          {/* Videos Section */}
          <Card className="border-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-8">
                <Play className="w-5 h-5 " />
                <h2 className="text-lg font-medium ">Videos (0)</h2>
              </div>

              <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <div className="w-20 h-20  rounded-full flex items-center justify-center mb-6">
                  <Play className="w-20 h-20 " />
                </div>
                <p className=" text-center mb-2">No videos added yet</p>
                <p className=" text-sm text-center">
                  Click &quot;Add Video&quot; to get started
                </p>
              </div>
            </CardContent>
          </Card>

          {/* PDFs Section */}
          <Card className="border-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-8">
                <FileText className="w-5 h-5 " />
                <h2 className="text-lg font-medium ">PDF (0)</h2>
              </div>

              <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <div className="w-20 h-20  rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-20 h-20 " />
                </div>
                <p className=" text-center mb-2">No PDFs added yet</p>
                <p className=" text-sm text-center">
                  Click &quot;Add PDF&quot; to get started
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
