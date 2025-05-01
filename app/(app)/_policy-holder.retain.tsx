import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import * as ImagePicker from "expo-image-picker";

const COLORS = {
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

const { width } = Dimensions.get("window");

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

interface DocumentUpload {
  uri: string;
  name: string;
  type: string;
}

const FormField = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder = "",
  isDropdown = false,
  onPress,
  required = false,
}: {
  label: string;
  iconName: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  isDropdown?: boolean;
  onPress?: () => void;
  required?: boolean;
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>
      {label} {required && <Text style={{ color: COLORS.error }}>*</Text>}
    </Text>
    <View style={styles.inputWrapper}>
      <View style={styles.iconContainer}>
        <FontAwesome name={iconName} size={16} color={COLORS.primary} />
      </View>

      {isDropdown ? (
        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={value ? styles.inputText : styles.placeholderText}>
            {value || placeholder}
          </Text>
          <FontAwesome name="chevron-down" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor={COLORS.lightText}
        />
      )}
    </View>
  </View>
);

const SelectionModal = ({
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
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.optionsList}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
              <FontAwesome
                name="chevron-right"
                size={14}
                color={COLORS.lightText}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  </Modal>
);

export default function PolicyHolderScreen() {
  const [currentPhase, setCurrentPhase] = useState(0);

  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof policySubcategories | ""
  >("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  console.log(formValues);

  console.log(selectedCategory);

  console.log(selectedSubcategory);

  const [documentImages, setDocumentImages] = useState<
    Record<string, DocumentUpload | null>
  >({});

  const [documentVerification, setDocumentVerification] = useState<
    Record<string, boolean>
  >({});

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);

  const [imagePreviewModal, setImagePreviewModal] = useState(false);

  const [currentPreviewImage, setCurrentPreviewImage] =
    useState<DocumentUpload | null>(null);

  const [currentPreviewName, setCurrentPreviewName] = useState("");

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const availableSubcategories = selectedCategory
    ? policySubcategories[
        selectedCategory as keyof typeof policySubcategories
      ] || []
    : [];

  const isPolicyInfoComplete = () => {
    return selectedCategory !== "" && selectedSubcategory !== "";
  };

  const requiredPersonalFields = [
    "Name",
    "DOB",
    "Mob No",
    "E-Mail Id",
    "Father's Name",
    "Mother's Name",
    "Address as per Proof",
  ];

  const isPersonalDetailsComplete = () => {
    return requiredPersonalFields.every(
      (field) => formValues[field] && formValues[field].trim() !== ""
    );
  };

  const areAllDocumentsUploaded = () => {
    return Object.keys(documentIcons).every(
      (doc) => documentImages[doc] !== undefined
    );
  };

  const updateFormValue = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const pickImage = async (documentName: string) => {
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
        aspect: [4, 3],
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

        setDocumentVerification((prev) => ({
          ...prev,
          [documentName]: false,
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an error selecting the image. Please try again."
      );
    }
  };

  const verifyDocument = (documentName: string) => {
    setTimeout(() => {
      setDocumentVerification((prev) => ({
        ...prev,
        [documentName]: true,
      }));

      Alert.alert(
        "Document Verified",
        `${documentName} has been successfully verified.`,
        [{ text: "OK", onPress: () => setImagePreviewModal(false) }]
      );
    }, 1500);
  };

  const previewDocument = (documentName: string) => {
    const document = documentImages[documentName];
    if (document) {
      setCurrentPreviewImage(document);
      setCurrentPreviewName(documentName);
      setImagePreviewModal(true);
    }
  };

  const handleNextPhase = () => {
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

  const handlePreviousPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const handleReview = () => {
    if (!areAllDocumentsUploaded()) {
      Alert.alert("Missing Documents", "Please upload all required documents.");
      return;
    }
    setReviewModalVisible(true);
  };

  const handleSubmit = () => {
    setReviewModalVisible(false);
    Alert.alert(
      "Success",
      "Your application has been submitted successfully. You will receive a confirmation email shortly.",
      [{ text: "OK" }]
    );
  };

  const ImagePreviewModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={imagePreviewModal}
      onRequestClose={() => setImagePreviewModal(false)}
    >
      <View style={styles.previewModalOverlay}>
        <View style={styles.previewModalContainer}>
          <View style={styles.previewModalHeader}>
            <Text style={styles.previewModalTitle}>{currentPreviewName}</Text>
            <TouchableOpacity
              onPress={() => setImagePreviewModal(false)}
              style={styles.closeButton}
            >
              <FontAwesome name="times" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {currentPreviewImage && (
            <View style={styles.previewImageContainer}>
              <Image
                source={{ uri: currentPreviewImage.uri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            </View>
          )}

          <View style={styles.previewModalActions}>
            <TouchableOpacity
              style={[
                styles.previewModalButton,
                { backgroundColor: COLORS.secondary },
              ]}
              onPress={() => {
                if (currentPreviewName) {
                  pickImage(currentPreviewName);
                }
              }}
            >
              <FontAwesome
                name="refresh"
                size={16}
                color={COLORS.primary}
                style={styles.buttonIcon}
              />
              <Text
                style={[
                  styles.previewModalButtonText,
                  { color: COLORS.primary },
                ]}
              >
                Replace
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.previewModalButton,
                {
                  backgroundColor: documentVerification[currentPreviewName]
                    ? COLORS.success
                    : COLORS.primary,
                },
              ]}
              onPress={() => {
                if (
                  currentPreviewName &&
                  !documentVerification[currentPreviewName]
                ) {
                  verifyDocument(currentPreviewName);
                }
              }}
              disabled={documentVerification[currentPreviewName]}
            >
              <FontAwesome
                name={
                  documentVerification[currentPreviewName] ? "check" : "shield"
                }
                size={16}
                color="#FFF"
                style={styles.buttonIcon}
              />
              <Text style={styles.previewModalButtonText}>
                {documentVerification[currentPreviewName]
                  ? "Verified"
                  : "Verify"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ReviewModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={reviewModalVisible}
      onRequestClose={() => setReviewModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: "90%" }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Review Your Application</Text>
            <TouchableOpacity
              onPress={() => setReviewModalVisible(false)}
              style={styles.closeButton}
            >
              <FontAwesome name="times" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.reviewContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>Policy Information</Text>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewItemLabel}>Category:</Text>
                <Text style={styles.reviewItemValue}>{selectedCategory}</Text>
              </View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewItemLabel}>Subcategory:</Text>
                <Text style={styles.reviewItemValue}>
                  {selectedSubcategory}
                </Text>
              </View>
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>Personal Details</Text>
              {Object.keys(formValues).map((key, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewItemLabel}>{key}:</Text>
                  <Text style={styles.reviewItemValue}>
                    {formValues[key] || "Not provided"}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>Documents</Text>
              {Object.keys(documentIcons).map((doc, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewItemLabel}>{doc}:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.reviewItemValue}>
                      {documentImages[doc] ? "Uploaded" : "Missing"}
                    </Text>
                    {documentImages[doc] && (
                      <View
                        style={{
                          marginLeft: 10,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name={
                            documentVerification[doc]
                              ? "check-circle"
                              : "circle-o"
                          }
                          size={14}
                          color={
                            documentVerification[doc]
                              ? COLORS.success
                              : COLORS.lightText
                          }
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            color: documentVerification[doc]
                              ? COLORS.success
                              : COLORS.lightText,
                            fontSize: responsiveFontSize(1.6),
                          }}
                        >
                          {documentVerification[doc]
                            ? "Verified"
                            : "Unverified"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.reviewDisclaimer}>
              <FontAwesome
                name="info-circle"
                size={16}
                color={COLORS.lightText}
              />
              <Text style={styles.reviewDisclaimerText}>
                By submitting this application, you confirm that all information
                provided is accurate and complete.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.reviewActions}>
            <TouchableOpacity
              style={[
                styles.reviewActionButton,
                { backgroundColor: COLORS.secondary },
              ]}
              onPress={() => setReviewModalVisible(false)}
            >
              <Text
                style={[
                  styles.reviewActionButtonText,
                  { color: COLORS.primary },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reviewActionButton,
                { backgroundColor: COLORS.primary },
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.reviewActionButtonText}>
                Confirm & Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const PolicyInformationPhase = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Policy Information</Text>

      <FormField
        label="Policy Category"
        iconName="list"
        value={selectedCategory}
        placeholder="Select Policy Category"
        isDropdown={true}
        onPress={() => setCategoryModalVisible(true)}
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
            setSubcategoryModalVisible(true);
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

  const PersonalDetailsPhase = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Personal Details</Text>

      {Object.keys(icons).map((item) => (
        <FormField
          key={item}
          label={item}
          iconName={icons[item as keyof typeof icons]}
          value={formValues[item] || ""}
          onChangeText={(text) => updateFormValue(item, text)}
          required={requiredPersonalFields.includes(item)}
        />
      ))}
    </View>
  );

  const DocumentsPhase = () => (
    <View style={styles.documentsSection}>
      <Text style={styles.documentsSectionTitle}>Required Documents</Text>
      <Text style={styles.documentsSectionSubtitle}>
        All documents must be uploaded before submission
      </Text>

      {Object.keys(documentIcons).map((doc, index) => (
        <View key={index} style={styles.documentItem}>
          <View style={styles.documentIconContainer}>
            <FontAwesome
              name={documentIcons[doc as keyof typeof documentIcons]}
              size={16}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.documentInfoContainer}>
            <Text style={styles.documentText}>{doc}</Text>
            {documentImages[doc] && (
              <View style={styles.documentStatusContainer}>
                <FontAwesome
                  name={documentVerification[doc] ? "check-circle" : "clock-o"}
                  size={12}
                  color={
                    documentVerification[doc]
                      ? COLORS.success
                      : COLORS.lightText
                  }
                />
                <Text
                  style={[
                    styles.documentStatusText,
                    {
                      color: documentVerification[doc]
                        ? COLORS.success
                        : COLORS.lightText,
                    },
                  ]}
                >
                  {documentVerification[doc]
                    ? "Verified"
                    : "Pending verification"}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.documentActions}>
            {documentImages[doc] ? (
              <>
                <TouchableOpacity
                  style={styles.documentActionButton}
                  onPress={() => previewDocument(doc)}
                >
                  <FontAwesome name="eye" size={16} color={COLORS.primary} />
                </TouchableOpacity>
                <View style={styles.documentActionDivider} />
                <TouchableOpacity
                  style={styles.documentActionButton}
                  onPress={() => pickImage(doc)}
                >
                  <FontAwesome
                    name="refresh"
                    size={16}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.documentUploadButton}
                onPress={() => pickImage(doc)}
              >
                <FontAwesome name="upload" size={14} color={COLORS.primary} />
                <Text style={styles.documentUploadText}>Upload</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <View style={styles.documentsHelp}>
        <FontAwesome name="info-circle" size={14} color={COLORS.lightText} />
        <Text style={styles.documentsHelpText}>
          All documents must be clearly visible and in JPG, PNG or PDF format
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.phaseIndicatorContainer}>
        {["Policy", "Details", "Documents"].map((phase, index) => (
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {currentPhase === 0 && <PolicyInformationPhase />}
        {currentPhase === 1 && <PersonalDetailsPhase />}
        {currentPhase === 2 && <DocumentsPhase />}
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
          disabled={
            (currentPhase === 0 && !isPolicyInfoComplete()) ||
            (currentPhase === 1 && !isPersonalDetailsComplete())
          }
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
        onSelect={(option) =>
          setSelectedCategory(option as keyof typeof policySubcategories)
        }
      />

      <SelectionModal
        visible={subcategoryModalVisible}
        onClose={() => setSubcategoryModalVisible(false)}
        title="Select Policy Subcategory"
        options={availableSubcategories}
        onSelect={setSelectedSubcategory}
      />

      <ImagePreviewModal />
      <ReviewModal />
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  },
  contentContainer: {
    paddingBottom: 30,
  },

  // Phase indicator styles
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
    backgroundColor: COLORS.primary,
  },
  phaseIndicatorText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(1.8),
    color: "#FFFFFF",
  },
  phaseConnector: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
  },
  phaseTitleText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  navigationButtons: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navigationButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  navigationButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: responsiveFontSize(1.8),
    marginHorizontal: 8,
  },

  // Form section styles
  formSection: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.inputBg,
    overflow: "hidden",
  },
  iconContainer: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  textInput: {
    flex: 1,
    height: 50,
    color: COLORS.text,
    fontSize: responsiveFontSize(1.8),
    paddingRight: 12,
  },
  dropdownInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingRight: 12,
  },
  inputText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.text,
  },
  placeholderText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.lightText,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
  },
  closeButton: {
    padding: 5,
  },
  optionsList: {
    maxHeight: 350,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.text,
  },

  // Documents section styles
  documentsSection: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  documentsSectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  documentsSectionSubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.lightText,
    marginBottom: 20,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 12,
    padding: 15,
  },
  documentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  documentText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.text,
    fontWeight: "500",
  },
  documentStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  documentStatusText: {
    marginLeft: 5,
    fontSize: responsiveFontSize(1.4),
  },
  documentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentActionButton: {
    padding: 8,
  },
  documentActionDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginHorizontal: 5,
  },
  documentUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  documentUploadText: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
  },
  documentsHelp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  documentsHelpText: {
    color: COLORS.lightText,
    fontSize: responsiveFontSize(1.5),
    marginLeft: 5,
  },

  // Preview modal styles
  previewModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewModalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    width: width * 0.9,
    maxHeight: "80%",
    overflow: "hidden",
  },
  previewModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  previewModalTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: COLORS.text,
  },
  previewImageContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewModalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  previewModalButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  previewModalButtonText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(1.7),
    color: "#FFFFFF",
  },
  buttonIcon: {
    marginRight: 8,
  },

  // Review styles
  reviewContent: {
    padding: 20,
  },
  reviewSection: {
    marginBottom: 20,
  },
  reviewSectionTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewItemLabel: {
    fontSize: responsiveFontSize(1.7),
    color: COLORS.lightText,
    flex: 1,
  },
  reviewItemValue: {
    fontSize: responsiveFontSize(1.7),
    color: COLORS.text,
    fontWeight: "500",
    flex: 1.5,
    textAlign: "right",
  },
  reviewDisclaimer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    alignItems: "flex-start",
  },
  reviewDisclaimerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: responsiveFontSize(1.5),
    color: COLORS.lightText,
  },
  reviewActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  reviewActionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  reviewActionButtonText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(1.8),
    color: "#FFFFFF",
  },
});
