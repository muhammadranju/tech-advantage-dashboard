export interface NotificationItem {
  id: string;
  type: "success" | "error" | "suggestion" | "review" | "request";
  message: string;
  timestamp: string;
}