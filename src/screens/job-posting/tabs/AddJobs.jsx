import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../../utils/Loader";
import { firestore } from "../../../../firebaseConfig";
import {
  doc,
  setDoc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import "react-native-get-random-values";

import AsyncStorage from "@react-native-async-storage/async-storage";
const AddJobs = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedUser, setParsedUser] = useState(null);
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

  const handlePostJob = async (values) => {
    if (!parsedUser) {
      Alert.alert("Error", "User data not found.");
      return;
    }

    try {
      setLoading(true);

      const userDocRef = doc(firestore, "jobs", parsedUser?.user?.uid);

      // Create job data without adding it directly to the array
      const jobData = {
        jobId: uuid.v4(),
        jobTitle: values.jobTitle,
        company: values.company,
        department: values.department,
        skills: values.skills,
        experience: values.experience,
        package: values.package,
        jobDescription: values.jobDescription,
        applicationDeadline: values.applicationDeadline,
      };

      // Retrieve the document to check if it exists
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // If the document doesn't exist, create it with the first job
        await setDoc(userDocRef, { jobs: [jobData] });
      } else {
        // If the document exists, update it by adding the job to the array
        await updateDoc(userDocRef, {
          jobs: arrayUnion(jobData),
        });
      }

      navigation.navigate("DashboardForCompany");
      Alert.alert("Success", "Job posted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to post the job. Please try again.");
      console.error("Error posting job:", error);
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
            <MaterialIcons
              name="arrow-back"
              size={moderateScale(24)}
              e
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <CustomText style={styles.title}>Post Jobs</CustomText>
        </View>

        <Formik
          initialValues={{
            company: "",
            jobTitle: "",
            department: "",
            skills: "",
            experience: "",
            package: "",
            jobDescription: "",
            applicationDeadline: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handlePostJob}
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
                title={"Post Job"}
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
export default AddJobs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR },
  backArrow: {
    width: 30,
    height: 30,

    color: TEXT_COLOR,
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
