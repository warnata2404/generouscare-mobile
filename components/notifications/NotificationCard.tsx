import { Pressable, StyleSheet, Text, View } from "react-native";

interface NotificationCardProps {
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  category: "donation" | "expense" | "system";
  createdAt: string;
  isRead?: boolean;
  onPress?: () => void;
}

export default function NotificationCard({
  title,
  message,
  type,
  category,
  createdAt,
  isRead = false,
  onPress,
}: NotificationCardProps) {
  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "#12c052ff";

      case "warning":
        return "#EA580C";

      default:
        return "#2564eeff";
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

  const getCategoryColor = () => {
    switch (category) {
      case "donation":
        return "#2563EB";

      case "expense":
        return "#DC2626";

      default:
        return "#64748B";
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case "donation":
        return "DONASI";

      case "expense":
        return "PENGELUARAN";

      default:
        return "SISTEM";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        !isRead && styles.unreadCard,
        pressed && styles.pressedCard,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: getCategoryColor(),
              },
            ]}
          >
            <Text style={styles.badgeText}>{getCategoryLabel()}</Text>
          </View>

          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor: getTypeColor(),
              },
            ]}
          >
            <Text style={styles.badgeText}>{getTypeLabel()}</Text>
          </View>
        </View>

        <Text style={styles.date}>{createdAt}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>

      {!isRead && (
        <View style={styles.unreadContainer}>
          <View style={styles.unreadDot} />

          <Text style={styles.unreadText}>
            Ketuk untuk menandai sudah dibaca
          </Text>
        </View>
      )}
    </Pressable>
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

  pressedCard: {
    opacity: 0.8,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
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

  unreadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563EB",
    marginRight: 6,
  },

  unreadText: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
  },
});
