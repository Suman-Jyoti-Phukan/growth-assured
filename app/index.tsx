import { useCallback } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  BackHandler,
} from "react-native";

import { themeColors } from "../utils/colors";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";

import { useRouter } from "expo-router";

const clients = [
  {
    id: "1",
    name: "Sharma Traders",
    contact: "9876543210",
    location: "Delhi",
  },
  {
    id: "2",
    name: "Patel Distributors",
    contact: "9123456789",
    location: "Mumbai",
  },
  {
    id: "3",
    name: "Gupta Enterprises",
    contact: "9234567891",
    location: "Kolkata",
  },
  {
    id: "4",
    name: "Nair & Sons",
    contact: "9345678912",
    location: "Chennai",
  },
];

export default function Dashboard() {
  const { primary, background } = themeColors;

  const router = useRouter();

  const renderClient = ({
    item,
  }: {
    item: { name: string; location: string; contact: string };
  }) => (
    <View style={styles.clientCard}>
      <Text style={styles.clientName}>{item.name}</Text>
      <Text style={styles.clientDetails}>Contact: {item.contact}</Text>
      <Text style={styles.clientDetails}>Location: {item.location}</Text>
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          "Confirm Exit",
          "Are you sure you want to exit the app?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Exit",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const arr = [1, 2, 3, 3, 4];

  const map = {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
          alignSelf: "center",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            elevation: 1,
            width: 80,
            height: 80,
            borderColor: primary,
            borderWidth: 1,
            borderRadius: 100,
            marginRight: 10,
          }}
        >
          <Image
            source={require("../assets/images/avatar.png")}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              marginRight: 15,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Ser Criston Cole
          </Text>
          <Text style={{ fontSize: responsiveFontSize(1.8), color: "gray" }}>
            Knight
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/policy-holder")}
        style={{
          backgroundColor: primary,
          paddingVertical: 12,
          width: "97%",
          alignSelf: "center",
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "500",
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
          }}
        >
          Client Form
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/fprequirement")}
        style={{
          backgroundColor: primary,
          paddingVertical: 12,
          width: "97%",
          alignSelf: "center",
          borderRadius: 12,
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "500",
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
          }}
        >
          Details for FP Requirement
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/daily-report")}
        style={{
          backgroundColor: primary,
          paddingVertical: 12,
          width: "97%",
          alignSelf: "center",
          borderRadius: 12,
          marginTop: 15,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "500",
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
          }}
        >
          Daily Report
        </Text>
      </TouchableOpacity>

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={renderClient}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  clientCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#0051BA",
  },
  clientName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  clientDetails: {
    fontSize: 14,
    color: "#666",
  },
});
