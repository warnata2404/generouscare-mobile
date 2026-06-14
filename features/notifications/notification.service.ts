import { supabase } from "@/lib/supabase";

import { NotificationItem } from "./types";

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    return (
      data?.map((item) => ({
        id: item.id,

        title: item.title,

        message: item.message,

        type: item.type,

        createdAt: new Date(item.created_at).toLocaleDateString("id-ID"),
      })) ?? []
    );
  },
};
