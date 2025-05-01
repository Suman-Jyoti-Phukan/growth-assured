import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { StyleSheet, View, Image, Text } from "react-native";

export default function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/images/avatar.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ser Criston Cole</Text>
        <Text style={styles.profileEmail}>Knight</Text>
      </View>
      <View style={styles.separator} />
      {/* <RoleHeirarchy /> */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
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
