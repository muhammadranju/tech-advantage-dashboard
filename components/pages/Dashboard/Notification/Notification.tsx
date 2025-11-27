"use client";
import Pagination from "@/components/pagination/Pagination";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetNotificationsQuery,
  useSendNotificationMutation,
} from "@/lib/redux/features/api/notification/notificationApiSlice";
import { Bell, RotateCcw, Search, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NotificationEmpty } from "./NotificationEmpty";

// Utility: Format timestamp to relative time
const formatRelativeTime = (dateString: string): string => {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return new Date(dateString).toLocaleDateString();
};

// Updated Notification Item Interface
interface RealNotification {
  _id: string;
  title: string;
  description: string;
  sentAt: string;
  read: boolean;
  fcmToken?: string;
  groupId?: string;
}

const NotificationRow = ({
  notification,
}: {
  notification: RealNotification;
}) => {
  const isRead = notification.read;

  return (
    <div
      className={`p-6 flex items-start gap-4 border-b hover:bg-gray-50 transition-colors ${
        isRead ? "bg-white" : "bg-blue-50"
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            isRead ? "text-gray-600" : "text-gray-900"
          }`}
        >
          {notification.title}
        </p>
        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          {formatRelativeTime(notification.sentAt)}
        </p>
      </div>
      {!isRead && (
        <div className="w-2 h-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
      )}
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
  isLoading,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  setTitle: (val: string) => void;
  body: string;
  setBody: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle>Send Custom Notification</DialogTitle>
        <DialogDescription>
          Send a notification to all users or specific devices.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            placeholder="e.g. New Article Available"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="body">Body Message</Label>
          <Textarea
            id="body"
            value={body}
            placeholder="Write the notification message here..."
            onChange={(e) => setBody(e.target.value)}
            rows={8}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </DialogClose>
        <Button onClick={handleSubmit} disabled={isLoading || !title || !body}>
          {isLoading ? (
            <>
              <Spinner className="mr-2" /> Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Send Notification
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const NotificationsPage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading: isLoadingNotifications,
    refetch,
  } = useGetNotificationsQuery({});
  const [sendNotification, { isLoading: isSending }] =
    useSendNotificationMutation();

  // Use real data from API
  const notifications: RealNotification[] = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required");
      return;
    }

    try {
      await sendNotification({
        body: {
          title,
          description: body,
        },
      }).unwrap();

      toast.success("Notification sent successfully!");
      setTitle("");
      setBody("");
      setOpen(false);
      refetch(); // Refresh list
    } catch (err) {
      toast.error("Failed to send notification");
      console.error(err);
    }
  };

  // Search & Filter
  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginated = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handelRefresh = async () => {
    setIsLoading(true);
    try {
      // Wait for the query refetch to complete
      await refetch();
      toast.success("Notifications refreshed");
    } catch (err) {
      console.error("Refresh failed", err);
      toast.error("Failed to refresh notifications");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 mt-5 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button
          size={"sm"}
          onClick={handelRefresh}
          disabled={isSending || isLoading || isLoadingNotifications}
        >
          {isLoading || isLoadingNotifications ? (
            <>
              <Spinner className="h-5 w-5" /> Loading...
            </>
          ) : (
            <>
              <RotateCcw className="h-5 w-5" /> Refresh
            </>
          )}
        </Button>
        {/* <h1 className="text-lg font-bold">Refresh</h1> */}
      </div>

      <div className="flex justify-between">
        {/* Search */}
        <div className="relative max-w-3xl mb-6 flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search notifications..."
            className="pl-10 py-6 "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Button onClick={() => setOpen(true)} size="lg" className="py-6">
          <Send className="mr-2 h-5 w-5" /> Send Notification
        </Button>
      </div>
      {/* List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {isLoadingNotifications ? (
          <NotificationSkeleton />
        ) : paginated.length === 0 ? (
          <NotificationEmpty />
        ) : (
          paginated.map((notif) => (
            <NotificationRow key={notif._id} notification={notif} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Send Dialog */}
      <NotificationDialog
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        handleSubmit={handleSubmit}
        isLoading={isSending}
      />
    </div>
  );
};

export default NotificationsPage;
