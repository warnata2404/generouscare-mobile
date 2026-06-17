import { supabase } from "@/lib/supabase";

interface NotificationPayload {
  title: string;

  message: string;

  type: "info" | "success" | "warning";

  category?: string;
}

export const notificationGeneratorService = {
  async createIfNotExists(payload: NotificationPayload) {
    try {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        return;
      }

      const { data: existing, error: existingError } = await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", authData.user.id)
        .eq("title", payload.title)
        .eq("message", payload.message)
        .order("created_at", {
          ascending: false,
        })
        .limit(1);

      if (existingError) {
        throw existingError;
      }

      if (existing && existing.length > 0) {
        return;
      }

      const { error: insertError } = await supabase
        .from("notifications")
        .insert({
          user_id: authData.user.id,
          title: payload.title,
          message: payload.message,
          type: payload.type,
          category: payload.category ?? "system",
          is_read: false,
        });

      if (insertError) {
        throw insertError;
      }
    } catch (error) {
      console.error("CREATE NOTIFICATION ERROR:", error);
    }
  },

  async generateFromInsights(
    insights: {
      title: string;
      message: string;
      type: "info" | "success" | "warning";
    }[],
  ) {
    try {
      if (!insights.length) {
        return;
      }

      for (const insight of insights) {
        await this.createIfNotExists({
          title: insight.title,
          message: insight.message,
          type: insight.type,
          category: "system",
        });
      }
    } catch (error) {
      console.error("GENERATE INSIGHT NOTIFICATION ERROR:", error);
    }
  },

  async createDonationNotification(title: string, message: string) {
    await this.createIfNotExists({
      title,
      message,
      type: "success",
      category: "donation",
    });
  },

  async createExpenseNotification(title: string, message: string) {
    await this.createIfNotExists({
      title,
      message,
      type: "warning",
      category: "expense",
    });
  },

  async createSystemNotification(
    title: string,
    message: string,
    type: "info" | "success" | "warning" = "info",
  ) {
    await this.createIfNotExists({
      title,
      message,
      type,
      category: "system",
    });
  },
};
