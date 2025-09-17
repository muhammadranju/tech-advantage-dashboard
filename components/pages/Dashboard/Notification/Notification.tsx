"use client";
import { Search, User, X, FolderOpen, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NotificationItem {
  id: string;
  type: "success" | "error" | "suggestion" | "review" | "request";
  message: string;
  timestamp: string;
}

const notifications: NotificationItem[] = [
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
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <User className="h-5 w-5 text-blue-600" />;
    case "error":
      return <X className="h-5 w-5 text-red-500" />;
    case "suggestion":
      return <FolderOpen className="h-5 w-5 text-yellow-500" />;
    case "review":
      return <Check className="h-5 w-5 text-green-500" />;
    case "request":
      return <FolderOpen className="h-5 w-5 text-orange-500" />;
    default:
      return <User className="h-5 w-5 text-gray-500" />;
  }
};

const getNotificationBg = (type: string) => {
  switch (type) {
    case "success":
      return "bg-blue-50";
    case "error":
      return "bg-red-50";
    case "suggestion":
      return "bg-yellow-50";
    case "review":
      return "bg-green-50";
    case "request":
      return "bg-orange-50";
    default:
      return "bg-gray-50";
  }
};

const NotificationsPage = () => {
  return (
    <div className="px-6 mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between px-6">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-700 p-0"
        >
          Mark all as read
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-6 ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search here......"
            className="pl-10 bg-gray-50 py-6 rounded-md border-gray-200"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            // className={`p-6 flex items-start gap-4 border-b hover:bg-gray-50 transition-colors ${getNotificationBg(
            //   notification.type
            // )}`}
            className={`p-6 flex items-start gap-4 border-b hover:bg-gray-50 transition-colors `}
          >
            <div className="flex-shrink-0 mt-1">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 leading-relaxed">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {notification.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
