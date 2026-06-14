import { ActivityItem, AgentRecommendation, DashboardStats } from "./types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return {
      totalDonations: 5000000,
      totalExpenses: 1500000,
      remainingFunds: 3500000,
    };
  },

  async getRecommendation(): Promise<AgentRecommendation> {
    return {
      id: "1",
      title: "Rekomendasi Agent",
      description: "Dana tersedia cukup untuk membantu program pendidikan.",
    };
  },

  async getActivities(): Promise<ActivityItem[]> {
    return [
      {
        id: "1",
        title: "Donasi diterima",
        createdAt: "Hari ini",
      },
      {
        id: "2",
        title: "Pengeluaran bantuan pendidikan",
        createdAt: "Kemarin",
      },
    ];
  },
};
