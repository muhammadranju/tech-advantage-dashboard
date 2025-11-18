"use client";
import Pagination from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, FolderOpen, Search, Send, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NotificationItem } from "./notification.interface";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton";
import { NotificationEmpty } from "./NotificationEmpty";

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "success",
    message:
      'User "john@example.com" has successfully upgraded from Free to Pro.',
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "error",
    message:
      'User "sadia.user42@gmail.com" attempted to upgrade to Pro but encountered an issue',
    timestamp: "10 mins ago",
  },
  {
    id: "3",
    type: "suggestion",
    message:
      'User "rahim.khan12" submitted a new suggestion: "Please add a savings goal tracker."',
    timestamp: "30 min ago",
  },
  {
    id: "4",
    type: "review",
    message:
      'User "tasnia_98" left a 5-star review on the Play Store: "Very useful app. Helped me track my expenses easily!"',
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    type: "request",
    message: 'User "robin_dev23" has submitted a request to review the app.',
    timestamp: "Yesterday",
  },
  {
    id: "6",
    type: "review",
    message: 'User "robin_dev23" has submitted a request to review the app.',
    timestamp: "Yesterday",
  },
];

// DRY: map type to icon and background
const typeConfig = {
  success: {
    icon: <User className="h-5 w-5 text-blue-600" />,
    bg: "bg-blue-50",
  },
  error: { icon: <X className="h-5 w-5 text-red-500" />, bg: "bg-red-50" },
  suggestion: {
    icon: <FolderOpen className="h-5 w-5 text-yellow-500" />,
    bg: "bg-yellow-50",
  },
  review: {
    icon: <Check className="h-5 w-5 text-green-500" />,
    bg: "bg-green-50",
  },
  request: {
    icon: <FolderOpen className="h-5 w-5 text-orange-500" />,
    bg: "bg-orange-50",
  },
  default: {
    icon: <User className="h-5 w-5 text-gray-500" />,
    bg: "bg-gray-50",
  },
};

const NotificationRow = ({
  notification,
}: {
  notification: NotificationItem;
}) => {
  const config = typeConfig[notification.type] || typeConfig.default;
  return (
    <div
      className={`p-6 flex items-start gap-4 border-b hover:bg-gray-50 transition-colors ${config.bg}`}
    >
      <div className="flex-shrink-0 mt-1">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 leading-relaxed">
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
      </div>
    </div>
  );
};

const NotificationDialog = ({
  open,
  setOpen,
  title,
  setTitle,
  body,
  setBody,
  handleSubmit,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  setTitle: (val: string) => void;
  body: string;
  setBody: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <form onSubmit={handleSubmit}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Send Custom Notification</DialogTitle>
          <DialogDescription>
            <p className="text-sm text-gray-500">
              Enter the title and body of your notification.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              placeholder="Enter your notification title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              name="body"
              value={body}
              placeholder="Enter your notification body"
              onChange={(e) => setBody(e.target.value)}
              rows={8}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              <X /> Cancel
            </Button>
          </DialogClose>
          <Button variant="default" type="submit">
            <Send /> Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
);

const NotificationsPage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Please enter both title and body.");
      return;
    }

    // Simulate API call delay
    setIsLoading(true);
    setTimeout(() => {
      const newNotification: NotificationItem = {
        id: Date.now().toString(),
        type: "success",
        message: title, // Use title as message for simplicity
        timestamp: "Just now",
      };
      setNotifications((prev) => [newNotification, ...prev]);
      toast.success("Notification sent successfully!");
      setTitle("");
      setBody("");
      setOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const itemsPerPage = 5;
  const filteredNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate initial data fetch
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="px-10 mt-5 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold ">Notifications</h1>
          <Button
            onClick={() => setOpen(true)}
            variant="default"
            className="py-6"
          >
            <Send /> Send Notification
          </Button>
        </div>

        {/* Search Bar */}
        <div className=" my-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search here......"
              className="pl-10  py-6 border-gray-200"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Notifications List */}
        <div>
          {isLoading && <NotificationSkeleton />}

          {!isLoading && paginatedNotifications.length === 0 && (
            <NotificationEmpty />
          )}

          {!isLoading &&
            paginatedNotifications.map((n) => (
              <NotificationRow key={n.id} notification={n} />
            ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Notification Dialog */}
        <NotificationDialog
          open={open}
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default NotificationsPage;
