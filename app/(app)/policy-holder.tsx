import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import * as ImagePicker from "expo-image-picker";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { SelectionModal } from "@/components/policy-holder/SelectionModal";

import { PolicyInformationPhase } from "@/components/policy-holder/PolicyInformation";

import { PersonalDetailsPhase } from "@/components/policy-holder/PersonalDetails";

import { DocumentsPhase } from "@/components/policy-holder/DocumentPhrase";

import { ImagePreviewModal } from "@/components/policy-holder/ImagePreviewModal";

import { ReviewModal } from "@/components/policy-holder/ReviewModal";
import axios from "axios";

type Colors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  lightText: string;
  border: string;
  error: string;
  success: string;
  inputBg: string;
  cardBg: string;
  inactive: string;
};

type IconMap = {
  [key: string]: string;
};

type PolicySubcategories = {
  [key: string]: string[];
};

const COLORS: Colors = {
  primary: "#5B67CA",
  secondary: "#F1F5FF",
  accent: "#FF8F6C",
  background: "#FFFFFF",
  text: "#333340",
  lightText: "#9A9AB0",
  border: "#E5E7EB",
  error: "#FF4D4F",
  success: "#4BB543",
  inputBg: "#F9FAFC",
  cardBg: "#FFFFFF",
  inactive: "#D1D5DB",
};

const documentIcons: IconMap = {
  Pan: "id-card",
  "Aadhar Card": "address-card",
  "Cancelled Cheque or Passbook Front Page": "bank",
  Photo: "camera",
};

const policyCategories: string[] = [
  "Automobile Insurance",
  "Health Insurance",
  "Life Insurance",
  "Home Insurance",
  "Travel Insurance",
  "Business Insurance",
];

const policySubcategories: PolicySubcategories = {
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

export interface DocumentUpload {
  uri: string;
  name: string;
  type: string;
}

export default function PolicyHolderScreen() {
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  const [formValues, setFormValues] = useState<Record<string, string>>({});

  console.log(formValues);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const [documentImages, setDocumentImages] = useState<
    Record<string, DocumentUpload | undefined>
  >({});

  const [documentVerification, setDocumentVerification] = useState<
    Record<string, boolean | undefined>
  >({});

  console.log(documentImages);

  const [categoryModalVisible, setCategoryModalVisible] =
    useState<boolean>(false);

  const [subcategoryModalVisible, setSubcategoryModalVisible] =
    useState<boolean>(false);

  const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false);

  const [currentPreviewImage, setCurrentPreviewImage] =
    useState<DocumentUpload | null>(null);

  const [currentPreviewName, setCurrentPreviewName] = useState<string>("");

  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);

  const availableSubcategories: string[] = selectedCategory
    ? policySubcategories[selectedCategory] || []
    : [];

  const requiredPersonalFields: string[] = [
    "Name",
    "DOB",
    "Phone No.",
    "E-Mail Id",
    "Father's Name",
    "Mother's Name",
    "Address as per Proof",
  ];

  const isPolicyInfoComplete = (): boolean =>
    selectedCategory !== "" && selectedSubcategory !== "";

  const isPersonalDetailsComplete = (): boolean => {
    const missingFields = requiredPersonalFields.filter(
      (field) => !formValues[field] || formValues[field].trim() === ""
    );

    if (missingFields.length > 0) {
      console.log("Missing or empty fields:", missingFields);
      return false;
    }

    return true;
  };

  console.log(isPersonalDetailsComplete(), isPolicyInfoComplete());

  const areAllDocumentsUploaded = (): boolean =>
    Object.keys(documentIcons).every((doc) => documentImages[doc]);

  const updateFormValue = (key: string, value: string): void => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async (documentName: string): Promise<void> => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to upload documents."
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const documentUpload: DocumentUpload = {
          uri: selectedImage.uri,
          name: documentName.replace(/\s+/g, "_").toLowerCase() + ".jpg",
          type: "image/jpeg",
        };

        setDocumentImages((prev) => ({
          ...prev,
          [documentName]: documentUpload,
        }));
        setDocumentVerification((prev) => ({ ...prev, [documentName]: false }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an error selecting the image. Please try again."
      );
    }
  };

  const verifyDocument = (documentName: string): void => {
    setTimeout(() => {
      setDocumentVerification((prev) => ({ ...prev, [documentName]: true }));
      Alert.alert(
        "Document Verified",
        `${documentName} has been successfully verified.`,
        [{ text: "OK", onPress: () => setImagePreviewModal(false) }]
      );
    }, 1500);
  };

  const previewDocument = (documentName: string): void => {
    const document = documentImages[documentName];
    if (document) {
      setCurrentPreviewImage(document);
      setCurrentPreviewName(documentName);
      setImagePreviewModal(true);
    }
  };

  const handleNextPhase = (): void => {
    if (currentPhase === 0 && !isPolicyInfoComplete()) {
      Alert.alert(
        "Incomplete Form",
        "Please select both policy category and subcategory."
      );
      return;
    }
    if (currentPhase === 1 && !isPersonalDetailsComplete()) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all required personal details."
      );
      return;
    }
    if (currentPhase < 2) {
      setCurrentPhase(currentPhase + 1);
    } else {
      handleReview();
    }
  };

  const handlePreviousPhase = (): void => {
    if (currentPhase > 0) setCurrentPhase(currentPhase - 1);
  };

  const handleReview = (): void => {
    if (!areAllDocumentsUploaded()) {
      Alert.alert("Missing Documents", "Please upload all required documents.");
      return;
    }
    setReviewModalVisible(true);
  };

  const createFormData = () => {
    const documentImagesMap = {
      Pan: "pan_card_image",
      "Aadhar Card": "adhaar_card_image",
      "Cancelled Cheque or Passbook Front Page": "cheque_image",
      Photo: "profile_image",
    };

    const formData = new FormData();

    formData.append("catergory_id", "2");

    formData.append("sub_category_id", "2");

    Object.entries({
      mobile: formValues["Phone No."],
      name: formValues["Name"],
      dob: formValues["DOB"],
      email: formValues["E-Mail Id"],
      id_marK: formValues["Identification mark"],
      f_name: formValues["Father's Name"],
      m_name: formValues["Mother's Name"],
      address: formValues["Address as per Proof"],
      landmark: formValues["Landmark"],
      height: formValues["Height"],
      birth_place: formValues["Place of Birth"],
      qualification: formValues["Education Qualification"],
      nominee_name: formValues["Nominee Name"],
      nominee_dob: formValues["Nominee DOB"],
      nominee_relation: formValues["Relationship"],
      work_org: formValues["Name of Organisation"],
      work_org_type: formValues["Type of Organisation"],
      designation: formValues["Designation"],
      workplace: formValues["Workplace City"],
      annual_ctc: formValues["Annual CTC/Income"],
      existing_cover: formValues["Existing Insurance Cover"],
    }).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    // Append image files
    Object.entries(documentImagesMap).forEach(([label, key]) => {
      const file = documentImages[label];
      if (file) {
        formData.append(key, {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any);
      }
    });

    return formData;
  };

  const handleSubmit = async (): Promise<void> => {
    setReviewModalVisible(false);

    try {
      const formData = createFormData();

      const response = await axios.post(
        "https://your-api-url.com/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Success",
          "Your application has been submitted successfully. You will receive a confirmation email shortly.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert(
        "Error",
        "Failed to submit your application. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.phaseIndicatorContainer}>
        {["Policy", "Details", "Documents"].map((_, index) => (
          <React.Fragment key={index}>
            <View
              style={[
                styles.phaseIndicator,
                {
                  backgroundColor:
                    currentPhase >= index ? COLORS.primary : COLORS.secondary,
                },
              ]}
            >
              <Text
                style={[
                  styles.phaseIndicatorText,
                  {
                    color:
                      currentPhase >= index
                        ? COLORS.background
                        : COLORS.lightText,
                  },
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < 2 && (
              <View
                style={[
                  styles.phaseConnector,
                  {
                    backgroundColor:
                      currentPhase > index ? COLORS.primary : COLORS.secondary,
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
      <Text style={styles.phaseTitleText}>
        {
          ["Policy Information", "Personal Details", "Required Documents"][
            currentPhase
          ]
        }
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {currentPhase === 0 && (
          <PolicyInformationPhase
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onOpenCategoryModal={() => setCategoryModalVisible(true)}
            onOpenSubcategoryModal={() => setSubcategoryModalVisible(true)}
          />
        )}
        {currentPhase === 1 && (
          <PersonalDetailsPhase
            formValues={formValues}
            updateFormValue={updateFormValue}
            requiredFields={requiredPersonalFields}
          />
        )}
        {currentPhase === 2 && (
          <DocumentsPhase
            documentImages={documentImages}
            documentVerification={documentVerification}
            pickImage={pickImage}
            previewDocument={previewDocument}
          />
        )}
      </ScrollView>
      <View style={styles.navigationButtons}>
        {currentPhase > 0 && (
          <TouchableOpacity
            style={[
              styles.navigationButton,
              { backgroundColor: COLORS.secondary },
            ]}
            onPress={handlePreviousPhase}
          >
            <FontAwesome name="arrow-left" size={16} color={COLORS.primary} />
            <Text
              style={[styles.navigationButtonText, { color: COLORS.primary }]}
            >
              Previous
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.navigationButton,
            {
              backgroundColor:
                (currentPhase === 0 && isPolicyInfoComplete()) ||
                (currentPhase === 1 && isPersonalDetailsComplete()) ||
                (currentPhase === 2 && areAllDocumentsUploaded())
                  ? COLORS.primary
                  : COLORS.inactive,
              marginLeft: currentPhase > 0 ? 10 : 0,
              flex: currentPhase > 0 ? 1 : 2,
            },
          ]}
          onPress={handleNextPhase}
          // disabled={
          //   (currentPhase === 0 && !isPolicyInfoComplete()) ||
          //   (currentPhase === 1 && !isPersonalDetailsComplete())
          // }
        >
          <Text style={styles.navigationButtonText}>
            {currentPhase < 2 ? "Next" : "Review Application"}
          </Text>
          <FontAwesome name="arrow-right" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
      <SelectionModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        title="Select Policy Category"
        options={policyCategories}
        onSelect={setSelectedCategory}
      />
      <SelectionModal
        visible={subcategoryModalVisible}
        onClose={() => setSubcategoryModalVisible(false)}
        title="Select Policy Subcategory"
        options={availableSubcategories}
        onSelect={setSelectedSubcategory}
      />
      <ImagePreviewModal
        visible={imagePreviewModal}
        onClose={() => setImagePreviewModal(false)}
        currentPreviewImage={currentPreviewImage}
        currentPreviewName={currentPreviewName}
        documentVerification={documentVerification}
        pickImage={pickImage}
        verifyDocument={verifyDocument}
      />
      <ReviewModal
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        formValues={formValues}
        documentImages={documentImages}
        documentVerification={documentVerification}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  phaseIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  phaseIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  phaseIndicatorText: { fontWeight: "600", fontSize: responsiveFontSize(1.8) },
  phaseConnector: { flex: 1, height: 3, marginHorizontal: 8 },
  phaseTitleText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  scrollView: { flex: 1 },
  contentContainer: { paddingBottom: 30 },
  navigationButtons: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navigationButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  navigationButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.8),
    marginHorizontal: 8,
  },
});
