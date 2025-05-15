import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import axios from "axios";

const ROOT_URL =
  "https://growthassured.webinfoghy.co.in/api/employee/daily/report/submit";

// Hardcoded Bearer token (not recommended for production)
const BEARER_TOKEN = "4|2ZuuUXpr8Ob9l9zz086Ui8egNLFsxQPcwgPFluHE9d2fcd39";

const COLORS = {
  primary: "#5B67CA",
  secondary: "#F1F5FF",
  accent: "#FF8F6C",
  background: "#FFFFFF",
  text: "#333340",
  lightText: "#9A9AB0",
  border: "#E5E7EB",
  inputBg: "#F9FAFC",
  cardBg: "#FFFFFF",
};

interface FieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

const NameField: React.FC<FieldProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.fieldLabel}>Name</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter name"
          placeholderTextColor={COLORS.lightText}
          keyboardType="default"
        />
      </View>
    </View>
  );
};

const PhoneField: React.FC<FieldProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="phone" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.fieldLabel}>Phone</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter phone"
          placeholderTextColor={COLORS.lightText}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

const RemarkField: React.FC<FieldProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="comment" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.fieldLabel}>Remark</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter remark"
          placeholderTextColor={COLORS.lightText}
          keyboardType="default"
        />
      </View>
    </View>
  );
};

const OccupationField: React.FC<FieldProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="briefcase" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.fieldLabel}>Occupation</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter occupation"
          placeholderTextColor={COLORS.lightText}
          keyboardType="default"
        />
      </View>
    </View>
  );
};

export default function DailyReportScreen() {
  console.log(ROOT_URL);

  const [formValues, setFormValues] = useState<{
    name: string;
    mobile: string;
    remark: string;
    occupation: string;
  }>({
    name: "",
    mobile: "",
    remark: "",
    occupation: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.mobile.trim()) {
      Alert.alert("Validation Error", "Name and Phone are required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(ROOT_URL, formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        Alert.alert("Success", "Report submitted successfully!");
        setFormValues({ name: "", mobile: "", remark: "", occupation: "" });
      } else {
        throw new Error("Unexpected response from server");
      }

      console.log(response);
    } catch (error) {
      console.log("Server error:", error);

      let errorMessage = "Something went wrong. Please try again.";
      if ((error as any).response) {
        errorMessage =
          (error as any).response.data?.message ||
          `Server error: ${(error as any).response.status}`;
      } else if ((error as any).request) {
        errorMessage =
          "No response from server. Check your internet connection.";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          <NameField
            value={formValues.name}
            onChangeText={(text) =>
              setFormValues({ ...formValues, name: text })
            }
          />
          <PhoneField
            value={formValues.mobile}
            onChangeText={(text) =>
              setFormValues({ ...formValues, mobile: text })
            }
          />
          <RemarkField
            value={formValues.remark}
            onChangeText={(text) =>
              setFormValues({ ...formValues, remark: text })
            }
          />
          <OccupationField
            value={formValues.occupation}
            onChangeText={(text) =>
              setFormValues({ ...formValues, occupation: text })
            }
          />
        </View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color="#FFF"
              style={{ marginRight: 10 }}
            />
          ) : (
            <FontAwesome
              name="send"
              size={18}
              color="#FFF"
              style={{ marginRight: 10 }}
            />
          )}
          <Text style={styles.submitButtonText}>
            {isLoading ? "Submitting..." : "Submit Report"}
          </Text>
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
}

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
  submitButtonDisabled: {
    backgroundColor: COLORS.primary + "80", // 50% opacity when disabled
    shadowOpacity: 0.1,
    elevation: 2,
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
