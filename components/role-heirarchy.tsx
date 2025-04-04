import { View, Text, TouchableOpacity } from "react-native";

import { useState } from "react";

import Icon from "react-native-vector-icons/MaterialIcons";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { themeColors } from "@/utils/colors";

import { useRouter } from "expo-router";

const hierarchy: Record<string, string[]> = {
  "Area Sales Manager": ["John Doe", "Jane Smith", "Alice Johnson"],
  "Branch Manager": ["Robert Brown", "Emily Davis", "Michael Wilson"],
  "Sales Manager": ["William Taylor", "Olivia Martinez", "James Anderson"],
  Agent: ["David Thomas", "Sophia White", "Daniel Harris"],
};

export default function RoleHierarchy(): JSX.Element {
  const router = useRouter();

  const { primary, secondary } = themeColors;

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const [designationDropdown, setDesignationDropdown] = useState<
    Record<string, boolean>
  >({});

  const toggleDesignationDropdown = (role: string): void => {
    setDesignationDropdown((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  return (
    <View style={{ marginBottom: 0, paddingHorizontal: 10 }}>
      <TouchableOpacity
        onPress={() => setDropdownVisible((prev) => !prev)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="people"
            size={28}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(1.9),
              color: "#000",
              fontWeight: "500",
            }}
          >
            Role Hierarchy
          </Text>
        </View>
        <Icon
          name={dropdownVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={20}
          color={"#000"}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={{ marginLeft: 30, marginTop: 8 }}>
          {Object.keys(hierarchy).map((role) => (
            <View key={role} style={{ marginBottom: 12, paddingHorizontal: 8 }}>
              <TouchableOpacity
                onPress={() => toggleDesignationDropdown(role)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: secondary,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: responsiveFontSize(1.8),
                    color: primary,
                  }}
                >
                  {role}
                </Text>
                <Icon
                  name={
                    designationDropdown[role]
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={20}
                  color={primary}
                />
              </TouchableOpacity>

              {designationDropdown[role] &&
                hierarchy[role].map((name) => (
                  <TouchableOpacity
                    key={name}
                    onPress={() =>
                      router.push(`/employee-details/${name}` as any)
                    }
                  >
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: responsiveFontSize(1.8),
                        color: "#000",
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      {name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
