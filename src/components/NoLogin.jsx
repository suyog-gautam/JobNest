import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../utils/CustomText";
import { getColors } from "../utils/colors";
import { useTheme } from "../utils/ThemeContext";
import { moderateScale } from "react-native-size-matters";
import CustomSolidBtn from "./CustomSolidBtn";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { UseAuth } from "../utils/AuthContext";
const NoLogin = ({ heading, description }) => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
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

  const { user } = UseAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.comtainer}>
      <CustomText style={styles.heading}>
        {heading ? heading : null}{" "}
      </CustomText>
      <CustomText style={styles.description}>
        {description ? description : null}{" "}
      </CustomText>
      <CustomSolidBtn
        title={"Login"}
        onPress={() => {
          try {
            if (!user) {
              navigation.navigate("LoginForUsers");
            } else {
              // Show toast if the user is already logged in
              Toast.show({
                type: "info",
                text1: "Already Logged In",
                text2: "You are already logged in.",
                position: "top",
              });
            }
          } catch (error) {
            // Fallback toast in case of unexpected errors
            Toast.show({
              type: "error",
              text1: "Navigation Error",
              text2: "An unexpected error occurred.",
              position: "top",
            });
          }
        }}
      />
      <View style={styles.signupView}>
        <CustomText style={styles.signupText}>
          Don't have an account?
        </CustomText>
        <CustomText
          style={styles.crtTxt}
          onPress={() => {
            try {
              if (!user) {
                navigation.navigate("SignupForUsers");
              } else {
                // Show toast if the user is already logged in
                Toast.show({
                  type: "info",
                  text1: "Already Logged In",
                  text2: "You are already logged in.",
                  position: "top",
                });
              }
            } catch (error) {
              // Fallback toast in case of unexpected errors
              Toast.show({
                type: "error",
                text1: "Navigation Error",
                text2: "An unexpected error occurred.",
                position: "top",
              });
            }
          }}
        >
          Create Account
        </CustomText>
      </View>
    </View>
  );
};

export default NoLogin;
