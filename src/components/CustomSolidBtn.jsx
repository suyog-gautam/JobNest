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

const CustomSolidBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.solidBtn} onPress={onPress}>
      <CustomText style={styles.btnText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomSolidBtn;
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
