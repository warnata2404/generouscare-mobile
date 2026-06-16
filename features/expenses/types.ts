export interface Expense {
  id: string;

  category: string;

  amount: number;

  description: string | null;

  created_at: string;
}

export interface CreateExpensePayload {
  category: string;

  amount: number;

  description?: string;
}

export interface UpdateExpensePayload {
  category: string;

  amount: number;

  description?: string;
}

export interface ExpenseCategory {
  category: string;

  amount: number;

  percentage: number;
}
