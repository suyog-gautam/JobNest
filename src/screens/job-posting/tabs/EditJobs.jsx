import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
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
import CustomDropdown from "../../../components/CustomDropdown";
import CustomSolidBtn from "../../../components/CustomSolidBtn";
import CustomText from "../../../utils/CustomText";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../../utils/Loader";
import { firestore } from "../../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditJobs = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const navigation = useNavigation();
  const route = useRoute();
  const { job } = route.params; // Get the job data from the route parameters

  const [loading, setLoading] = useState(false);
  const [parsedUser, setParsedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(job.department);
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BG_COLOR },
    backArrow: {
      width: 25,
      height: 25,
      tintColor: TEXT_COLOR,
    },
    header: {
      width: "100%",
      height: verticalScale(45),
      flexDirection: "row",
      alignItems: "center",
      marginTop: moderateScale(25),
      paddingLeft: moderateScale(20),
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
  });
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setParsedUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    company: Yup.string().required("Company name is required"),
    jobTitle: Yup.string().required("Job title is required"),
    department: Yup.string().required("Department is required"),
    skills: Yup.string().required("Skills are required"),
    experience: Yup.string().required("Experience is required"),
    package: Yup.string().required("Package is required"),
    jobDescription: Yup.string().required("Job description is required"),
    applicationDeadline: Yup.string()
      .required("Application deadline is required")
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date format (MM/DD/YYYY)"),
  });

  const handleUpdateJob = async (values) => {
    if (!parsedUser) {
      Alert.alert("Error", "User data not found.");
      return;
    }

    try {
      setLoading(true);

      const userDocRef = doc(firestore, "jobs", parsedUser?.user?.uid);

      // Retrieve the document
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const jobs = userData.jobs || [];

        // Update the job data in the jobs array
        const updatedJobs = jobs.map((j) =>
          j.jobId === job.jobId
            ? { ...j, ...values, department: selectedCategory }
            : j
        );

        // Update the document with the modified jobs array
        await updateDoc(userDocRef, { jobs: updatedJobs });

        navigation.navigate("DashboardForCompany");
        Alert.alert("Success", "Job updated successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update the job. Please try again.");
      console.error("Error updating job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DashboardForCompany")}
          >
            <Image
              source={require("../../../images/back-arrow.png")}
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <CustomText style={styles.title}>Edit Jobs</CustomText>
        </View>

        <Formik
          initialValues={{
            company: job.company || "",
            jobTitle: job.jobTitle || "",
            department: job.department || "",
            skills: job.skills || "",
            experience: job.experience || "",
            package: job.package || "",
            jobDescription: job.jobDescription || "",
            applicationDeadline: job.applicationDeadline || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateJob}
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
                title={"Company"}
                placeholder={"E-Sewa"}
                value={values.company}
                onChangeText={handleChange("company")}
                onBlur={handleBlur("company")}
                error={touched.company && errors.company}
              />
              {touched.company && errors.company ? (
                <CustomText style={styles.errorMsg}>
                  {errors.company}
                </CustomText>
              ) : null}

              <CustomTextInput
                title={"Job Title"}
                placeholder={"Software Engineer"}
                value={values.jobTitle}
                onChangeText={handleChange("jobTitle")}
                onBlur={handleBlur("jobTitle")}
                error={touched.jobTitle && errors.jobTitle}
              />
              {touched.jobTitle && errors.jobTitle ? (
                <CustomText style={styles.errorMsg}>
                  {errors.jobTitle}
                </CustomText>
              ) : null}

              <CustomDropdown
                title={"Department"}
                placeholder={"Select Department"}
                value={selectedCategory}
                onSelect={(selected) => {
                  setSelectedCategory(selected);
                  handleChange("department")(selected);
                }}
                error={touched.department && errors.department}
              />
              {touched.department && errors.department ? (
                <CustomText style={styles.errorMsg}>
                  {errors.department}
                </CustomText>
              ) : null}

              <CustomTextInput
                title={"Skills"}
                placeholder={"React Native, JavaScript (Comma Separated)"}
                value={values.skills}
                onChangeText={handleChange("skills")}
                onBlur={handleBlur("skills")}
                error={touched.skills && errors.skills}
              />
              {touched.skills && errors.skills ? (
                <CustomText style={styles.errorMsg}>{errors.skills}</CustomText>
              ) : null}

              <CustomTextInput
                title={"Experience (In Years)"}
                placeholder={" 4 "}
                value={values.experience}
                onChangeText={handleChange("experience")}
                onBlur={handleBlur("experience")}
                error={touched.experience && errors.experience}
              />
              {touched.experience && errors.experience ? (
                <CustomText style={styles.errorMsg}>
                  {errors.experience}
                </CustomText>
              ) : null}

              <CustomTextInput
                title={"Package"}
                placeholder={"16 LPA"}
                value={values.package}
                onChangeText={handleChange("package")}
                onBlur={handleBlur("package")}
                error={touched.package && errors.package}
              />
              {touched.package && errors.package ? (
                <CustomText style={styles.errorMsg}>
                  {errors.package}
                </CustomText>
              ) : null}

              <CustomTextInput
                title={"Job Description"}
                placeholder={"Job for the Software Developer"}
                value={values.jobDescription}
                onChangeText={handleChange("jobDescription")}
                onBlur={handleBlur("jobDescription")}
                error={touched.jobDescription && errors.jobDescription}
                multiline={true}
              />
              {touched.jobDescription && errors.jobDescription ? (
                <CustomText style={styles.errorMsg}>
                  {errors.jobDescription}
                </CustomText>
              ) : null}

              <CustomTextInput
                title={"Application Deadline"}
                placeholder={"MM/DD/YYYY"}
                value={values.applicationDeadline}
                onChangeText={handleChange("applicationDeadline")}
                onBlur={handleBlur("applicationDeadline")}
                error={
                  touched.applicationDeadline && errors.applicationDeadline
                }
              />
              {touched.applicationDeadline && errors.applicationDeadline ? (
                <CustomText style={styles.errorMsg}>
                  {errors.applicationDeadline}
                </CustomText>
              ) : null}

              <CustomSolidBtn
                title={"Update Job"}
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

export default EditJobs;
