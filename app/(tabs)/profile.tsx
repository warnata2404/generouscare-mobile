import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { router } from "expo-router";

import AppHeader from "@/components/common/AppHeader";
import ScreenContainer from "@/components/common/ScreenContainer";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";

import { useProfile } from "@/features/profile/useProfile";

export default function ProfileScreen() {
  const { profile, loading, refresh, updateProfile, logout } = useProfile();

  const handleUpdateProfile = async (fullName: string, avatarUrl: string) => {
    try {
      await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl || null,
      });

      await refresh();

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Profil berhasil diperbarui.",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error?.message || "Terjadi kesalahan.",
      });
    }
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
          try {
            await logout();

            router.dismissAll();

            router.replace("/login");
          } catch (error: any) {
            Toast.show({
              type: "error",
              text1: "Gagal",
              text2: error?.message || "Logout gagal dilakukan.",
            });
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </ScreenContainer>
    );
  }

  if (!profile) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Text>Profil tidak ditemukan.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
<<<<<<< HEAD
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Profil Saya</Text>
=======
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader title="Profil Saya" subtitle="Kelola informasi akun Anda." />
>>>>>>> origin/main

        <ProfileCard profile={profile} />

        <ProfileForm
          initialFullName={profile.full_name}
          initialAvatarUrl={profile.avatar_url}
          onSubmit={handleUpdateProfile}
        />

<<<<<<< HEAD
      <ProfileForm
        initialFullName={profile.full_name}
        initialAvatarUrl={profile.avatar_url}
        onSubmit={handleUpdateProfile}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
=======
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
>>>>>>> origin/main
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  contentContainer: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#DC2626",

    padding: 16,

    borderRadius: 16,

    alignItems: "center",

    marginTop: 20,

    marginBottom: 20,
  },

  logoutText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 16,
  },
});
