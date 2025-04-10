import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { themeColors } from "@/utils/colors";

// Using the same modern color palette from previous design
const COLORS = {
  primary: "#5B67CA", // Modern purple-blue
  secondary: "#F1F5FF", // Light blue bg
  accent: "#FF8F6C", // Coral accent
  background: "#FFFFFF", // White background
  text: "#333340", // Dark text
  lightText: "#9A9AB0", // Light text
  border: "#E5E7EB", // Border color
  inputBg: "#F9FAFC", // Input background
  cardBg: "#FFFFFF", // Card background
};

// Define the icons
const icons = {
  Name: "user",
  Phone: "phone",
  Remark: "comment",
  Occupation: "briefcase",
};

const DailyReportScreen = () => {
  const { width } = Dimensions.get("window");
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const updateFormValue = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Modern form field with icon
  const FormField = ({
    label,
    iconName,
    value,
    onChangeText,
    placeholder = "",
  }: {
    label: string;
    iconName: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
  }) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name={iconName} size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor={COLORS.lightText}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
        animated={true}
      />

      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          Enter today's activity details
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formSection}>
          {Object.keys(icons).map((item) => (
            <FormField
              key={item}
              label={item}
              iconName={icons[item as keyof typeof icons]}
              value={formValues[item] || ""}
              onChangeText={(text) => updateFormValue(item, text)}
              placeholder={`Enter ${item.toLowerCase()}`}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={() => alert("Report Submitted")}
        >
          <FontAwesome
            name="send"
            size={18}
            color="#FFF"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <FontAwesome name="info-circle" size={14} color={COLORS.lightText} />
          <Text style={styles.infoText}>
            Daily reports are reviewed by the team manager within 24 hours
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.lightText,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  formSection: {
    marginVertical: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  fieldLabel: {
    fontSize: responsiveFontSize(1.9),
    color: COLORS.primary,
    fontWeight: "600",
  },
  inputWrapper: {
    borderRadius: 10,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  textInput: {
    height: 48,
    paddingHorizontal: 15,
    color: COLORS.text,
    fontSize: responsiveFontSize(1.8),
    fontWeight: "500",
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  infoText: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.lightText,
    marginLeft: 8,
  },
});

export default DailyReportScreen;
