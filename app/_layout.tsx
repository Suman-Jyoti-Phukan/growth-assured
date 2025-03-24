import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

import CustomDrawerContent from "@/components/custom-drawer-content";

import { Ionicons } from "@expo/vector-icons";

import { themeColors } from "@/utils/colors";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: "front",
          drawerStyle: {
            width: 250,
            backgroundColor: themeColors.sidebarBackground,
          },
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerActiveBackgroundColor: themeColors.primary,
          drawerInactiveBackgroundColor: "white",
          drawerItemStyle: {
            height: 50,
            marginVertical: 2,
            borderRadius: 5,
            justifyContent: "center",
          },
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
            title: "Daily Report",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="fprequirement"
          options={{
            title: "FP Requirement",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="policy-holder"
          options={{
            title: "Policy Holder",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
