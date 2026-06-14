import { StyleSheet, Text, View } from "react-native";

import { Profile } from "@/features/profile/types";

import ProfileInfoItem from "./ProfileInfoItem";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>
          {profile.full_name?.charAt(0).toUpperCase()}
        </Text>
      </View>

      <ProfileInfoItem label="Nama Lengkap" value={profile.full_name} />

      <ProfileInfoItem label="Email" value={profile.email} />

      <ProfileInfoItem label="Avatar URL" value={profile.avatar_url || "-"} />

      <ProfileInfoItem
        label="Tanggal Bergabung"
        value={
          profile.created_at
            ? new Date(profile.created_at).toLocaleDateString("id-ID")
            : "-"
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,

    backgroundColor: "#22C55E",

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "center",

    marginBottom: 24,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
