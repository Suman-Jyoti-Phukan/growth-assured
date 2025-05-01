import { StyleSheet, Text, View } from "react-native";

import { FormField } from "./FormField";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { COLORS } from "./colors";

type IconMap = {
  [key: string]: string;
};

const icons: IconMap = {
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
    {Object.keys(icons).map((item) => (
      <FormField
        key={item}
        label={item}
        iconName={icons[item]}
        value={formValues[item] || ""}
        onChangeText={(text) => updateFormValue(item, text)}
        required={requiredFields.includes(item)}
      />
    ))}
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
