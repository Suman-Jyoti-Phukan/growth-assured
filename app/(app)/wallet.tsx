import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { themeColors } from "@/utils/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { responsiveFontSize } from "react-native-responsive-dimensions";

const withdrawals = [
  { id: "1", amount: "₹100", date: "2025-01-10", status: "Completed" },
  { id: "2", amount: "₹50", date: "2025-01-15", status: "Pending" },
  { id: "3", amount: "₹200", date: "2025-01-20", status: "Completed" },
];

const Wallet = () => {
  const { background, primary } = themeColors;

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: background,
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          color: "#000",
          fontSize: responsiveFontSize(2.1),
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Balance: ₹500
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: primary,
          paddingHorizontal: 15,
          paddingVertical: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons name="wallet" size={18} color="#FFF" />
        <Text
          style={{
            color: "#fff",
            fontSize: responsiveFontSize(2),
            marginLeft: 5,
          }}
        >
          Withdraw
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: responsiveFontSize(2.7),
          fontWeight: "bold",
          color: "#0051BA",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Withdrawal History
      </Text>

      <FlatList
        data={withdrawals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          marginTop: 5,
          paddingBottom: 10,
          paddingHorizontal: 1,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 15,
              marginVertical: 5,
              borderRadius: 10,
              borderColor: primary,
              borderWidth: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <View
                  style={{
                    width: 27,
                    height: 27,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    backgroundColor: primary,
                    borderRadius: 60,
                  }}
                >
                  <FontAwesome name="money" size={13} color="#fff" />
                </View>

                <Text
                  style={{
                    color: "#000",
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: "600",
                  }}
                >
                  Amount: {item.amount}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <View
                  style={{
                    width: 27,
                    height: 27,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    backgroundColor: primary,
                    borderRadius: 60,
                  }}
                >
                  <MaterialIcons name="date-range" size={20} color="#fff" />
                </View>

                <Text
                  style={{
                    color: "#000",
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: "600",
                  }}
                >
                  Date: {item.date}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 27,
                    height: 27,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    backgroundColor: primary,
                    borderRadius: 60,
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      item.status === "Completed"
                        ? "check-circle-outline"
                        : "clock-outline"
                    }
                    size={20}
                    color={item.status === "Completed" ? "#ace090" : "#fff"}
                  />
                </View>

                <Text
                  style={{
                    color: "#000",
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: "600",
                  }}
                >
                  Status: {item.status}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Wallet;
