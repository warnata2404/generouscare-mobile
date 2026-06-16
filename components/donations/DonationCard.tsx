import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";

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

      <Text style={styles.amount}>{formatRupiah(amount)}</Text>

      <Text style={styles.category}>{category}</Text>

      <Text style={styles.note}>{note || "-"}</Text>

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

    borderRadius: 16,

    padding: 16,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 4,

    elevation: 2,
  },

  image: {
    width: "100%",

    height: 180,

    borderRadius: 12,

    marginBottom: 12,

    backgroundColor: "#F1F5F9",
  },

  amount: {
    fontSize: 20,

    fontWeight: "700",

    color: "#16A34A",
  },

  category: {
    marginTop: 8,

    fontWeight: "600",

    color: "#0F172A",
  },

  note: {
    marginTop: 4,

    color: "#64748B",
  },

  date: {
    marginTop: 10,

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
