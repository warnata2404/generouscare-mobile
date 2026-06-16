import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  const isRemainingFund = title === "Dana Tersisa";

  return (
    <View style={[styles.card, isRemainingFund && styles.remainingFundCard]}>
      <Text
        style={[styles.title, isRemainingFund && styles.remainingFundTitle]}
      >
        {title}
      </Text>

      <Text
        style={[styles.value, isRemainingFund && styles.remainingFundValue]}
        numberOfLines={2}
        adjustsFontSizeToFit
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

    padding: 16,

    minHeight: 110,

    justifyContent: "space-between",

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 10,

    elevation: 4,
  },

  remainingFundCard: {
    borderWidth: 1.5,

    borderColor: "#BFDBFE",

    backgroundColor: "#EFF6FF",
  },

  title: {
    fontSize: 13,

    color: "#64748B",

    fontWeight: "500",
  },

  remainingFundTitle: {
    color: "#1D4ED8",

    fontWeight: "600",
  },

  value: {
    fontSize: 18,

    fontWeight: "700",

    color: "#0F172A",

    lineHeight: 24,

    flexShrink: 1,
  },

  remainingFundValue: {
    color: "#2563EB",

    textAlign: "left",
  },
});
