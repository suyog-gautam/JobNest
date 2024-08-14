import { View, StyleSheet } from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR } from "../utils/colors";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "../utils/CustomText";
const CustomTextInput = ({
  title,
  placeholder,
  type,
  value,
  error,
  onChangeText,
}) => {
  const errorStyle = error ? { borderColor: "red", borderWidth: 1.2 } : {};
  const errorTitle = error ? { color: "red" } : {};
  return (
    <View style={[styles.inputContainer, errorStyle]}>
      <CustomText style={[styles.inputTitle, errorTitle]}>{title}</CustomText>
      <TextInput
        style={[styles.inputText]}
        placeholder={placeholder}
        secureTextEntry={type === "password" ? true : false}
        value={value}
        onChangeText={onChangeText}
      ></TextInput>
    </View>
  );
};

export default CustomTextInput;
const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    height: verticalScale(40),
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: moderateVerticalScale(9),
    marginBottom: moderateVerticalScale(9),
    borderRadius: scale(10),
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(12),
    justifyContent: "center",
  },
  inputTitle: {
    alignSelf: "flex-start",
    top: -moderateVerticalScale(9),
    position: "absolute",
    marginLeft: moderateVerticalScale(25),
    backgroundColor: BG_COLOR,
    paddingLeft: moderateVerticalScale(10),
    paddingRight: moderateVerticalScale(10),
    fontSize: moderateScale(12),
  },
  inputText: {
    fontSize: scale(10.7),
    fontFamily: "Poppins_400Regular",
  },
});
