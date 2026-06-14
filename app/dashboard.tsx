import { StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.text}>Selamat datang</Text>

      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
  },

  email: {
    marginTop: 8,
    color: "#16A34A",
  },
});
