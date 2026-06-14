import { supabase } from "@/lib/supabase";

import { ExpenseCategory } from "./types";

export const expenseService = {
  async getCategoryStatistics(): Promise<ExpenseCategory[]> {
    const { data } = await supabase.from("expenses").select("category, amount");

    if (!data) {
      return [];
    }

    const total = data.reduce((sum, item) => sum + Number(item.amount), 0);

    const grouped = data.reduce(
      (acc, item) => {
        const category = item.category;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += Number(item.amount);

        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(grouped).map(([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((amount / total) * 100),
    }));
  },
};
