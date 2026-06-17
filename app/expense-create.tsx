import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

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

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Pengeluaran berhasil ditambahkan.",
      });

      router.replace("/expenses");
    } catch (error: any) {
      console.log("Expense Create Error:", error);

      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error?.message || "Terjadi kesalahan saat menyimpan pengeluaran.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Tambah Pengeluaran</Text>

      <Text style={styles.subtitle}>
        Catat penggunaan dana bantuan dan operasional.
      </Text>

      <ExpenseForm onSubmit={handleCreateExpense} />
      </ScrollView>
    </SafeAreaView>
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
