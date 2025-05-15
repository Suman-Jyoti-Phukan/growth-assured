import { Redirect, Stack } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { themeColors } from "@/utils/colors";

import CustomDrawerContent from "@/components/custom-drawer-content";

import { TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { useAuth } from "@/context/AuthContext";

import SkeletonLoader from "@/components/skeleton-loader";

export default function AppLayout() {
  const { isAuthenticated, isLoading, userData } = useAuth();

  console.log("User Data", userData);

  const router = useRouter();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="person-circle" size={40} color="black" />
            </TouchableOpacity>
          ),
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
          name="heirarchy"
          options={{
            drawerLabel: "Heirarchy",
            title: "Area Sales Managers",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="addusergroup" color={color} size={size} />
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
          name="appointment"
          options={{
            drawerLabel: "Appointment",
            title: "Appointment",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="mail-open-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="daily-report"
          options={{
            drawerLabel: "Hidden",
            title: "Daily Report",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="fprequirement"
          options={{
            drawerLabel: "Hidden",
            title: "FP Requirement",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="employee-details"
          options={{
            drawerLabel: "Hidden",
            title: "Employee Details",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="policy-holder"
          options={{
            drawerLabel: "Hidden",
            title: "Policy Holder",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="regional-manager"
          options={{
            drawerLabel: "Regional Manager",
            drawerStatusBarAnimation: "slide",
            title: "Regional Manager",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="addusergroup" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="commision-history"
          options={{
            drawerLabel: "Commission History",
            title: "Commission History",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="addusergroup" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="transaction-history"
          options={{
            drawerLabel: "Transaction History",
            title: "Transaction History",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="addusergroup" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="test"
          options={{
            drawerLabel: "Test",
            title: "Test",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
