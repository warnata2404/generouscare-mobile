import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text
        style={[
          styles.value,
          title === "Dana Tersisa" && styles.remainingFunds,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 10,

    elevation: 4,
  },

  title: {
    fontSize: 14,

    color: "#64748B",

    marginBottom: 10,
  },

  value: {
    fontSize: 32,

    fontWeight: "700",

    color: "#0F172A",
  },

  remainingFunds: {
    color: "#2563EB",
  },
});
