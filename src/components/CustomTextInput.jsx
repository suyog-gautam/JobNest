import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR, TEXT_COLOR } from "../utils/colors";
import CustomText from "../utils/CustomText";

const CustomTextInput = ({
  title,
  placeholder,
  type,
  value,
  error,
  onChangeText,
  multiline,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    type === "password" ? true : false
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const errorStyle = error ? { borderColor: "red", borderWidth: 1.2 } : {};
  const errorTitle = error ? { color: "red" } : {};

  return (
    <View style={[styles.inputContainer, errorStyle]}>
      <CustomText style={[styles.inputTitle, errorTitle]}>{title}</CustomText>
      <TextInput
        style={[styles.inputText, { flexGrow: 1 }]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
      />
      {type === "password" && value && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.showButton}>
          <Text style={styles.showButtonText}>
            {secureTextEntry ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: verticalScale(40),
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: moderateVerticalScale(9),
    marginBottom: moderateVerticalScale(9),
    borderRadius: scale(10),
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(12),

    borderColor: TEXT_COLOR,
  },
  inputTitle: {
    color: TEXT_COLOR,
    position: "absolute",
    top: -moderateVerticalScale(9),
    left: moderateScale(13),
    backgroundColor: BG_COLOR,
    paddingHorizontal: moderateScale(5),
    fontSize: moderateScale(13),
  },
  inputText: {
    flex: 1,
    textAlign: "left",
    marginRight: moderateScale(15),
    marginLeft: moderateScale(5),
    fontSize: moderateScale(13),
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
  },
  showButton: {
    paddingLeft: moderateScale(10),
  },
  showButtonText: {
    fontSize: moderateScale(12),
    color: "#007AFF",
  },
});

export default CustomTextInput;
