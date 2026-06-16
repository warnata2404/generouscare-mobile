import { router } from "expo-router";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuth } from "@/hooks/useAuth";

import { useNotifications } from "@/features/notifications/useNotifications";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  const { user } = useAuth();

  const { unreadCount } = useNotifications();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.greeting}>
          Halo, {user?.full_name || "Pengguna"} 👋
        </Text>

        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/notifications")}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#0F172A"
          />

          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/profile")}
        >
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={28}
            color="#0F172A"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  leftSection: {
    flex: 1,

    paddingRight: 16,
  },

  greeting: {
    fontSize: 13,

    color: "#64748B",

    marginBottom: 4,
  },

  title: {
    fontSize: 24,

    fontWeight: "700",

    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,

    color: "#64748B",

    fontSize: 13,
  },

  actionContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  iconButton: {
    position: "relative",

    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    elevation: 2,
  },

  badge: {
    position: "absolute",

    top: -2,

    right: -2,

    minWidth: 18,

    height: 18,

    borderRadius: 9,

    backgroundColor: "#DC2626",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 10,

    fontWeight: "700",
  },
});
