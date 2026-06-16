import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { formatRupiah } from "@/lib/currency";

interface DonationCardProps {
  id: string;

  amount: number;

  category: string;

  note: string;

  createdAt: string;

  photoUrl?: string | null;
}

export default function DonationCard({
  id,
  amount,
  category,
  note,
  createdAt,
  photoUrl,
}: DonationCardProps) {
  const handlePress = () => {
    router.push({
      pathname: "/donation-detail",
      params: {
        id,
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {photoUrl ? (
        <Image
          source={{
            uri: photoUrl,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="hand-heart" size={20} color="#FFFFFF" />
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>
      </View>

      <Text style={styles.amount}>{formatRupiah(amount)}</Text>

      <Text style={styles.note} numberOfLines={2}>
        {note || "-"}
      </Text>

      <Text style={styles.date}>
        {new Date(createdAt).toLocaleDateString("id-ID")}
      </Text>

      <Text style={styles.detailHint}>Tap untuk melihat detail →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 16,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 8,

    elevation: 3,
  },

  image: {
    width: "100%",

    height: 180,

    borderRadius: 14,

    marginBottom: 14,

    backgroundColor: "#F1F5F9",
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 12,
  },

  iconContainer: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#16A34A",

    justifyContent: "center",

    alignItems: "center",
  },

  badge: {
    backgroundColor: "#DCFCE7",

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 999,
  },

  badgeText: {
    color: "#15803D",

    fontSize: 12,

    fontWeight: "700",
  },

  amount: {
    fontSize: 24,

    fontWeight: "700",

    color: "#16A34A",

    marginBottom: 8,
  },

  note: {
    color: "#475569",

    fontSize: 14,

    lineHeight: 20,

    marginBottom: 10,
  },

  date: {
    color: "#94A3B8",

    fontSize: 12,
  },

  detailHint: {
    marginTop: 12,

    fontSize: 12,

    fontWeight: "600",

    color: "#2563EB",
  },
});
