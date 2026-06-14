import { StyleSheet, Text, View } from "react-native";

interface ProfileInfoItemProps {
  label: string;
  value: string;
}

export default function ProfileInfoItem({
  label,
  value,
}: ProfileInfoItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    fontWeight: "500",
  },

  value: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "600",
  },
});
