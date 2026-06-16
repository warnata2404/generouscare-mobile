import { StyleSheet, Text, View } from "react-native";

interface AgentInsightCardProps {
  title: string;

  message: string;

  type: "info" | "success" | "warning";
}

export default function AgentInsightCard({
  title,
  message,
  type,
}: AgentInsightCardProps) {
  const getColor = () => {
    switch (type) {
      case "success":
        return "#16A34A";

      case "warning":
        return "#DC2626";

      default:
        return "#2563EB";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";

      case "warning":
        return "⚠️";

      default:
        return "ℹ️";
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: getColor(),
        },
      ]}
    >
      <Text style={styles.title}>
        {getIcon()} {title}
      </Text>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 16,

    marginBottom: 12,

    borderLeftWidth: 5,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 8,
  },

  message: {
    color: "#64748B",

    lineHeight: 22,
  },
});
