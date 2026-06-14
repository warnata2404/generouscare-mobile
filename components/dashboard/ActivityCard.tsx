import { StyleSheet, Text, View } from "react-native";

interface ActivityCardProps {
  title: string;
  createdAt: string;
}

export default function ActivityCard({ title, createdAt }: ActivityCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.date}>{createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },

  title: {
    fontWeight: "600",
    marginBottom: 4,
  },

  date: {
    color: "#64748B",
    fontSize: 12,
  },
});
