import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import AppHeader from "@/components/common/AppHeader";
import ScreenContainer from "@/components/common/ScreenContainer";

import ExpenseCard from "@/components/expenses/ExpenseCard";

import { useExpenses } from "@/features/expenses/useExpenses";

import { formatRupiah } from "@/lib/currency";

export default function ExpensesScreen() {
  const { expenses, loading, refresh } = useExpenses();

  const [refreshing, setRefreshing] = useState(false);

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <AppHeader
          title="Pengeluaran"
          subtitle="Kelola dan pantau seluruh data pengeluaran."
        />

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>Total Pengeluaran</Text>

            <Text style={styles.summaryAmount}>
              {formatRupiah(totalExpense)}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View>
            <Text style={styles.summaryLabel}>Transaksi</Text>

            <Text style={styles.summaryCount}>{expenses.length}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/expense-create")}
        >
          <Text style={styles.createButtonText}>Tambah Pengeluaran</Text>
        </TouchableOpacity>

        {expenses.length > 0 ? (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpenseCard
                id={item.id}
                category={item.category}
                amount={item.amount}
                description={item.description}
                createdAt={item.created_at}
              />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Belum Ada Pengeluaran</Text>

            <Text style={styles.emptyText}>
              Tambahkan data pengeluaran pertama.
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 8,

    elevation: 3,
  },

  summaryLabel: {
    fontSize: 13,

    color: "#64748B",

    marginBottom: 6,
  },

  summaryAmount: {
    fontSize: 22,

    fontWeight: "700",

    color: "#DC2626",
  },

  summaryCount: {
    fontSize: 22,

    fontWeight: "700",

    color: "#0F172A",
  },

  summaryDivider: {
    width: 1,

    height: 40,

    backgroundColor: "#E2E8F0",
  },

  createButton: {
    backgroundColor: "#DC2626",

    padding: 14,

    borderRadius: 16,

    marginBottom: 16,
  },

  createButtonText: {
    color: "#FFFFFF",

    textAlign: "center",

    fontWeight: "700",

    fontSize: 16,
  },

  listContainer: {
    paddingBottom: 32,
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",

    padding: 24,

    borderRadius: 20,

    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 8,
  },

  emptyText: {
    color: "#64748B",

    textAlign: "center",
  },
});
