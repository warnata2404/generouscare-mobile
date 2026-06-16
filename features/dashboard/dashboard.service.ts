import { supabase } from "@/lib/supabase";

import {
  ActivityItem,
  AgentRecommendation,
  DashboardStats,
  MonthlyChartData,
} from "./types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data: donations, error: donationError } = await supabase
      .from("donations")
      .select("amount");

    if (donationError) {
      throw donationError;
    }

    const { data: expenses, error: expenseError } = await supabase
      .from("expenses")
      .select("amount");

    if (expenseError) {
      throw expenseError;
    }

    const totalDonations =
      donations?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const totalExpenses =
      expenses?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    return {
      totalDonations,

      totalExpenses,

      remainingFunds: totalDonations - totalExpenses,

      donationCount: donations?.length ?? 0,

      expenseCount: expenses?.length ?? 0,
    };
  },

  async getMonthlyChartData(): Promise<MonthlyChartData> {
    const { data: donations, error: donationError } = await supabase
      .from("donations")
      .select("amount, created_at");

    if (donationError) {
      throw donationError;
    }

    const { data: expenses, error: expenseError } = await supabase
      .from("expenses")
      .select("amount, created_at");

    if (expenseError) {
      throw expenseError;
    }

    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const donationsPerMonth = Array(12).fill(0);

    const expensesPerMonth = Array(12).fill(0);

    donations?.forEach((item) => {
      const month = new Date(item.created_at).getMonth();

      donationsPerMonth[month] += Number(item.amount);
    });

    expenses?.forEach((item) => {
      const month = new Date(item.created_at).getMonth();

      expensesPerMonth[month] += Number(item.amount);
    });

    return {
      labels,

      donations: donationsPerMonth,

      expenses: expensesPerMonth,
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
    const { data: donations, error: donationError } = await supabase
      .from("donations")
      .select("id, amount, category, created_at");

    if (donationError) {
      throw donationError;
    }

    const { data: expenses, error: expenseError } = await supabase
      .from("expenses")
      .select("id, amount, category, created_at");

    if (expenseError) {
      throw expenseError;
    }

    const donationActivities =
      donations?.map((item) => ({
        id: `donation-${item.id}`,
        title: `Donasi ${item.category} - Rp ${Number(
          item.amount,
        ).toLocaleString("id-ID")}`,
        createdAt: item.created_at,
      })) ?? [];

    const expenseActivities =
      expenses?.map((item) => ({
        id: `expense-${item.id}`,
        title: `Pengeluaran ${item.category} - Rp ${Number(
          item.amount,
        ).toLocaleString("id-ID")}`,
        createdAt: item.created_at,
      })) ?? [];

    return [...donationActivities, ...expenseActivities]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5)
      .map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString("id-ID"),
      }));
  },
};
