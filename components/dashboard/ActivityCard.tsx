import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ActivityCardProps {
  title: string;
  createdAt: string;
}

export default function ActivityCard({ title, createdAt }: ActivityCardProps) {
  const isDonation = title.toLowerCase().includes("donasi");

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          isDonation ? styles.donationIcon : styles.expenseIcon,
        ]}
      >
        <MaterialCommunityIcons
          name={isDonation ? "hand-heart" : "cash-minus"}
          size={20}
          color="#FFFFFF"
        />
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.badge,
            isDonation ? styles.badgeDonation : styles.badgeExpense,
          ]}
        >
          <Text style={styles.badgeText}>
            {isDonation ? "DONASI" : "PENGELUARAN"}
          </Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.date}>{createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  donationIcon: {
    backgroundColor: "#16A34A",
  },

  expenseIcon: {
    backgroundColor: "#DC2626",
  },

  content: {
    flex: 1,

    marginLeft: 12,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },

  badgeDonation: {
    backgroundColor: "#DCFCE7",
  },

  badgeExpense: {
    backgroundColor: "#FEE2E2",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0F172A",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
    color: "#64748B",
  },
});
