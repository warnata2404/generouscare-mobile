import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="cash-minus" size={20} color="#FFFFFF" />
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.category}>{category}</Text>

          <Text style={styles.date}>
            {new Date(createdAt).toLocaleDateString("id-ID")}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {description || "Tidak ada deskripsi"}
      </Text>

      <Text style={styles.amount}>{formatRupiah(amount)}</Text>

      <Text style={styles.detailHint}>Lihat Detail →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 18,

    marginBottom: 14,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 3,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 12,
  },

  iconContainer: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#DC2626",

    justifyContent: "center",

    alignItems: "center",
  },

  headerContent: {
    flex: 1,

    marginLeft: 12,
  },

  category: {
    fontSize: 16,

    fontWeight: "700",

    color: "#0F172A",
  },

  date: {
    marginTop: 2,

    fontSize: 12,

    color: "#94A3B8",
  },

  description: {
    color: "#64748B",

    marginBottom: 12,

    lineHeight: 20,
  },

  amount: {
    fontSize: 24,

    fontWeight: "700",

    color: "#DC2626",
  },

  detailHint: {
    marginTop: 12,

    color: "#2563EB",

    fontWeight: "600",

    fontSize: 13,
  },
});
