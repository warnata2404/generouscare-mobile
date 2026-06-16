import { supabase } from "@/lib/supabase";

import { TrackerCategory, TrackerSummary } from "./types";

import { CATEGORIES } from "@/features/shared/categories";

export const trackerService = {
  async getSummary(): Promise<TrackerSummary> {
    const [donationsResult, expensesResult] = await Promise.all([
      supabase.from("donations").select("amount"),
      supabase.from("expenses").select("amount"),
    ]);

    if (donationsResult.error) {
      throw donationsResult.error;
    }

    if (expensesResult.error) {
      throw expensesResult.error;
    }

    const totalDonations = (donationsResult.data ?? []).reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const totalExpenses = (expensesResult.data ?? []).reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const remainingBalance = totalDonations - totalExpenses;

    const distributionPercentage =
      totalDonations > 0
        ? Math.round((totalExpenses / totalDonations) * 100)
        : 0;

    return {
      totalDonations,
      totalExpenses,
      remainingBalance,
      distributionPercentage,
    };
  },

  async getCategoryStatistics(): Promise<TrackerCategory[]> {
    const [donationsResult, expensesResult] = await Promise.all([
      supabase.from("donations").select("category, amount"),
      supabase.from("expenses").select("category, amount"),
    ]);

    if (donationsResult.error) {
      throw donationsResult.error;
    }

    if (expensesResult.error) {
      throw expensesResult.error;
    }

    return CATEGORIES.map((category) => {
      const donationAmount = (donationsResult.data ?? [])
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const expenseAmount = (expensesResult.data ?? [])
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const remainingAmount = donationAmount - expenseAmount;

      const percentage =
        donationAmount > 0
          ? Math.round((expenseAmount / donationAmount) * 100)
          : 0;

      return {
        category,
        donationAmount,
        expenseAmount,
        remainingAmount,
        percentage,
      };
    });
  },
};
