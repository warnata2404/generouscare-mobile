import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import { formatRupiah } from "@/lib/currency";

interface ExpenseCardProps {
  id: string;
  category: string;
  amount: number;
  description: string | null;
  createdAt: string;
}

export default function ExpenseCard({
  id,
  category,
  amount,
  description,
  createdAt,
}: ExpenseCardProps) {
  const handlePress = () => {
    router.push({
      pathname: "/expense-detail",
      params: {
        id,
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Text style={styles.amount}>{formatRupiah(amount)}</Text>

      <Text style={styles.category}>{category}</Text>

      <Text style={styles.description}>{description || "-"}</Text>

      <Text style={styles.date}>
        {new Date(createdAt).toLocaleDateString("id-ID")}
      </Text>

      <Text style={styles.detailHint}>Tap untuk melihat detail →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  amount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DC2626",
  },

  category: {
    marginTop: 8,
    fontWeight: "600",
    color: "#0F172A",
  },

  description: {
    marginTop: 4,
    color: "#64748B",
  },

  date: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 12,
  },

  detailHint: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
});
