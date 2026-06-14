import { StyleSheet, Text, View } from "react-native";

import { Donation } from "@/features/donations/types";

import { formatRupiah } from "@/lib/currency";

interface Props {
  donation: Donation;
}

export default function DonationDetailCard({ donation }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>{formatRupiah(donation.amount)}</Text>

      <InfoItem label="Kategori" value={donation.category} />

      <InfoItem label="Catatan" value={donation.note || "-"} />

      <InfoItem label="Latitude" value={donation.latitude?.toString() || "-"} />

      <InfoItem
        label="Longitude"
        value={donation.longitude?.toString() || "-"}
      />

      <InfoItem label="Photo URL" value={donation.photo_url || "-"} />

      <InfoItem
        label="Tanggal Donasi"
        value={new Date(donation.created_at).toLocaleString("id-ID")}
      />

      <InfoItem label="Donation ID" value={donation.id} />
    </View>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  amount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 24,
  },

  item: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#0F172A",
  },
});
