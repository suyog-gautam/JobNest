import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BG_COLOR } from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import CustomTextInput from "../../components/CustomTextInput";
import CustomSolidBtn from "../../components/CustomSolidBtn";
import CustomText from "../../utils/CustomText";
import CustomBorderBtn from "../../components/CustomBorderBtn";
const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <CustomText style={styles.title}>Login</CustomText>
      <CustomTextInput title={"Email"} placeholder={"johndoe@gmail.com"} />
      <CustomTextInput
        title={"Password"}
        placeholder={"********"}
        type={true}
      />
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <CustomText style={styles.forgotPasswordText}>
          Forgot Password?
        </CustomText>
      </TouchableOpacity>
      <CustomSolidBtn title={"Login"} />
      <CustomBorderBtn
        title={"Create Account"}
        onPress={() => navigation.navigate("SignUpForCompany")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(70),
    height: scale(70),
    alignSelf: "center",
    marginTop: moderateVerticalScale(70),
    borderRadius: moderateScale(7),
  },
  title: {
    alignSelf: "center",
    fontSize: moderateScale(25),
    marginTop: moderateVerticalScale(50),
    fontWeight: "600",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginRight: moderateScale(20),
    marginTop: moderateScale(13),
  },
  forgotPasswordText: {
    fontWeight: "500",
    fontSize: moderateScale(14),
    textDecorationLine: "underline",
  },
});

export default LoginPage;
