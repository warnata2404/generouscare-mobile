import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { router } from "expo-router";

import MapView, { Marker } from "react-native-maps";

import { Donation } from "@/features/donations/types";

import { formatRupiah } from "@/lib/currency";

interface Props {
  donation: Donation;
}

export default function DonationDetailCard({ donation }: Props) {
  const handleOpenImage = () => {
    if (!donation.photo_url) {
      return;
    }

    router.push({
      pathname: "/image-viewer",
      params: {
        imageUrl: donation.photo_url,
      },
    });
  };

  return (
    <View style={styles.card}>
      {donation.photo_url ? (
        <TouchableOpacity activeOpacity={0.9} onPress={handleOpenImage}>
          <Image
            source={{
              uri: donation.photo_url,
            }}
            style={styles.image}
            resizeMode="cover"
          />

          <Text style={styles.previewHint}>Tap foto untuk memperbesar</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.badge}>
        <MaterialCommunityIcons name="hand-heart" size={16} color="#15803D" />

        <Text style={styles.badgeText}>{donation.category}</Text>
      </View>

      <Text style={styles.amount}>{formatRupiah(donation.amount)}</Text>

      <InfoItem label="Kategori" value={donation.category} />

      <InfoItem label="Catatan" value={donation.note || "-"} />

      {donation.latitude && donation.longitude ? (
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Lokasi Donasi</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: donation.latitude,
              longitude: donation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: donation.latitude,
                longitude: donation.longitude,
              }}
              title="Lokasi Donasi"
              description={donation.category}
            />
          </MapView>
        </View>
      ) : null}

      <InfoItem label="Latitude" value={donation.latitude?.toString() || "-"} />

      <InfoItem
        label="Longitude"
        value={donation.longitude?.toString() || "-"}
      />

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

    borderRadius: 24,

    padding: 20,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 10,

    elevation: 4,
  },

  image: {
    width: "100%",

    height: 240,

    borderRadius: 18,

    backgroundColor: "#F1F5F9",
  },

  previewHint: {
    textAlign: "center",

    color: "#2563EB",

    fontSize: 12,

    fontWeight: "600",

    marginTop: 8,

    marginBottom: 20,
  },

  badge: {
    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    backgroundColor: "#DCFCE7",

    borderRadius: 999,

    paddingHorizontal: 12,

    paddingVertical: 6,

    marginBottom: 12,

    gap: 6,
  },

  badgeText: {
    color: "#15803D",

    fontWeight: "700",

    fontSize: 12,
  },

  amount: {
    fontSize: 30,

    fontWeight: "700",

    color: "#16A34A",

    marginBottom: 24,
  },

  item: {
    marginBottom: 18,
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

  mapContainer: {
    marginBottom: 24,
  },

  mapTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 12,
  },

  map: {
    width: "100%",

    height: 220,

    borderRadius: 18,
  },
});
