import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";

import { useProfile } from "@/features/profile/useProfile";

export default function ProfileScreen() {
  const { profile, loading, refresh, updateProfile, logout } = useProfile();

  const handleUpdateProfile = async (fullName: string, avatarUrl: string) => {
    await updateProfile({
      full_name: fullName,
      avatar_url: avatarUrl || null,
    });

    await refresh();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();

          router.replace("/");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Profil tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Profil Saya</Text>

      <Text style={styles.subtitle}>Kelola informasi akun Anda.</Text>

      <ProfileCard profile={profile} />

      <ProfileForm
        initialFullName={profile.full_name}
        initialAvatarUrl={profile.avatar_url}
        onSubmit={handleUpdateProfile}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
