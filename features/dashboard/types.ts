export interface DashboardStats {
  totalDonations: number;

  totalExpenses: number;

  remainingFunds: number;

  donationCount: number;

  expenseCount: number;
}

export interface AgentRecommendation {
  id: string;
  title: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  createdAt: string;
}
