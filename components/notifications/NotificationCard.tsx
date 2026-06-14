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
        return "#10B981";

      case "warning":
        return "#F59E0B";

      default:
        return "#3B82F6";
    }
  };

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: getTypeColor(),
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.message}>{message}</Text>

        <Text style={styles.date}>{createdAt}</Text>
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
    flexDirection: "row",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  indicator: {
    width: 6,
    borderRadius: 6,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  message: {
    marginTop: 4,
    color: "#64748B",
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#94A3B8",
  },
});
