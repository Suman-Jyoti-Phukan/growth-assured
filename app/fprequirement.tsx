import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  KeyboardTypeOptions,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { themeColors } from "../utils/colors";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const FPRequirementScreen = () => {
  const { background, primary, secondary } = themeColors;

  return (
    <View
      style={{ flex: 1, backgroundColor: background, paddingHorizontal: 8 }}
    >
      <StatusBar
        animated={true}
        backgroundColor={background}
        barStyle="dark-content"
      />

      <ScrollView style={{ flex: 1, paddingHorizontal: 0, paddingBottom: 20 }}>
        {renderInput("Branch Name", "business-outline")}
        {renderInput("Reporting Manager Name", "person-outline")}
        {renderInput("FP Name", "person-outline")}
        {renderInput("FP DOB", "calendar-outline", "numeric")}
        {renderInput("Nominee Name", "person-add-outline")}
        {renderInput("Relation With Nominee", "people-outline")}
        {renderInput("Email ID", "mail-outline", "email-address")}
        {renderInput("Mobile No", "call-outline", "numeric")}
        {renderInput("Alternate Mobile No", "call-outline", "numeric")}
        {renderInput("Bank Name", "wallet-outline")}
        {renderInput("Account No", "card-outline", "numeric")}
        {renderInput("Re Confirm AC No", "card-outline", "numeric")}
        {renderInput("IFSC Code", "location-outline")}

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

const renderInput = (
  placeholder: string,
  iconName: string,
  keyboardType = "default"
) => {
  return (
    <View style={{ marginBottom: 10, marginTop: 7 }}>
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
            backgroundColor: themeColors.secondary,
            borderRadius: 7,
            marginRight: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            name={iconName}
            size={15}
            color={themeColors.primary}
            style={{}}
          />
        </View>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            fontWeight: "bold",
            color: themeColors.primary,
          }}
        >
          {placeholder}
        </Text>
      </View>

      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType as KeyboardTypeOptions}
        style={{
          flex: 1,
          paddingVertical: 12,
          marginTop: 5,
          paddingHorizontal: 10,
          borderColor: themeColors.primary,
          borderWidth: 1,
          borderRadius: 12,
          color: "#000",
          fontWeight: "600",
        }}
        cursorColor={"#000"}
      />
    </View>
  );
};

export default FPRequirementScreen;
