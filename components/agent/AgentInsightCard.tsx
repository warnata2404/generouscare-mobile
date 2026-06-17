import { StyleSheet, Text, View } from "react-native";

interface AgentInsightCardProps {
  title: string;

  message: string;

  type: "info" | "success" | "warning";

  createdAt: string;
}

export default function AgentInsightCard({
  title,
  message,
  type,
  createdAt,
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

  const getBadgeText = () => {
    switch (type) {
      case "success":
        return "POSITIF";

      case "warning":
        return "PERHATIAN";

      default:
        return "INFORMASI";
    }
  };

  const formattedDateTime = new Date(createdAt).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: getColor(),
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: getColor(),
            },
          ]}
        >
          <Text style={styles.badgeText}>{getBadgeText()}</Text>
        </View>
      </View>

      <Text style={styles.title}>
        {getIcon()} {title}
      </Text>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.footer}>
        <Text style={styles.timestamp}>{formattedDateTime} WIB</Text>
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

    borderLeftWidth: 5,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  header: {
    flexDirection: "row",

    justifyContent: "flex-end",

    marginBottom: 10,
  },

  badge: {
    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 999,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
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

  footer: {
    marginTop: 12,

    paddingTop: 10,

    borderTopWidth: 1,

    borderTopColor: "#E2E8F0",
  },

  timestamp: {
    fontSize: 12,

    color: "#94A3B8",
  },
});
