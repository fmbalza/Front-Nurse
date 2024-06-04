import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,
      certified: null,
      rememberMe: false,
      pushToken: null,
      login: (token, user) => set({ token, user }),
      logout: () =>
        set({
          token: null,
          user: null,
          role: null,
          certified: null,
          rememberMe: false,
          pushToken: null,
        }),
      setRole: (role) => set({ role }),
      setCertified: (certified) => set({ certified }),
      setRememberMe: (rememberMe) => set({ rememberMe }),
      setPushToken: (pushToken) => set({ pushToken }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
