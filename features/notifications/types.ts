export interface NotificationItem {
  id: string;

  title: string;

  message: string;

  type: "info" | "success" | "warning";

  category: "donation" | "expense" | "system";

  isRead: boolean;

  createdAt: string;
}
