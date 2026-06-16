export interface TrackerSummary {
  totalDonations: number;

  totalExpenses: number;

  remainingBalance: number;

  distributionPercentage: number;
}

export interface TrackerCategory {
  category: string;

  donationAmount: number;

  expenseAmount: number;

  remainingAmount: number;

  percentage: number;
}
