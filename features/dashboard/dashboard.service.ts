import { supabase } from "@/lib/supabase";

import { ActivityItem, AgentRecommendation, DashboardStats } from "./types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data: donations } = await supabase
      .from("donations")
      .select("amount");

    const { data: expenses } = await supabase.from("expenses").select("amount");

    const totalDonations =
      donations?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const totalExpenses =
      expenses?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    return {
      totalDonations,
      totalExpenses,
      remainingFunds: totalDonations - totalExpenses,
    };
  },

  async getRecommendation(): Promise<AgentRecommendation> {
    const stats = await this.getStats();

    if (stats.remainingFunds > 5000000) {
      return {
        id: "1",
        title: "Rekomendasi Agent",
        description:
          "Dana tersedia cukup untuk membuka program bantuan pendidikan baru.",
      };
    }

    if (stats.remainingFunds < 1000000) {
      return {
        id: "2",
        title: "Peringatan Agent",
        description:
          "Dana tersisa mulai menipis. Disarankan meningkatkan kampanye donasi.",
      };
    }

    return {
      id: "3",
      title: "Status Dana Stabil",
      description: "Kondisi dana saat ini masih dalam batas aman.",
    };
  },

  async getActivities(): Promise<ActivityItem[]> {
    const { data } = await supabase
      .from("expenses")
      .select("id, description, created_at")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    return (
      data?.map((item) => ({
        id: item.id,
        title: item.description,
        createdAt: new Date(item.created_at).toLocaleDateString("id-ID"),
      })) ?? []
    );
  },
};
