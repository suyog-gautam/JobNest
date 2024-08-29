import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomSolidBtn from "../../../components/CustomSolidBtn";
import CustomText from "../../../utils/CustomText";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../../utils/Loader";
import { firestore } from "../../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const EditProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [parsedUser, setParsedUser] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Retrieve user data from Firestore
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const value = await AsyncStorage.getItem("user");
        if (value) {
          const localUser = JSON.parse(value);
          const userDocRef = doc(firestore, "users", localUser?.user?.uid);
          setUid(localUser?.user?.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setParsedUser(userData);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company name is required"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Invalid contact number"),
    address: Yup.string().required("Address is required"),
  });

  const handleUpdateProfile = async (values) => {
    if (!parsedUser) {
      Alert.alert("Error", "User data not found.");
      return;
    }

    try {
      setLoading(true);

      const userDocRef = doc(firestore, "users", uid);
      const updatedUserData = {
        name: values.name,
        companyName: values.companyName,
        contact: values.contact,
        address: values.address,
      };
      // Update user data in Firestore
      await updateDoc(userDocRef, updatedUserData);
      await AsyncStorage.setItem("updateData", JSON.stringify(updatedUserData));
      navigation.navigate("DashboardForCompany");
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update the profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delay rendering the form until user data is loaded
  if (!parsedUser) {
    return <Loader />; // Or some other loading indicator
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DashboardForCompany")}
          >
            <MaterialIcons name="arrow-back" style={styles.backArrow} />
          </TouchableOpacity>
          <CustomText style={styles.title}>Update Profile</CustomText>
        </View>

        <Formik
          initialValues={{
            name: parsedUser?.name || "",
            companyName: parsedUser?.companyName || "",
            contact: parsedUser?.contact || "",
            address: parsedUser?.address || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
          enableReinitialize // Add this to reinitialize the form when `parsedUser` updates
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

              <CustomSolidBtn
                title="Update Profile"
                onPress={handleSubmit}
                disabled={isSubmitting}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR, justifyContent: "center" },
  backArrow: {
    fontSize: moderateScale(30),
    color: TEXT_COLOR,
  },
  header: {
    width: "100%",
    height: verticalScale(45),
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(25),
    paddingLeft: moderateScale(20),
    marginBottom: moderateScale(30),
  },
  title: {
    color: TEXT_COLOR,
    fontSize: moderateScale(23),
    fontWeight: "600",
    marginLeft: scale(15),
    fontFamily: "Poppins_500Medium",
  },
  errorMsg: {
    color: "red",
    marginLeft: moderateScale(25),
  },
  scrollView: {
    paddingBottom: moderateVerticalScale(40),
  },
});
