import { Alert, ScrollView, StyleSheet, Text } from "react-native";

import { router } from "expo-router";

import ExpenseForm from "@/components/expenses/ExpenseForm";

import { agentService } from "@/features/agent/agent.service";
import { expenseService } from "@/features/expenses/expense.service";

export default function ExpenseCreateScreen() {
  const handleCreateExpense = async (
    amount: number,
    category: string,
    description: string,
  ) => {
    try {
      await expenseService.create({
        amount,
        category,
        description,
      });

      // Jalankan evaluasi Agent setelah pengeluaran berhasil dibuat
      await agentService.evaluate();

      Alert.alert("Berhasil", "Pengeluaran berhasil ditambahkan.", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/expenses");
          },
        },
      ]);
    } catch (error: any) {
      console.log("Expense Create Error:", error);

      Alert.alert(
        "Gagal",
        error?.message || "Terjadi kesalahan saat menyimpan pengeluaran.",
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Tambah Pengeluaran</Text>

      <Text style={styles.subtitle}>
        Catat penggunaan dana bantuan dan operasional.
      </Text>

      <ExpenseForm onSubmit={handleCreateExpense} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },
});
