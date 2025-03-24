import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { themeColors } from "@/utils/colors";

const policies = [
  {
    id: "1",
    name: "Health Policy",
    status: "Active",
    premium: "$500",
    type: "Individual",
    validity: "1 Year",
  },
  {
    id: "2",
    name: "Automobile Policy",
    status: "Expired",
    premium: "$300",
    type: "Vehicle",
    validity: "2 Years",
  },
  {
    id: "3",
    name: "Life Insurance",
    status: "Active",
    premium: "$1000",
    type: "Family",
    validity: "10 Years",
  },
  {
    id: "4",
    name: "Home Insurance",
    status: "Active",
    premium: "$800",
    type: "Property",
    validity: "5 Years",
  },
  {
    id: "5",
    name: "Travel Insurance",
    status: "Expired",
    premium: "$200",
    type: "Travel",
    validity: "6 Months",
  },
];

const Policy = () => {
  const { background, primary, secondary } = themeColors;

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: background }}
    >
      {/* Header */}

      <FlatList
        data={policies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 1 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "#fff",
              padding: 10,
              marginVertical: 5,
              borderRadius: 15,
              borderColor: primary,
              borderWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
                justifyContent: "center",
                backgroundColor: secondary,
                borderRadius: 8,
                paddingVertical: 8,
                elevation: 1,
              }}
            >
              <MaterialCommunityIcons
                name="file-document"
                size={20}
                color="#0051BA"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: "bold",
                  color: "#0051BA",
                }}
              >
                {item.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={
                    item.status === "Active"
                      ? "checkbox-marked-circle-outline"
                      : "close-circle-outline"
                  }
                  size={20}
                  color={item.status === "Active" ? "green" : "red"}
                />
              </View>
              <Text style={{ color: "#000" }}>Status: {item.status}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="dollar" size={20} color="#000" />
              </View>
              <Text style={{ color: "#000" }}>Premium: {item.premium}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="category" size={20} color="#000" />
              </View>
              <Text style={{ color: "#000" }}>Type: {item.type}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="timer" size={20} color="#000" />
              </View>
              <Text style={{ color: "#000" }}>Validity: {item.validity}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Policy;
