import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR, TEXT_COLOR } from "../utils/colors";
import CustomText from "../utils/CustomText";

const CustomBorderBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.Btn} onPress={onPress}>
      <CustomText style={styles.btnText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomBorderBtn;
const styles = StyleSheet.create({
  Btn: {
    width: "90%",
    borderWidth: 1,
    height: verticalScale(45),
    backgroundColor: BG_COLOR,
    justifyContent: "center",
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
    fontFamily: "",
  },
});
