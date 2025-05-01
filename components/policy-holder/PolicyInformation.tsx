import { Alert, StyleSheet, Text, View } from "react-native";

import { FormField } from "./FormField";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { COLORS } from "./colors";

interface PolicyInformationPhaseProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onOpenCategoryModal: () => void;
  onOpenSubcategoryModal: () => void;
}

export const PolicyInformationPhase: React.FC<PolicyInformationPhaseProps> = ({
  selectedCategory,
  selectedSubcategory,
  onOpenCategoryModal,
  onOpenSubcategoryModal,
}) => (
  <View style={policyInfoStyles.formSection}>
    <Text style={policyInfoStyles.sectionTitle}>Policy Information</Text>
    <FormField
      label="Policy Category"
      iconName="list"
      value={selectedCategory}
      placeholder="Select Policy Category"
      isDropdown={true}
      onPress={onOpenCategoryModal}
      required={true}
    />
    <FormField
      label="Policy Subcategory"
      iconName="tags"
      value={selectedSubcategory}
      placeholder={
        selectedCategory ? "Select Subcategory" : "Select Category First"
      }
      isDropdown={true}
      onPress={() => {
        if (selectedCategory) {
          onOpenSubcategoryModal();
        } else {
          Alert.alert(
            "Policy Category Required",
            "Please select a policy category first"
          );
        }
      }}
      required={true}
    />
  </View>
);

const policyInfoStyles = StyleSheet.create({
  formSection: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 20 },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 15,
  },
});
