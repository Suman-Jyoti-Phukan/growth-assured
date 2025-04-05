import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F5FA", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/avatar.png")}
        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
      />

      {/* Name and Email */}
      <Text
        style={{
          fontSize: responsiveFontSize(2.5),
          fontWeight: "700",
          color: "#000",
          marginBottom: 3,
        }}
      >
        John Doe
      </Text>
      <Text
        style={{
          fontSize: responsiveFontSize(2),
          color: "#555",
          marginBottom: 30,
        }}
      >
        john.doe@example.com
      </Text>

      {/* Edit Button */}
      {/* <TouchableOpacity style={{ backgroundColor: '#3A88E9', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 }}>
                <Text style={{ fontSize: responsiveFontSize(2), color: '#FFF', fontWeight: '600' }}>Edit Profile</Text>
            </TouchableOpacity> */}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
});
