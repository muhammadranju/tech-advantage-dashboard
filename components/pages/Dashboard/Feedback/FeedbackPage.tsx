"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetFeedbackQuery } from "@/lib/redux/features/api/termsSliceApi/termsSliceApi";
import { Calendar, Search, MessageSquare } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { FeedbackListSkeleton } from "./FeedbackSkeleton";

// Define the correct TypeScript interface based on your real API
interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

interface FeedbackItem {
  _id: string;
  userId: User;
  category: string;
  comments: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { data: apiResponse, isLoading, error } = useGetFeedbackQuery({});

  // Safely extract feedbacks from API response
  const feedbacks: FeedbackItem[] = apiResponse?.data || [];

  // Search filter
  const filteredFeedbacks = feedbacks.filter((feedback) =>
    [
      feedback.userId?.name,
      feedback.userId?.email,
      feedback?.category,
      feedback?.comments,
    ].some((field) => field?.toLowerCase().includes(searchTerm?.toLowerCase()))
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFeedbackClick = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    setIsOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const paginationButtons = () => {
    const buttons: (number | string)[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) buttons.push(i);
    if (start > 1) {
      buttons.unshift(1);
      if (start > 2) buttons.splice(1, 0, "...");
    }
    if (end < totalPages) {
      if (end < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }
    return buttons;
  };

  // Helper to build full image URL (adjust base URL as per your backend)
  const getImageUrl = (path?: string) => {
    if (!path) return undefined;
    // Change this base URL according to your server
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}${
      path.startsWith("/") ? "" : "/"
    }${path}`;
  };

  if (isLoading) {
    <FeedbackListSkeleton />;
    // return (
    //   <div className="min-h-screen flex items-center justify-center">
    //     <p className="text-muted-foreground">Loading feedbacks...</p>
    //   </div>
    // );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Failed to load feedbacks.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MessageSquare className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">User Feedback</h1>
            <Badge variant="default" className="text-lg px-4">
              {filteredFeedbacks.length} Total
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search user, category, comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" mx-auto px-6 py-8">
        <div className="space-y-4">
          {isLoading && <FeedbackListSkeleton />}

          {!isLoading &&
            paginatedFeedbacks.map((feedback) => (
              <Card
                key={feedback?._id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                onClick={() => handleFeedbackClick(feedback)}
              >
                <div className="flex gap-6 items-start">
                  <Avatar className="w-16 h-16 ring-4 ring-background shadow-lg">
                    <AvatarImage src={getImageUrl(feedback?.userId?.image)} />
                    <AvatarFallback className="text-xl font-bold bg-primary/10">
                      {feedback?.userId?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {feedback?.userId?.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {feedback?.userId?.email}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-sm ">
                        {feedback?.category}
                      </Badge>
                    </div>

                    <p className="text-foreground leading-relaxed line-clamp-2">
                      {feedback?.comments}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {format(
                        new Date(feedback?.createdAt),
                        "dd MMMM yyyy 'at' h:mm a"
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
        {/* )} */}
      </main>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Feedback Details</DialogTitle>
          </DialogHeader>

          {selectedFeedback && (
            <div className="mt-6 space-y-8">
              <div className="flex gap-6 items-start">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={getImageUrl(selectedFeedback?.userId?.image)}
                  />
                  <AvatarFallback className="text-3xl">
                    {selectedFeedback?.userId?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold">
                    {selectedFeedback?.userId?.name}
                  </h2>
                  <p className="text-lg text-muted-foreground mt-1">
                    {selectedFeedback?.userId?.email}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <Badge variant="outline" className="text-sm px-4 py-2">
                      {selectedFeedback?.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {format(
                        new Date(selectedFeedback?.createdAt),
                        "EEEE, MMMM d, yyyy 'at' h:mm a"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-4">Full Comment</h3>
                <div className="bg-muted/50 rounded-lg p-6 text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedFeedback?.comments}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-8 gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredFeedbacks.length)} of{" "}
            {filteredFeedbacks.length} feedbacks
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {paginationButtons().map((page, i) => (
              <Button
                key={i}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
