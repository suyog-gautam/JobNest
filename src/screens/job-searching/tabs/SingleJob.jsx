import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import CustomText from "../../../utils/CustomText";
import Loader from "../../../utils/Loader"; // Import Loader
import { useRoute } from "@react-navigation/native";
import { firestore } from "../../../../firebaseConfig"; // Firestore import
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore"; // Import Firestore methods
import { UseAuth } from "../../../utils/AuthContext";
import Toast from "react-native-toast-message";
const screenWidth = Dimensions.get("window").width;

const SingleJob = () => {
  const { user } = UseAuth();
  const route = useRoute();
  const { job } = route.params;
  const [loading, setLoading] = useState(false); // State for loading
  const [isSaved, setIsSaved] = useState(false); // State to track if the job is saved

  useEffect(() => {
    const checkIfJobIsSaved = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(firestore, "savedJobs", user.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const savedJobs = userDoc.data().jobs || [];
          setIsSaved(savedJobs.includes(job.jobId));
        }
      } catch (error) {
        console.error("Error checking if job is saved:", error);
      } finally {
        setLoading(false);
      }
    };

    checkIfJobIsSaved();
  }, [job.jobId, user.user.uid]);

  const handleSaveJob = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(firestore, "savedJobs", user.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        if (isSaved) {
          // If the job is already saved, remove it from the saved jobs array
          await updateDoc(userDocRef, {
            jobs: arrayRemove(job.jobId),
          });
          setIsSaved(false);
          Toast.show({
            type: "info",
            text1: "Unsaved",
            text2:
              job.jobTitle +
              "in" +
              job.company +
              " has been removed from saved jobs",
            position: "bottom",
          });
        } else {
          // If the job is not saved, add it to the saved jobs array
          await updateDoc(userDocRef, {
            jobs: arrayUnion(job.jobId),
          });
          setIsSaved(true);
          Toast.show({
            type: "success",
            text1: "Saved",
            text2:
              job.jobTitle +
              " in " +
              job.company +
              " has been added to saved jobs",
            position: "bottom",
          });
        }
      } else {
        // If the document doesn't exist, create it and add the job to the array
        await setDoc(userDocRef, {
          jobs: [job.jobId],
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving/unsaving job:", error);
      Alert.alert("Error", "Failed to save/unsave the job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ScrollView style={{ marginBottom: moderateScale(50) }}>
        <CustomText style={styles.jobTitle}>
          {job.jobTitle} in {job.company}
        </CustomText>
        <CustomText style={styles.jobDescription}>
          {job.jobDescription}
        </CustomText>

        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Department:</CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            {job.department}
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Skills Required:</CustomText>
          <CustomText style={styles.skillDetails}>{job.skills}</CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Experience:</CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            {job.experience} Years
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Package:</CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            ₹ {job.package}
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>
            Application Deadline:
          </CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            {job.applicationDeadline}
          </CustomText>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveJob}>
          <Image
            source={
              isSaved
                ? require("../../../images/bookmarkfiiled.png")
                : require("../../../images/bookmark.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn}>
          <CustomText style={styles.applyText}>Apply Now</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: moderateScale(10),
  },
  jobTitle: {
    fontSize: moderateScale(20),
    fontFamily: "Poppins_700Bold",
    color: TEXT_COLOR,
    width: "90%",
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  jobDescription: {
    width: "90%",
    fontFamily: "Poppins_400Regular",
    alignSelf: "center",
    fontSize: moderateScale(16),
    marginTop: moderateScale(10),
    color: TEXT_COLOR,
  },
  detailsRow: {
    flexDirection: "row",
    width: "90%",
    gap: moderateScale(20),
    alignSelf: "center",
  },
  otherDetails: {
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    marginVertical: 6,
  },
  skillDetails: {
    fontSize: moderateScale(16),
    marginVertical: 6,
    width: "60%",
    color: TEXT_COLOR,
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 3,
    width: "100%",
    color: TEXT_COLOR,
    flexDirection: "row",
    gap: moderateScale(20),
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  applyBtn: {
    backgroundColor: TEXT_COLOR,
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    color: BG_COLOR,
    width: 0.65 * screenWidth,
    marginRight: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
  },
  saveBtn: {
    backgroundColor: BG_COLOR,
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    width: 0.2 * screenWidth,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: moderateScale(10),
  },
  icon: {
    width: moderateScale(23),
    height: moderateScale(23),
    tintColor: TEXT_COLOR,
  },
});
