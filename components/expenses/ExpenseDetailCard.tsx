import { StyleSheet, Text, View } from "react-native";
import { Expense } from "@/features/expenses/types";
import { formatRupiah } from "@/lib/currency";

interface Props {
  expense: Expense;
}

export default function ExpenseDetailCard({ expense }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>{formatRupiah(expense.amount)}</Text>
      <InfoItem label="Kategori" value={expense.category} />
      <InfoItem label="Deskripsi" value={expense.description || "-"} />
      <InfoItem label="Tanggal" value={new Date(expense.created_at).toLocaleString("id-ID")}/>
      <InfoItem label="Expense ID" value={expense.id} />
    </View>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  amount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 24,
  },

  item: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#0F172A",
  },
});
