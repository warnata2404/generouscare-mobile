import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import NotificationCard from "@/components/notifications/NotificationCard";

import { useNotifications } from "@/features/notifications/useNotifications";

export default function NotificationsScreen() {
  const { notifications, loading } = useNotifications();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Notification Center</Text>

      <Text style={styles.subtitle}>
        Semua notifikasi dari Agent dan sistem.
      </Text>

      {notifications.length > 0 ? (
        notifications.map((item) => (
          <NotificationCard
            key={item.id}
            title={item.title}
            message={item.message}
            type={item.type}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada notifikasi.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  emptyText: {
    color: "#64748B",
  },
});
