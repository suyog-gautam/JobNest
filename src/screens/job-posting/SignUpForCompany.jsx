import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { getColors } from "../../utils/colors";
import { useTheme } from "../../utils/ThemeContext";
import CustomTextInput from "../../components/CustomTextInput";
import CustomSolidBtn from "../../components/CustomSolidBtn";
import CustomBorderBtn from "../../components/CustomBorderBtn";
import CustomText from "../../utils/CustomText";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../utils/Loader";
import auth from "@react-native-firebase/auth";
import { firestore } from "../../../firebaseConfig.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const emailRegex =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

const SignUpForCompany = ({ navigation }) => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [loading, setLoading] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
    },
    logo: {
      width: scale(70),
      height: scale(70),
      alignSelf: "center",
      marginTop: moderateVerticalScale(40),
      borderRadius: moderateScale(7),
    },
    title: {
      alignSelf: "center",
      color: TEXT_COLOR,
      fontSize: moderateScale(25),
      marginTop: moderateVerticalScale(30),
      fontWeight: "600",
    },
    errorMsg: {
      color: "red",
      marginLeft: moderateScale(30),
    },
  });

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company name is required"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid Contact"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Please enter a valid email ")
      .matches(emailRegex, "Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      // Create a new user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      const { uid } = userCredential.user;

      // Store additional user data in Firestore under the 'users' collection
      await setDoc(doc(firestore, "users", uid), {
        name: values.name,
        companyName: values.companyName,
        contact: values.contact,
        address: values.address,
        email: values.email,
        role: "Recruiter",
        createdAt: serverTimestamp(),
      });

      // Navigate to the login page with a toast message
      navigation.navigate("LoginForCompany", {
        toastMessage: "You have signed up successfully. Now, please login.",
      });
    } catch (error) {
      // Error handling
      Alert.alert("Error", error.message);
    } finally {
      // Stop the loader
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
        <CustomText style={styles.title}>Create Your Account</CustomText>

        <Formik
          initialValues={{
            name: "",
            companyName: "",
            contact: "",
            address: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <CustomTextInput
                title="Name"
                placeholder="Jon Doe"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={touched.name && errors.name}
              />
              {touched.name && errors.name ? (
                <CustomText style={styles.errorMsg}>{errors.name}</CustomText>
              ) : null}
              <CustomTextInput
                title="Company Name"
                placeholder="Amazon"
                value={values.companyName}
                onChangeText={handleChange("companyName")}
                onBlur={handleBlur("companyName")}
                error={touched.companyName && errors.companyName}
              />
              {touched.companyName && errors.companyName ? (
                <CustomText style={styles.errorMsg}>
                  {errors.companyName}
                </CustomText>
              ) : null}
              <CustomTextInput
                title="Contact"
                placeholder="9811123763"
                value={values.contact}
                onChangeText={handleChange("contact")}
                onBlur={handleBlur("contact")}
                error={touched.contact && errors.contact}
              />
              {touched.contact && errors.contact ? (
                <CustomText style={styles.errorMsg}>
                  {errors.contact}
                </CustomText>
              ) : null}
              <CustomTextInput
                title="Address"
                placeholder="Bharatpur-12 Chitwan"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                error={touched.address && errors.address}
              />
              {touched.address && errors.address ? (
                <CustomText style={styles.errorMsg}>
                  {errors.address}
                </CustomText>
              ) : null}
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
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                type="password"
                error={touched.password && errors.password}
              />
              {touched.password && errors.password ? (
                <CustomText style={styles.errorMsg}>
                  {errors.password}
                </CustomText>
              ) : null}
              <CustomSolidBtn
                title="Create Account"
                onPress={handleSubmit}
                disabled={isSubmitting}
              />
              <CustomBorderBtn
                title="Login"
                onPress={() => navigation.navigate("LoginForCompany")}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default SignUpForCompany;
