import React from "react";

import { Stack } from "expo-router";

export default function EmployeeDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[employee-details]"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
