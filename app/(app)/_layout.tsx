import { Redirect } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

import { Ionicons } from "@expo/vector-icons";

import { themeColors } from "@/utils/colors";

import CustomDrawerContent from "@/components/custom-drawer-content";

import { TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { useAuth } from "@/context/AuthContext";

import SkeletonLoader from "@/components/skeleton-loader";

import { userTypeWithId } from "@/utils/userType";

// !!! Read before proceeding. The expo router by default adds all the file located in the folder and it is hard to conditionally render complex system like hierarchy system. Some issues are if we placed the all the groups item inside of the (app), we will not the get the stack as we are conditionally rendering everything and if we create another route app/heirarchy, it become pretty complex to render the stack as the app router drawer will only render the (app)/heirarchy stack as a main item, then we can follow the stack navigation. So, we are a work around , we have two different identical pages first we render in on the drawer item then we follow the stack using (hierarchy), so we have to make chances on both of them to work it perfectly. Solution for fixing it -> Add a app/hierarchy route and paste the content of the (hierarchy) and do the conditional rendering.

export default function AppLayout() {
  const { isAuthenticated, isLoading, userData } = useAuth();

  const router = useRouter();

  const getUserRouteById = () => {
    if (userData?.employee) {
      return (
        userTypeWithId[
          userData?.employee.type as unknown as keyof typeof userTypeWithId
        ]?.route || "unknown-user-type"
      );
    }
    return null;
  };

  const userRoute = getUserRouteById();

  const shouldRenderTabItem = (drawerName: string) => {
    return userRoute === drawerName;
  };

  const showSaleManager = shouldRenderTabItem("sale-manager");

  const showBranchManager = shouldRenderTabItem("branch-manager");

  const showAreaSaleManager = shouldRenderTabItem("area-sales-manager");

  const showFinancialPlanner = shouldRenderTabItem("financial-planner");

  const showRegionalPlanner = shouldRenderTabItem("regional-manager");

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
            marginVertical: 4,
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
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="testmodule"
          options={{
            headerShown: false,
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
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="terms-and-condition"
          options={{
            drawerLabel: "Terms & Conditions",
            title: "Terms & Conditions",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="about-us"
          options={{
            drawerLabel: "About Us",
            title: "About Us",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="information-circle-outline"
                color={color}
                size={size}
              />
            ),
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
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
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
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
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="client-list"
          options={{
            drawerLabel: "Client List",
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
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
            drawerItemStyle: {
              display: undefined,
              marginVertical: 5,
              borderRadius: 2,
            },
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
            title: "FP Requirement",
            drawerLabel: "Hidden",
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
          name="branch-manager"
          options={{
            title: "Branch Manager",
            drawerLabel: showBranchManager ? "Branch Manager" : "Hidden",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="filter" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: showBranchManager ? undefined : "none",
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="sale-manager"
          options={{
            title: "Sale Manager",
            drawerLabel: showSaleManager ? "Sale Manager" : "Hidden",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="filter" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: showSaleManager ? undefined : "none",
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="financial-planner"
          options={{
            title: "Financial Planner",
            drawerLabel: showFinancialPlanner ? "Financial Planner" : "Hidden",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="filter" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: showFinancialPlanner ? undefined : "none",
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="regional-manager"
          options={{
            title: "Regional Manager",
            drawerLabel: showRegionalPlanner ? "Regional Manager" : "Hidden",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="filter" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: showRegionalPlanner ? undefined : "none",
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="area-sales-manager"
          options={{
            title: "Area Sales Manager",
            drawerLabel: showAreaSaleManager ? "Area Sales Manager" : "Hidden",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="filter" color={color} size={size} />
            ),
            drawerItemStyle: {
              display: showAreaSaleManager ? undefined : "none",
              borderRadius: 2,
            },
          }}
        />

        <Drawer.Screen
          name="login-report"
          options={{
            title: "Login Report",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="dsr-report"
          options={{
            title: "Daily Sales Report",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="[employee-details]"
          options={{
            title: "Employee Details",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="commision-history"
          options={{
            title: "Employee Details",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="(hierarchy)"
          options={{
            title: "Hierachy",
            drawerLabel: "Hidden",
            drawerItemStyle: { display: "none" },
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
