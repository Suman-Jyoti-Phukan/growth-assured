import { useLocalSearchParams } from "expo-router";

import { View, Text } from "react-native";

export default function EmployeeDetails() {
  const { data } = useLocalSearchParams();

  // const employee = JSON.parse(data as string);

  return (
    <View style={{ padding: 20 }}>
      {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>{employee.name}</Text>
      <Text>{employee.role}</Text>
      <Text>Reports to: {employee.reportsTo}</Text> */}
    </View>
  );
}
