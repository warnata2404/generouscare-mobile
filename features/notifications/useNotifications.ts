import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { notificationService } from "./notification.service";

import { NotificationItem } from "./types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    try {
      const result = await notificationService.getNotifications();

      setNotifications(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();

    const channel = supabase.channel("notifications-realtime");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          loadNotifications();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadNotifications]);

  return {
    notifications,
    loading,
  };
}
