import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { themeColors } from "../utils/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const icons = {
  Name: "user",
  DOB: "calendar",
  "Mob No": "phone",
  "E-Mail Id": "envelope",
  "Identification mark": "id-card",
  "Father's Name": "male",
  "Mother's Name": "female",
  "Address as per Proof": "home",
  Landmark: "map-marker",
  Height: "arrows-v",
  Weight: "balance-scale",
  "Place of Birth": "map",
  "Education Qualification": "graduation-cap",
  "Nominee Name": "user-plus",
  "Nominee DOB": "calendar-check-o",
  Relationship: "handshake-o",
  "Name of Organisation": "building",
  "Type of Organisation": "industry",
  Designation: "id-badge",
  "Workplace City": "city",
  "Annual CTC/Income": "money",
  "Existing Insurance Cover": "shield",
};

const documentIcons = {
  Pan: "id-card",
  "Aadhar Card": "address-card",
  "Cancelled Cheque or Passbook Front Page": "bank",
  Photo: "camera",
};

const PolicyHolderScreen = () => {
  const { width } = Dimensions.get("window");

  const { primary, secondary, background } = themeColors;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
        paddingHorizontal: 8,
        paddingVertical: 20,
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={background}
        barStyle="dark-content"
      />

      {/* Header */}

      <ScrollView style={{ flex: 1, paddingHorizontal: 0 }}>
        {Object.keys(icons).map((item, index) => (
          <View key={index} style={{ marginBottom: 20, marginHorizontal: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: width * 0.02,
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: secondary,
                  borderRadius: 9,
                  marginRight: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name={icons[item as keyof typeof icons]}
                  size={15}
                  color={primary}
                />
              </View>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: "bold",
                  color: primary,
                }}
              >
                {item}
              </Text>
            </View>
            <TextInput
              placeholder={item}
              style={{
                paddingHorizontal: width * 0.03,
                height: 45,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderColor: primary,
                borderWidth: 1,
                fontWeight: "600",
                color: "#000",
              }}
            />
          </View>
        ))}

        <View
          style={{
            backgroundColor: "#fffceb",
            borderColor: secondary,
            borderWidth: 1,
            padding: 10,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              backgroundColor: primary,
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: "600",
                color: "#fff",
                marginHorizontal: 5,
                textAlign: "center",
              }}
            >
              Documents Required
            </Text>
          </View>

          {Object.keys(documentIcons).map((doc, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                marginHorizontal: 5,
              }}
            >
              <FontAwesome
                name={documentIcons[doc as keyof typeof documentIcons]}
                size={15}
                color={primary}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: responsiveFontSize(1.8), color: primary }}
              >
                {doc}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => alert("Form Submitted")}
          style={{
            borderColor: primary,
            borderWidth: 1,
            backgroundColor: secondary,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
            marginTop: width * 0.05,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FontAwesome
            name="send"
            size={20}
            color={primary}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              color: primary,
              fontSize: responsiveFontSize(2.2),
              fontWeight: "600",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PolicyHolderScreen;
