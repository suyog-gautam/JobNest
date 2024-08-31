import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Added import for AsyncStorage
import Loader from "../../utils/Loader"; // Added import for Loader
import firestore from "@react-native-firebase/firestore";
const LoginForCompany = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  // Show the toast when navigated to this page from SignUp
  useEffect(() => {
    if (route.params?.toastMessage) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: route.params.toastMessage,
        position: "bottom",
      });
    }
  }, [route.params?.toastMessage]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // Sign in with email and password
      const userCredential = await auth().signInWithEmailAndPassword(
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Retrieve additional user data from Firestore
      const userDoc = await firestore().collection("users").doc(user.uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        // Store the user data along with additional info (like role) in AsyncStorage
        const storedData = {
          user,
          role: userData.role,
          ...userData,
        };

        await AsyncStorage.setItem("user", JSON.stringify(storedData));

        // Navigate to the Dashboard
        navigation.navigate("DashboardForCompany");
      } else {
        Alert.alert("Error", "User data not found");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast />
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <CustomText style={styles.title}>Login</CustomText>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default LoginForCompany;

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
