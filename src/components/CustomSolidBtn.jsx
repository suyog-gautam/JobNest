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

const CustomSolidBtn = ({ title, onPress }) => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const styles = StyleSheet.create({
    solidBtn: {
      width: "90%",
      height: verticalScale(45),
      backgroundColor: TEXT_COLOR,
      borderBlockColor: BG_COLOR,
      justifyContent: "center",
      borderRadius: moderateVerticalScale(12),
      marginTop: moderateVerticalScale(10),
      marginBottom: moderateVerticalScale(5),
      alignSelf: "center",
    },
    btnText: {
      color: BG_COLOR,
      fontSize: moderateScale(16),
      alignSelf: "center",
      fontWeight: "600",
    },
  });
  return (
    <TouchableOpacity style={styles.solidBtn} onPress={onPress}>
      <CustomText style={styles.btnText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomSolidBtn;
