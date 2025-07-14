import { useLocalSearchParams } from "expo-router";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";

export default function EmployeeDetails() {
  const { data } = useLocalSearchParams();

  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    micrCode: "",
    ifscCode: "",
    bankName: "",
    accountNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setBankDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (
      !bankDetails.accountName ||
      !bankDetails.bankName ||
      !bankDetails.accountNumber ||
      !bankDetails.ifscCode
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Here you can add your submit logic
    Alert.alert("Success", "Bank details saved successfully!");
    console.log("Bank Details:", bankDetails);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bank Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.accountName}
            onChangeText={(value) => handleInputChange("accountName", value)}
            placeholder="Enter account holder name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.bankName}
            onChangeText={(value) => handleInputChange("bankName", value)}
            placeholder="Enter bank name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.accountNumber}
            onChangeText={(value) => handleInputChange("accountNumber", value)}
            placeholder="Enter account number"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>IFSC Code</Text>
          <TextInput
            style={styles.input}
            value={bankDetails.ifscCode}
            onChangeText={(value) =>
              handleInputChange("ifscCode", value.toUpperCase())
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
            value={bankDetails.micrCode}
            onChangeText={(value) => handleInputChange("micrCode", value)}
            placeholder="Enter MICR code"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Bank Details</Text>
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
