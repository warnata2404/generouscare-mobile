import { supabase } from "@/lib/supabase";

import { notificationGeneratorService } from "@/features/notifications/notification-generator.service";
import { AGENT_RULES } from "./rules";
import { AgentInsight } from "./types";

export const agentService = {
  async evaluate(): Promise<AgentInsight[]> {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      return [];
    }

    const insights: AgentInsight[] = [];

    const analysisTime = new Date().toISOString();

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

    const distributionPercentage =
      totalDonations > 0
        ? Math.round((totalExpenses / totalDonations) * 100)
        : 0;

    /**
     * =====================================
     * KONDISI SALDO DANA
     * =====================================
     */
    if (remainingFunds > 0 && remainingFunds < AGENT_RULES.LOW_FUNDS) {
      insights.push({
        title: "Peringatan Dana Menipis",
        message: `Saldo dana saat ini hanya Rp${remainingFunds.toLocaleString(
          "id-ID",
        )}. Nilai ini berada di bawah batas aman Rp${AGENT_RULES.LOW_FUNDS.toLocaleString(
          "id-ID",
        )}. Disarankan meningkatkan kampanye donasi atau menunda pengeluaran yang tidak mendesak.`,
        type: "warning",
        createdAt: analysisTime,
      });
    }

    if (remainingFunds >= AGENT_RULES.HEALTHY_FUNDS) {
      insights.push({
        title: "Kondisi Dana Sehat",
        message: `Saldo dana tersedia sebesar Rp${remainingFunds.toLocaleString(
          "id-ID",
        )}. Kondisi keuangan saat ini tergolong sehat dan siap mendukung program sosial berikutnya.`,
        type: "success",
        createdAt: analysisTime,
      });
    }

    /**
     * =====================================
     * DISTRIBUSI DANA
     * =====================================
     */
    if (distributionPercentage >= AGENT_RULES.HIGH_DISTRIBUTION_PERCENTAGE) {
      insights.push({
        title: "Penyaluran Dana Sangat Baik",
        message: `${distributionPercentage}% dana donasi telah berhasil disalurkan kepada penerima manfaat. Tingkat distribusi ini menunjukkan pengelolaan dana yang aktif dan efektif.`,
        type: "success",
        createdAt: analysisTime,
      });
    }

    if (
      distributionPercentage > 0 &&
      distributionPercentage <= AGENT_RULES.LOW_DISTRIBUTION_PERCENTAGE
    ) {
      insights.push({
        title: "Penyaluran Dana Masih Rendah",
        message: `Baru ${distributionPercentage}% dana yang telah disalurkan. Masih terdapat dana yang cukup besar untuk direalisasikan kepada program yang membutuhkan.`,
        type: "warning",
        createdAt: analysisTime,
      });
    }

    /**
     * =====================================
     * ANALISIS KATEGORI DONASI
     * =====================================
     */
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
        message: `Kategori ${highestDonationCategory.category} menjadi penyumbang dana terbesar dengan total donasi Rp${highestDonationCategory.total.toLocaleString(
          "id-ID",
        )}.`,
        type: "info",
        createdAt: analysisTime,
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
        message: `Kategori ${lowestDonationCategory.category} hanya menerima donasi Rp${lowestDonationCategory.total.toLocaleString(
          "id-ID",
        )}. Kategori ini memerlukan perhatian dan promosi lebih lanjut untuk meningkatkan dukungan donatur.`,
        type: "warning",
        createdAt: analysisTime,
      });
    }

    /**
     * =====================================
     * ANALISIS PENGELUARAN
     * =====================================
     */
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

      if (
        dominantCategory &&
        dominantPercentage > AGENT_RULES.CATEGORY_DOMINANCE_PERCENTAGE
      ) {
        insights.push({
          title: "Distribusi Dana Tidak Merata",
          message: `${dominantPercentage}% dana yang disalurkan terfokus pada kategori ${dominantCategory.category} dengan nilai Rp${dominantCategory.total.toLocaleString(
            "id-ID",
          )}. Pertimbangkan pemerataan distribusi ke kategori lainnya.`,
          type: "info",
          createdAt: analysisTime,
        });
      }
    }

    /**
     * =====================================
     * RINGKASAN SISTEM
     * =====================================
     */
    insights.push({
      title: "Ringkasan Dana Saat Ini",
      message: `Total donasi mencapai Rp${totalDonations.toLocaleString(
        "id-ID",
      )}, total pengeluaran Rp${totalExpenses.toLocaleString(
        "id-ID",
      )}, dan saldo dana yang masih tersedia sebesar Rp${remainingFunds.toLocaleString(
        "id-ID",
      )}.`,
      type: "info",
      createdAt: analysisTime,
    });

    /**
     * =====================================
     * PRIORITAS INSIGHT
     * =====================================
     */
    const priority = {
      warning: 1,
      success: 2,
      info: 3,
    };

    const sortedInsights = insights.sort(
      (a, b) => priority[a.type] - priority[b.type],
    );

    /**
     * =====================================
     * GENERATE NOTIFICATION
     * HANYA INSIGHT PRIORITAS TERTINGGI
     * =====================================
     */
    const warningInsight = sortedInsights.find(
      (item) => item.type === "warning",
    );

    if (warningInsight) {
      try {
        await notificationGeneratorService.createIfNotExists({
          title: warningInsight.title,
          message: warningInsight.message,
          type: warningInsight.type,
          category: "system",
        });
      } catch (error) {
        console.log("GENERATE NOTIFICATION ERROR:", error);
      }
    }

    return sortedInsights;
  },
};
