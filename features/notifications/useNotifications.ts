import { useCallback, useEffect, useMemo, useState } from "react";

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

  const markAsRead = async (id: string) => {
    await notificationService.markAsRead(id);

    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              isRead: true,
            }
          : item,
      ),
    );
  };

  const markAllAsRead = async () => {
    await notificationService.markAllAsRead();

    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        isRead: true,
      })),
    );
  };

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications],
  );

  useEffect(() => {
    loadNotifications();

    const channel = supabase.channel(`notifications-${Date.now()}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notifications",
      },
      () => {
        loadNotifications();
      },
    );

    channel.subscribe((status) => {
      console.log("NOTIFICATION CHANNEL STATUS:", status);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [loadNotifications]);

  return {
    notifications,
    loading,
    refresh: loadNotifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };
}
