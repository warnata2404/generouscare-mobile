export interface DashboardStats {
  totalDonations: number;

  totalExpenses: number;

  remainingFunds: number;

  distributionRate: number;
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

export interface MonthlyChartData {
  labels: string[];

  donations: number[];

  expenses: number[];
}
