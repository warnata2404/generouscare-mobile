import { supabase } from "@/lib/supabase";

import {
  CreateExpensePayload,
  Expense,
  ExpenseCategory,
  UpdateExpensePayload,
} from "./types";

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  async getById(id: string): Promise<Expense | null> {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async create(payload: CreateExpensePayload): Promise<void> {
    const { error } = await supabase.from("expenses").insert({
      category: payload.category,
      amount: payload.amount,
      description: payload.description,
    });

    if (error) {
      throw error;
    }
  },

  async update(id: string, payload: UpdateExpensePayload): Promise<Expense> {
    const { data, error } = await supabase
      .from("expenses")
      .update({
        category: payload.category,
        amount: payload.amount,
        description: payload.description,
      })
      .eq("id", id)
      .select()
      .single();

    console.log("UPDATE RESULT:", data);
    console.log("UPDATE ERROR:", error);

    if (error) {
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { data, error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .select();

    console.log("DELETE RESULT:", data);
    console.log("DELETE ERROR:", error);

    if (error) {
      throw error;
    }
  },

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
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }));
  },
};
