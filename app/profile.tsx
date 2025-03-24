import { View, Text, Image } from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F5FA", alignItems: "center" }}>
      {/* Header */}

      {/* Profile Image */}
      <Image
        source={require("../assets/images/avatar.png")}
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
    </View>
  );
};

export default Profile;
