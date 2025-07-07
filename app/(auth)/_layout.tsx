import { useAuth } from "@/context/AuthContext";

import { Stack } from "expo-router";

import { Redirect } from "expo-router";

import { Text } from "react-native";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen name="register" options={{}} />
    </Stack>
  );
}
5