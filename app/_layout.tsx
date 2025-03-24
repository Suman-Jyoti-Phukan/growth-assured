import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

import { View, Text, StyleSheet, Image } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/images/avatar.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Suman Pajji</Text>
        <Text style={styles.profileEmail}>App Developer</Text>
      </View>
      <View style={styles.separator} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            width: 230,
          },
          drawerActiveTintColor: "blue",
          drawerInactiveTintColor: "gray",
          drawerActiveBackgroundColor: "#e6f2ff",
          drawerInactiveBackgroundColor: "transparent",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Dashboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="policy"
          options={{
            drawerLabel: "Policy",
            title: "Policy",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="wallet"
          options={{
            drawerLabel: "Wallet",
            title: "Wallet",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="wallet" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="daily-report"
          options={{
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="fprequirement"
          options={{
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="policy-holder"
          options={{
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
