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
          // source={require("../assets/images/avatar.png")}
          source={{
            uri: "https://pyxis.nymag.com/v1/imgs/921/a6c/02701db80f6372550a9bb07317d1987cd2-season-1.rhorizontal.w700.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Knight Jammie Lannister</Text>
        <Text style={styles.profileEmail}>King Slayer</Text>
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
