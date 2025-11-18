"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, Search, User } from "lucide-react";
import { useState } from "react";

interface Feedback {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
  date: string;
  time: string;
  rating: number;
  comment: string;
  user: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    title: "Adventure Gear Show",
    category: "Outdoor & Adventure",
    description:
      "Top outdoor brands showcase the latest gear. Discounts, demos, and expert consultations.",
    image: "/adventure-outdoor-gear-show.jpg",
    location: "Rocky Ridge Hall, Denver, CO",
    date: "June 5, 2029",
    time: "3:00 PM",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae accusantium expedita perspiciatis placeat nostrum dignissimos ut amet ipsa tenetur voluptatum non veritatis blanditiis magnam reiciendis minus, eius dolor repudiandae recusandae, porro ipsam esse dolorum assumenda neque voluptates! Quae architecto magni aperiam alias ipsum inventore assumenda quo placeat illo hic asperiores fugiat sequi, totam molestias tempora facere ad a unde eveniet delectus veniam. Eligendi minima aliquam dolore laboriosam animi vero, numquam necessitatibus tenetur atque ut nobis esse, quae modi molestiae qui. Excepturi laboriosam similique debitis sunt odio, alias minus commodi voluptas autem est voluptatibus dolorum labore, nam dignissimos ipsam modi dolorem..",
    user: "John Doe",
  },
  {
    id: 2,
    title: "Culinary Delights Festival",
    category: "Food & Culinary",
    description:
      "Embark on a culinary adventure! Sample delicious dishes, watch chef demos, and savor diverse cuisine.",
    image: "/culinary-food-festival.jpg",
    location: "The Plaza, San Francisco, CA",
    date: "May 25, 2029",
    time: "11:00 AM",
    rating: 4.8,
    comment:
      "Food heaven! The variety of cuisines was incredible, and the chef interactions made it special.",
    user: "Jane Smith",
  },
  {
    id: 3,
    title: "Echo Beats Festival",
    category: "Music",
    description:
      "Dance the night away to top DJs and live electronic music. An unforgettable festival experience.",
    image: "/music-electronic-beats-festival.jpg",
    location: "Sunset Park, Los Angeles, CA",
    date: "May 20, 2029",
    time: "6:00 PM",
    rating: 4.2,
    comment:
      "Great vibes and lineup, though the sound could be better in some areas. Still, epic night!",
    user: "Alex Johnson",
  },
  {
    id: 4,
    title: "Runway Revolution 2029",
    category: "Fashion",
    description:
      "Celebrate emerging talent at Runway Revolution 2029. Discover the next generation of fashion icons.",
    image: "/fashion-runway-show.jpg",
    location: "Vogue Hall, New York, NY",
    date: "May 1, 2029",
    time: "8:00 PM",
    rating: 4.9,
    comment:
      "Inspiring designs from up-and-coming talents. The atmosphere was electric and glamorous.",
    user: "Emily Davis",
  },
  {
    id: 5,
    title: "Artistry Unveiled Expo",
    category: "Art & Design",
    description:
      "Explore diverse art and design forms. Connect with global artists and discover creative inspiration.",
    image: "/art-design-exhibition.jpg",
    location: "Modern Art Gallery, Chicago, IL",
    date: "May 15, 2029",
    time: "10:00 AM",
    rating: 4.6,
    comment:
      "A true feast for the eyes. Interacting with artists added depth to the experience.",
    user: "Michael Brown",
  },
  {
    id: 6,
    title: "Tech Future Expo",
    category: "Technology",
    description:
      "Explore the latest tech innovations here. Discover trends and solutions shaping tomorrow.",
    image: "/technology-future-expo.jpg",
    location: "Silicon Valley, San Jose, CA",
    date: "Jun 1, 2029",
    time: "10:00 AM",
    rating: 4.3,
    comment:
      "Cutting-edge tech on display. Some sessions were mind-blowing, others a bit overhyped.",
    user: "Sarah Wilson",
  },
];

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFeedbackClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }

    if (start > 1) {
      buttons.unshift("...");
      buttons.unshift(1);
    }
    if (end < totalPages) {
      buttons.push("...");
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between gap-4">
          {/* Left tabs */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab("active")}
              variant={activeTab === "active" ? "default" : "ghost"}
              className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Total Feedback ({filteredFeedbacks.length})
            </Button>
          </div>

          {/* Search and filters */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="relative hidden md:flex">
              <Input
                type="text"
                placeholder="Search feedback, event, user, etc"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-4 pr-10 border-border"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 md:px-8">
        <div className="space-y-4">
          {paginatedFeedbacks.map((feedback) => (
            <Card
              key={feedback.id}
              onClick={() => handleFeedbackClick(feedback)}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex gap-4 items-start">
                {/* Feedback Info */}
                <div className="flex-1 min-w-0">
                  <Badge
                    variant="secondary"
                    className="mb-2 bg-muted text-foreground"
                  >
                    {feedback.category}
                  </Badge>

                  {/* Date */}
                  <div className="flex gap-4 text-sm text-muted-foreground flex-wrap mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {feedback.date} - {feedback.time}
                      </span>
                    </div>
                  </div>

                  {/* Truncated Comment */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {feedback.comment.length > 150
                      ? feedback.comment.substring(0, 150) + "..."
                      : feedback.comment}
                  </p>
                </div>

                {/* User */}
                <div className="flex-shrink-0 text-center space-y-2">
                  <User className="w-5 h-5 text-primary mx-auto" />
                  <div className="text-lg font-semibold text-foreground">
                    {feedback.user}
                  </div>
                  <p className="text-xs text-muted-foreground">Reviewer</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
          {selectedFeedback && (
            <div className="p-6 space-y-6">
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {selectedFeedback.category}
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {selectedFeedback.date} at {selectedFeedback.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Reviewer */}
                  <div>
                    <h4 className="font-semibold mb-1">Reviewer</h4>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {selectedFeedback.user}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Comment */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Feedback Comment</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFeedback.comment}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="px-4 py-8 md:px-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold">
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredFeedbacks.length
            )}
            -{Math.min(currentPage * itemsPerPage, filteredFeedbacks.length)}
          </span>{" "}
          out of{" "}
          <span className="font-semibold">{filteredFeedbacks.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </Button>
          {paginationButtons().map((page, idx) => (
            <Button
              key={idx}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className={
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "border-border"
              }
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="border-border"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
}
