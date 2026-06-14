export interface NotificationItem {
  id: string;

  title: string;

  message: string;

  type: "info" | "success" | "warning";

  createdAt: string;
}
