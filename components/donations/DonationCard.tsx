import { StyleSheet, Text, View } from "react-native";

import { formatRupiah } from "@/lib/currency";

interface DonationCardProps {
  amount: number;
  category: string;
  note: string;
  createdAt: string;
}

export default function DonationCard({
  amount,
  category,
  note,
  createdAt,
}: DonationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>{formatRupiah(amount)}</Text>

      <Text style={styles.category}>{category}</Text>

      <Text style={styles.note}>{note}</Text>

      <Text style={styles.date}>
        {new Date(createdAt).toLocaleDateString("id-ID")}
      </Text>
    </View>
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
    color: "#16A34A",
  },

  category: {
    marginTop: 8,
    fontWeight: "600",
    color: "#0F172A",
  },

  note: {
    marginTop: 4,
    color: "#64748B",
  },

  date: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 12,
  },
});
