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
  Phone: "phone",
  Remark: "comment",
  Occupation: "briefcase",
};

const DailyReportScreen = () => {
  const { width } = Dimensions.get("window");

  const { background, primary, secondary } = themeColors;

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

        <TouchableOpacity
          onPress={() => alert("Report Submitted")}
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

export default DailyReportScreen;
