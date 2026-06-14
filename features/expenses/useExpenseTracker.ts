import { useEffect, useState } from "react";

import { expenseService } from "./expense.service";

import { ExpenseCategory } from "./types";

export function useExpenseTracker() {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await expenseService.getCategoryStatistics();

      setCategories(result);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
  };
}
