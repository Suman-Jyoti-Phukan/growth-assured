import { View, Text, TextInput } from "react-native";

import React, { useState } from "react";

export default function Test() {
  const [value, setValue] = useState("");

  return (
    <View>
      <Text>Test</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Enter name"
        keyboardType="default"
      />
    </View>
  );
}
