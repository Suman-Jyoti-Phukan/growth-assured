import { useAuth } from "@/context/AuthContext";

import { Stack } from "expo-router";

import React from "react";

export default function _layout() {
  const { userData } = useAuth();

  console.log("User Data Type", userData?.employee.type);

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="branch-manager"
        options={{ title: "Branch Manager", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="sale-manager"
        options={{ title: "Sale Manager", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="financial-planner"
        options={{ title: "Financial Planner", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="login-report"
        options={{
          title: "Login Report",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="dsr-report"
        options={{ title: "Daily Sales Report", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="[employee-details]"
        options={{ title: "Employee Details", animation: "slide_from_right" }}
      />
    </Stack>
  );
}
