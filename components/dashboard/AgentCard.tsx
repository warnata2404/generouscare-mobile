import { StyleSheet, Text, View } from "react-native";

interface AgentCardProps {
  title: string;
  description: string;
}

export default function AgentCard({ title, description }: AgentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DCFCE7",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    color: "#166534",
  },
});
