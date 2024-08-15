import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { BG_COLOR } from "../../utils/colors";
import CustomTextInput from "../../components/CustomTextInput";
import CustomSolidBtn from "../../components/CustomSolidBtn";
import CustomText from "../../utils/CustomText";
import CustomBorderBtn from "../../components/CustomBorderBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-native";
const LoginPage = () => {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <CustomText style={styles.title}>Login</CustomText>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Alert.alert("Login Successful", JSON.stringify(values));
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <CustomTextInput
              title="Email"
              placeholder="johndoe@gmail.com"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email ? (
              <CustomText style={styles.errorMsg}>{errors.email}</CustomText>
            ) : null}
            <CustomTextInput
              title="Password"
              placeholder="********"
              type="password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={touched.password && errors.password}
            />
            {touched.password && errors.password ? (
              <CustomText style={styles.errorMsg}>{errors.password}</CustomText>
            ) : null}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <CustomText style={styles.forgotPasswordText}>
                Forgot Password?
              </CustomText>
            </TouchableOpacity>
            <CustomSolidBtn title="Login" onPress={handleSubmit} />
            <CustomBorderBtn
              title="Create Account"
              onPress={() => navigation.navigate("SignUpForCompany")}
            />
          </>
        )}
      </Formik>
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
  errorMsg: {
    color: "red",
    marginLeft: moderateScale(30),
  },
});

export default LoginPage;
