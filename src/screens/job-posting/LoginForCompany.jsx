import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { getColors } from "../../utils/colors";
import { useTheme } from "../../utils/ThemeContext";
import CustomTextInput from "../../components/CustomTextInput";
import CustomSolidBtn from "../../components/CustomSolidBtn";
import CustomText from "../../utils/CustomText";
import CustomBorderBtn from "../../components/CustomBorderBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../utils/Loader";
import firestore from "@react-native-firebase/firestore";

const LoginForCompany = () => {
  const { theme } = useTheme();
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

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
      color: TEXT_COLOR,
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
      color: TEXT_COLOR,
    },
    errorMsg: {
      color: "red",
      marginLeft: moderateScale(30),
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: BG_COLOR,
      padding: moderateScale(20),
      borderRadius: moderateScale(10),
      width: "80%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between", // Distributes space between the title and cross icon
      alignItems: "center", // Aligns items vertically in the center
      width: "100%", // Takes up the full width of the modal
      paddingHorizontal: moderateScale(10), // Add some padding to give space around the elements
      marginBottom: moderateVerticalScale(10),
    },
    modalTitle: {
      fontSize: moderateScale(20),
      fontWeight: "bold",
      color: TEXT_COLOR,
      textAlign: "center", // Center text horizontally
      flex: 1, // Takes up available space to keep it centered
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "90%",
      height: verticalScale(40),
      borderWidth: 0.5,
      alignSelf: "center",
      marginTop: moderateVerticalScale(9),
      marginBottom: moderateVerticalScale(9),
      borderRadius: scale(10),
      paddingLeft: moderateScale(12),
      paddingRight: moderateScale(12),

      borderColor: TEXT_COLOR,
    },
    inputText: {
      flex: 1,
      textAlign: "left",
      marginRight: moderateScale(15),
      marginLeft: moderateScale(5),
      fontSize: moderateScale(13),
      fontFamily: "Poppins_400Regular",
      color: TEXT_COLOR,
    },
    Btn: {
      width: "60%",
      borderWidth: 1,
      height: verticalScale(40),
      backgroundColor: TEXT_COLOR,
      justifyContent: "center",
      borderColor: TEXT_COLOR,
      borderRadius: moderateVerticalScale(12),
      marginTop: moderateVerticalScale(10),
      alignSelf: "center",
      marginBottom: moderateVerticalScale(50),
    },
    btnText: {
      color: BG_COLOR,
      fontSize: moderateScale(16),
      alignSelf: "center",
      fontWeight: "600",
    },
    crossIcon: {
      tintColor: TEXT_COLOR,
      width: scale(20),
      height: scale(20),
    },
  });

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

        // Navigate based on user role
        if (userData.role === "Recruiter") {
          navigation.reset({
            index: 0,
            routes: [{ name: "JobPostingNavigator" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        }
      } else {
        Alert.alert("Error", "User data not found");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    try {
      await auth().sendPasswordResetEmail(forgotEmail);
      Alert.alert("Success", "Password reset email sent");
      setForgotPasswordVisible(false); // Close the modal
    } catch (error) {
      Alert.alert("Error", error.message);
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
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => setForgotPasswordVisible(true)} // Show the forgot password modal
            >
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

      {/* Forgot Password Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={forgotPasswordVisible}
        onRequestClose={() => setForgotPasswordVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText style={styles.modalTitle}>Reset Password</CustomText>
              <TouchableOpacity onPress={() => setForgotPasswordVisible(false)}>
                <Image
                  source={require("../../images/cross.png")}
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Your Email"
                style={styles.inputText}
                placeholderTextColor="grey"
                value={forgotEmail}
                onChangeText={setForgotEmail}
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => handleForgotPassword()}
            >
              <CustomText style={styles.btnText}> Send Reset Email </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginForCompany;
