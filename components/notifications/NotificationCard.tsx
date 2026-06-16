import { StyleSheet, Text, View } from "react-native";

interface NotificationCardProps {
  title: string;
  message: string;
  type: string;
  createdAt: string;
}

export default function NotificationCard({
  title,
  message,
  type,
  createdAt,
}: NotificationCardProps) {
  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "#16A34A";

      case "warning":
        return "#EA580C";

      default:
        return "#2563EB";
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "success":
        return "Berhasil";

      case "warning":
        return "Peringatan";

      default:
        return "Informasi";
    }
  };

  const getTypeIcon = () => {
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
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: getTypeColor(),
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {getTypeIcon()} {getTypeLabel()}
          </Text>
        </View>

        <Text style={styles.date}>{createdAt}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

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

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 3,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 12,
  },

  badge: {
    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 999,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },

  date: {
    fontSize: 12,

    color: "#94A3B8",
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 6,
  },

  message: {
    color: "#64748B",

    lineHeight: 22,
  },
});
