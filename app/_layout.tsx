import { AuthProvider } from "@/context/AuthContext";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(hierarchy)" />
      </Stack>
    </AuthProvider>
  );
}
