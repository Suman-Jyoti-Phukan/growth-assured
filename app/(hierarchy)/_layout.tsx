import { Stack } from "expo-router";

import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="branch-manager"
        options={{ title: "Branch Manager", animation: "fade" }}
      />
      <Stack.Screen
        name="sale-manager"
        options={{ title: "Sale Manager", animation: "fade" }}
      />
      <Stack.Screen
        name="financial-planner"
        options={{ title: "Financial Planner", animation: "fade" }}
      />
      <Stack.Screen
        name="login-report"
        options={{
          title: "Login Report",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="dsr-report"
        options={{ title: "Daily Sales Report", animation: "fade" }}
      />
      <Stack.Screen
        name="[employee-details]"
        options={{ title: "Employee Details", animation: "fade" }}
      />
    </Stack>
  );
}
