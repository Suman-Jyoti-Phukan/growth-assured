import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{}}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="policy"
          options={{
            drawerLabel: "Policy",
            title: "Policy",
          }}
        />
        <Drawer.Screen
          name="wallet"
          options={{
            drawerLabel: "Wallet",
            title: "Wallet",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
