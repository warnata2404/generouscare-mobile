import { supabase } from "@/lib/supabase";

import { AGENT_RULES } from "./rules";

export const agentService = {
  async evaluate() {
    const { data: donations } = await supabase
      .from("donations")
      .select("amount");

    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount, category");

    const totalDonations =
      donations?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const totalExpenses =
      expenses?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const remainingFunds = totalDonations - totalExpenses;

    if (remainingFunds < AGENT_RULES.LOW_FUNDS) {
      await this.createNotification(
        "Peringatan Dana Menipis",
        "Dana tersisa berada di bawah batas aman.",
        "warning",
      );
    }

    if (remainingFunds > AGENT_RULES.HIGH_FUNDS) {
      await this.createNotification(
        "Dana Siap Disalurkan",
        "Dana cukup untuk membuka program bantuan baru.",
        "success",
      );
    }

    const educationExpense =
      expenses
        ?.filter((item) => item.category === "Pendidikan")
        .reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const educationPercentage =
      totalExpenses > 0
        ? Math.round((educationExpense / totalExpenses) * 100)
        : 0;

    if (educationPercentage > AGENT_RULES.EDUCATION_PERCENTAGE) {
      await this.createNotification(
        "Fokus Pendidikan",
        "Sebagian besar dana digunakan untuk pendidikan.",
        "info",
      );
    }
  },

  async createNotification(title: string, message: string, type: string) {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      console.log("Agent: User tidak ditemukan");

      return;
    }

    const { data: existing } = await supabase
      .from("notifications")
      .select("id")
      .eq("user_id", userData.user.id)
      .eq("title", title)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log("Agent: Notifikasi sudah ada");

      return;
    }

    const { error } = await supabase.from("notifications").insert({
      user_id: userData.user.id,

      title,

      message,

      type,

      is_read: false,
    });

    if (error) {
      console.log("Agent Notification Error:", error);
    } else {
      console.log("Agent Notification Created:", title);
    }
  },
};
