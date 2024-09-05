import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { getColors } from "../utils/colors";
import { useTheme } from "../utils/ThemeContext";
import CustomText from "../utils/CustomText";

const CustomBorderBtn = ({ title, onPress }) => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const styles = StyleSheet.create({
    Btn: {
      width: "90%",
      borderWidth: 1,
      height: verticalScale(45),
      backgroundColor: BG_COLOR,
      justifyContent: "center",
      borderColor: TEXT_COLOR,
      borderRadius: moderateVerticalScale(12),
      marginTop: moderateVerticalScale(10),
      alignSelf: "center",
      marginBottom: moderateVerticalScale(50),
    },
    btnText: {
      color: TEXT_COLOR,
      fontSize: moderateScale(16),
      alignSelf: "center",
      fontWeight: "600",
    },
  });
  return (
    <TouchableOpacity style={styles.Btn} onPress={onPress}>
      <CustomText style={styles.btnText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomBorderBtn;
