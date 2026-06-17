import { supabase } from "@/lib/supabase";

import { NotificationItem } from "./types";

function formatRelativeTime(dateString: string): string {
  const now = new Date();

  const createdAt = new Date(dateString);

  const diffInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} jam lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 1) {
    return "Kemarin";
  }

  return `${diffInDays} hari lalu`;
}

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (
      data?.map((item) => ({
        id: item.id,

        title: item.title,

        message: item.message,

        type: item.type,

        category: item.category ?? "system",

        isRead: item.is_read ?? false,

        createdAt: formatRelativeTime(item.created_at),
      })) ?? []
    );
  },

  async getUnreadCount(): Promise<number> {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("is_read", false);

    if (error) {
      throw error;
    }

    return count ?? 0;
  },

  async markAllAsRead(): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("is_read", false);

    if (error) {
      throw error;
    }
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
  },
};
