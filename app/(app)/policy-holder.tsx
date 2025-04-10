import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { themeColors } from "@/utils/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import React, { useState } from "react";

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

const policyCategories = [
  "Automobile Insurance",
  "Health Insurance",
  "Life Insurance",
  "Home Insurance",
  "Travel Insurance",
  "Business Insurance",
];

const policySubcategories = {
  "Automobile Insurance": [
    "Automobile Type-1 (Two-Wheeler)",
    "Automobile Type-2 (Four-Wheeler)",
    "Automobile Type-3 (Commercial)",
    "Automobile Type-4 (Electric)",
  ],
  "Health Insurance": [
    "Health Type-1 (Individual)",
    "Health Type-2 (Family)",
    "Health Type-3 (Senior Citizen)",
    "Health Type-4 (Critical Illness)",
  ],
  "Life Insurance": [
    "Life Type-1 (Term)",
    "Life Type-2 (Whole Life)",
    "Life Type-3 (Endowment)",
    "Life Type-4 (ULIP)",
  ],
  "Home Insurance": [
    "Home Type-1 (Structure)",
    "Home Type-2 (Contents)",
    "Home Type-3 (Comprehensive)",
    "Home Type-4 (Landlord)",
  ],
  "Travel Insurance": [
    "Travel Type-1 (Domestic)",
    "Travel Type-2 (International)",
    "Travel Type-3 (Multi-trip)",
    "Travel Type-4 (Cruise)",
  ],
  "Business Insurance": [
    "Business Type-1 (Property)",
    "Business Type-2 (Liability)",
    "Business Type-3 (Workers Comp)",
    "Business Type-4 (Professional)",
  ],
};

const PolicyHolderScreen = () => {
  const { width } = Dimensions.get("window");

  const { primary, secondary, background } = themeColors;

  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof policySubcategories | ""
  >("");

  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);

  const availableSubcategories = selectedCategory
    ? policySubcategories[
        selectedCategory as keyof typeof policySubcategories
      ] || []
    : [];

  const CustomDropdown = ({
    label,
    iconName,
    value,
    onPress,
    placeholder,
  }: {
    label: string;
    iconName: string;
    value: string;
    onPress: () => void;
    placeholder: string;
  }) => (
    <View style={{ marginBottom: 20, marginHorizontal: 5 }}>
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
          <FontAwesome name={iconName} size={15} color={primary} />
        </View>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            fontWeight: "bold",
            color: primary,
          }}
        >
          {label}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingHorizontal: width * 0.03,
          height: 45,
          borderRadius: 10,
          backgroundColor: "#fff",
          borderColor: primary,
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            color: value ? "#000" : "#999",
          }}
        >
          {value || placeholder}
        </Text>
        <FontAwesome name="chevron-down" size={15} color={primary} />
      </TouchableOpacity>
    </View>
  );

  const DropdownModal = ({
    visible,
    onClose,
    title,
    options,
    onSelect,
  }: {
    visible: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    onSelect: (option: string) => void;
  }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        <View
          style={{
            width: width * 0.9,
            backgroundColor: "white",
            borderRadius: 12,
            paddingVertical: 20,
            paddingHorizontal: 15,
            maxHeight: width * 1.2,
          }}
        >
          <Text
            style={{
              fontSize: responsiveFontSize(2.2),
              fontWeight: "bold",
              color: primary,
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            {title}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    color: "#333",
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={{
              marginTop: 15,
              padding: 10,
              backgroundColor: secondary,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={onClose}
          >
            <Text
              style={{
                color: primary,
                fontWeight: "600",
                fontSize: responsiveFontSize(1.9),
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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

      <ScrollView style={{ flex: 1, paddingHorizontal: 0 }}>
        <CustomDropdown
          label="Policy Category"
          iconName="list"
          value={selectedCategory}
          placeholder="Select Policy Category"
          onPress={() => setCategoryModalVisible(true)}
        />

        <CustomDropdown
          label="Policy Subcategory"
          iconName="tags"
          value={selectedSubcategory}
          placeholder={
            selectedCategory ? "Select Subcategory" : "Select Category First"
          }
          onPress={() => {
            if (selectedCategory) {
              setSubcategoryModalVisible(true);
            } else {
              alert("Please select a policy category first");
            }
          }}
        />

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
                style={{
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: "500",
                  color: "#000",
                }}
              >
                {doc}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <DropdownModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        title="Select Policy Category"
        options={policyCategories}
        onSelect={(option) =>
          setSelectedCategory(option as keyof typeof policySubcategories)
        }
      />

      <DropdownModal
        visible={subcategoryModalVisible}
        onClose={() => setSubcategoryModalVisible(false)}
        title="Select Policy Subcategory"
        options={availableSubcategories}
        onSelect={setSelectedSubcategory}
      />
    </View>
  );
};

export default PolicyHolderScreen;
