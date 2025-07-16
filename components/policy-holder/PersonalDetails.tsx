import { StyleSheet, Text, View } from "react-native";

import { FormField } from "./FormField";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { COLORS } from "./colors";

type IconMap = {
  [key: string]: string;
};

/** Fields are renders based on keys of this object. If you want to change the field position change the field position. */
const icons: IconMap = {
  "Phone No.": "phone",
  Name: "user",
  DOB: "calendar",
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
  "Plan Amount": "money",
};

const numbericFields = [
  "Phone No.",
  "Height",
  "Weight",
  "Annual CTC/Income",
  "Plan Amount",
];

interface PersonalDetailsPhaseProps {
  formValues: Record<string, string>;
  updateFormValue: (key: string, value: string) => void;
  requiredFields: string[];
}

export const PersonalDetailsPhase: React.FC<PersonalDetailsPhaseProps> = ({
  formValues,
  updateFormValue,
  requiredFields,
}) => (
  <View style={personalDetailsStyles.formSection}>
    <Text style={personalDetailsStyles.sectionTitle}>Personal Details</Text>
    {Object.keys(icons).map((item) => {
      const renderKeyboardTypeAsNumberic = numbericFields.includes(item);

      return (
        <FormField
          key={item}
          label={item}
          iconName={icons[item]}
          value={formValues[item] || ""}
          onChangeText={(text) => updateFormValue(item, text)}
          required={requiredFields.includes(item)}
          isKeyboardTypeNumberic={renderKeyboardTypeAsNumberic}
        />
      );
    })}
  </View>
);

const personalDetailsStyles = StyleSheet.create({
  formSection: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 20 },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 15,
  },
});
