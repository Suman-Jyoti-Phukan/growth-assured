import { themeColors } from "@/utils/colors";

import { generateAppointmentPdf } from "@/utils/pdf";

import { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Pressable,
} from "react-native";

export default function AppointmentLetter() {
  const [isLaoding, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const fileUri = await generateAppointmentPdf();
      if (fileUri) {
        Alert.alert("PDF created", `Saved at: ${fileUri}`);
      }
    } catch (error) {
      setIsError(true);
      Alert.alert("Error", "Failed to create PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 70,
            height: 70,
          }}
        />
        <Text style={styles.header}>GROWTH ASSURED</Text>
      </View>
      <Text style={styles.subHeader}>YOURS WEALTH PARTNER</Text>

      <Text style={styles.paragraph}>Dear Mr. EUSUF ALI SHEIKH,</Text>

      <Text style={styles.paragraph}>
        Welcome to Growth Assured, a total financial distribution organization
        who offers financial solutions to meet the unique needs of clients.
      </Text>

      <Text style={styles.paragraph}>
        Established in 2024 with the vision of creating a consumer financial
        distribution business. The organization is founded by executives with
        deep experience in the financial services industry.
      </Text>

      <Text style={styles.paragraph}>
        Growth Assured offers a comprehensive approach to financial planning
        that is designed to help clients achieve their financial goals. Whether
        our clients are looking for assistance with investments, insurance,
        savings, or borrowing, Growth Assured has the expertise and resources to
        provide tailored solutions that meet their specific needs.
      </Text>

      <Text style={styles.paragraph}>
        With great enthusiasm, we extend a warm welcome, and engage you as a
        champion of our Initiative. Your application has been processed, and you
        have been appointed as a{" "}
        <Text style={styles.bold}>“FINANCIAL PLANNER”</Text> with the assigned
        sourcing code number: <Text style={styles.bold}>GAFP0000527</Text>.
        Kindly use this code for all future correspondence related to our
        Distribution Products.
      </Text>

      <Text style={styles.paragraph}>
        As you initiate the submission of applications on behalf of your
        customers, let us collaborate to build a more welcoming and ethical
        world, guided by a strong code of conduct.
      </Text>

      <Text style={styles.paragraph}>
        For any further information, please contact us at:{" "}
        <Text style={styles.link}>service@growthassured.co.in</Text>
      </Text>

      <Text style={styles.paragraph}>
        We look forward to building a long-lasting and successful relationship.
      </Text>

      <Text style={styles.paragraph}>Thanks & Regards,</Text>
      <Text style={styles.paragraph}>Team Growth Assured</Text>

      <Text style={styles.footer}>
        “This is an electronically generated Letter, hence does not require a
        signature.”
      </Text>

      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Pressable
          onPress={handleDownload}
          style={{
            backgroundColor: themeColors.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            {isLaoding ? "Exporting...." : "Export to PDF"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    marginLeft: 10,
    color: themeColors.primary,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "#007AFF",
  },
  footer: {
    marginTop: 30,
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
  },
});
