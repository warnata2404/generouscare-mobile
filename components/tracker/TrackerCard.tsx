import { StyleSheet, Text, View } from "react-native";

interface TrackerCardProps {
  category: string;
  amount: number;
  percentage: number;
}

export default function TrackerCard({
  category,
  amount,
  percentage,
}: TrackerCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.category}>{category}</Text>

        <Text style={styles.percentage}>{percentage}%</Text>
      </View>

      <Text style={styles.amount}>Rp {amount.toLocaleString("id-ID")}</Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  category: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },

  percentage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
  },

  amount: {
    marginBottom: 12,
    color: "#64748B",
  },

  progressBackground: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
  },
});
