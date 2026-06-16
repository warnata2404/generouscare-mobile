import { supabase } from "@/lib/supabase";

import { AGENT_RULES } from "./rules";
import { AgentInsight } from "./types";

export const agentService = {
  async evaluate(): Promise<AgentInsight[]> {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      return [];
    }

    const insights: AgentInsight[] = [];

    const { data: donations } = await supabase
      .from("donations")
      .select("amount, category");

    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount, category");

    const totalDonations =
      donations?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const totalExpenses =
      expenses?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const remainingFunds = totalDonations - totalExpenses;

    if (remainingFunds < AGENT_RULES.LOW_FUNDS) {
      insights.push({
        title: "Peringatan Dana Menipis",
        message: "Dana tersisa berada di bawah batas aman.",
        type: "warning",
      });
    }

    if (remainingFunds > AGENT_RULES.HEALTHY_FUNDS) {
      insights.push({
        title: "Kondisi Dana Sehat",
        message: "Saldo dana berada pada kondisi aman dan siap disalurkan.",
        type: "success",
      });
    }

    const categories = [
      "Pendidikan",
      "Kesehatan",
      "Bencana Alam",
      "Kemanusiaan",
    ];

    const donationByCategory = categories.map((category) => {
      const total =
        donations
          ?.filter((item) => item.category === category)
          .reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

      return {
        category,
        total,
      };
    });

    const highestDonationCategory = [...donationByCategory].sort(
      (a, b) => b.total - a.total,
    )[0];

    if (highestDonationCategory && highestDonationCategory.total > 0) {
      insights.push({
        title: "Kategori Donasi Terbesar",
        message: `${highestDonationCategory.category} menerima donasi terbesar sebesar Rp${highestDonationCategory.total.toLocaleString(
          "id-ID",
        )}.`,
        type: "info",
      });
    }

    const lowestDonationCategory = donationByCategory
      .filter((item) => item.total > 0)
      .sort((a, b) => a.total - b.total)[0];

    if (
      lowestDonationCategory &&
      lowestDonationCategory.total < AGENT_RULES.LOW_CATEGORY_DONATION
    ) {
      insights.push({
        title: "Kategori Perlu Perhatian",
        message: `${lowestDonationCategory.category} memiliki donasi yang masih rendah.`,
        type: "warning",
      });
    }

    if (totalExpenses > 0) {
      const expenseByCategory = categories.map((category) => {
        const total =
          expenses
            ?.filter((item) => item.category === category)
            .reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

        return {
          category,
          total,
        };
      });

      const dominantCategory = [...expenseByCategory].sort(
        (a, b) => b.total - a.total,
      )[0];

      const dominantPercentage = dominantCategory
        ? Math.round((dominantCategory.total / totalExpenses) * 100)
        : 0;

      if (dominantPercentage > AGENT_RULES.CATEGORY_DOMINANCE_PERCENTAGE) {
        insights.push({
          title: "Distribusi Dana Tidak Merata",
          message: `${dominantPercentage}% pengeluaran terfokus pada kategori ${dominantCategory.category}.`,
          type: "info",
        });
      }
    }

    return insights;
  },
};
