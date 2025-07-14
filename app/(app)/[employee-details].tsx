import { useLocalSearchParams } from "expo-router";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

import { useAuth } from "@/context/AuthContext";

export default function EmployeeDetails() {
  const { accessToken } = useAuth();

  const [bankDetails, setBankDetails] = useState({
    name: "",
    bank_name: "",
    branch_name: "",
    acc_no: "",
    ifsc: "",
    micr: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setBankDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !bankDetails.name ||
      !bankDetails.bank_name ||
      !bankDetails.branch_name ||
      !bankDetails.acc_no ||
      !bankDetails.ifsc
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);

    setError(null);
    try {
      const response = await axios.post(
        `${ROOT_URL}/employee/wallet/bank`,
        bankDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      Alert.alert("Success", "Bank details saved successfully!");

      setBankDetails({
        name: "",
        bank_name: "",
        branch_name: "",
        acc_no: "",
        ifsc: "",
        micr: "",
      });
    } catch (error: any) {
      console.error("Error saving bank details:", error);
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Error Add Bank Details."
      );
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Error Add Bank Details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bank Details</Text>
        {error && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {error}
          </Text>
        )}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={{ marginBottom: 10 }}
          />
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Holder Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.name}
            onChangeText={(value) => handleInputChange("name", value)}
            placeholder="Enter account holder name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.bank_name}
            onChangeText={(value) => handleInputChange("bank_name", value)}
            placeholder="Enter bank name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Branch Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.branch_name}
            onChangeText={(value) => handleInputChange("branch_name", value)}
            placeholder="Enter branch name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.acc_no}
            onChangeText={(value) => handleInputChange("acc_no", value)}
            placeholder="Enter account number"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>IFSC Code</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.ifsc}
            onChangeText={(value) =>
              handleInputChange("ifsc", value.toUpperCase())
            }
            placeholder="Enter IFSC code"
            autoCapitalize="characters"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>MICR Code</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.micr}
            onChangeText={(value) => handleInputChange("micr", value)}
            placeholder="Enter MICR code"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Saving..." : "Save Bank Details"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
