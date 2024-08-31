import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../utils/CustomText";
import { BG_COLOR, TEXT_COLOR } from "../utils/colors";
import { moderateScale } from "react-native-size-matters";
import CustomSolidBtn from "./CustomSolidBtn";
const NoLogin = ({ heading, description }) => {
  return (
    <View style={styles.comtainer}>
      <CustomText style={styles.heading}>
        {heading ? heading : null}{" "}
      </CustomText>
      <CustomText style={styles.description}>
        {description ? description : null}{" "}
      </CustomText>
      <CustomSolidBtn title={"Login"} />
      <View style={styles.signupView}>
        <CustomText style={styles.signupText}>
          Don't have an account?
        </CustomText>
        <CustomText style={styles.crtTxt}>Create Account</CustomText>
      </View>
    </View>
  );
};

export default NoLogin;
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroudColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    fontFamily: "Poppins_700Bold",
    width: "90%",
    marginTop: moderateScale(90),
    color: TEXT_COLOR,
    textAlign: "center",
    alignSelf: "center",
  },
  description: {
    fontSize: moderateScale(14),
    width: "90%",
    color: TEXT_COLOR,
    alignSelf: "center",
    textAlign: "center",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(15),
  },
  signupView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScale(20),
  },
  signupText: {
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
    fontSize: 16,
  },
  crtTxt: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: TEXT_COLOR,
    marginLeft: 5,
  },
});
