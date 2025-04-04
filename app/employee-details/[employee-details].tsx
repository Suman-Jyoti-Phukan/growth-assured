import { View, Text } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function EmployeeDetails() {
  const { "employee-details": employeeId } = useLocalSearchParams();

  if (!employeeId) {
    return <Text>Employee data is empty</Text>;
  }

  return (
    <View>
      <Text>Employee Details</Text>
      <Text>ID or Data: {employeeId}</Text>
    </View>
  );
}
