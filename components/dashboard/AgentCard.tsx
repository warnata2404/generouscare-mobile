import { StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AgentCardProps {
  title: string;
  description: string;
}

export default function AgentCard({ title, description }: AgentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="robot-happy-outline"
          size={24}
          color="#16A34A"
        />

        <Text style={styles.headerText}>Agent Assistant</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#16A34A",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  headerText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#16A34A",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
  },
});
