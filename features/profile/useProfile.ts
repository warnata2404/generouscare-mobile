import { useCallback, useEffect, useState } from "react";

import { profileService } from "./profile.service";

import { Profile, UpdateProfilePayload } from "./types";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const result = await profileService.getProfile();

      setProfile(result);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (payload: UpdateProfilePayload) => {
    await profileService.updateProfile(payload);

    await loadProfile();
  };

  const logout = async () => {
    await profileService.logout();
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loading,
    refresh: loadProfile,
    updateProfile,
    logout,
  };
}
