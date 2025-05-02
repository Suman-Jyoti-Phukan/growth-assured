import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

interface FormFieldProps {
  label: string;
  iconName: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  isDropdown?: boolean;
  onPress?: () => void;
  required?: boolean;
  isKeyboardTypeNumberic?: boolean;
}

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { COLORS } from "./colors";

export const FormField: React.FC<FormFieldProps> = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder = "",
  isDropdown = false,
  onPress,
  required = false,
  isKeyboardTypeNumberic = false,
}) => (
  <View style={formFieldStyles.fieldContainer}>
    <Text style={formFieldStyles.fieldLabel}>
      {label} {required && <Text style={{ color: COLORS.error }}>*</Text>}
    </Text>
    <View style={formFieldStyles.inputWrapper}>
      <View style={formFieldStyles.iconContainer}>
        <FontAwesome name={iconName} size={16} color={COLORS.primary} />
      </View>
      {isDropdown ? (
        <TouchableOpacity
          style={formFieldStyles.dropdownInput}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text
            style={
              value
                ? formFieldStyles.inputText
                : formFieldStyles.placeholderText
            }
          >
            {value || placeholder}
          </Text>
          <FontAwesome name="chevron-down" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={formFieldStyles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor={COLORS.lightText}
          keyboardType={isKeyboardTypeNumberic ? "number-pad" : "default"}
        />
      )}
    </View>
  </View>
);

const formFieldStyles = StyleSheet.create({
  fieldContainer: { marginBottom: 16 },
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
});
