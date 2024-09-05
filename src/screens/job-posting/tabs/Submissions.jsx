import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig";
import { UseAuth } from "../../../utils/AuthContext"; // Auth context to get the recruiter info
import Loader from "../../../utils/Loader";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
import CustomText from "../../../utils/CustomText";
const Submissions = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const { user } = UseAuth(); // Get the current recruiter
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: moderateScale(15),
      backgroundColor: BG_COLOR,
    },
    header: {
      marginTop: verticalScale(10),
      alignItems: "center",
      marginBottom: verticalScale(20),
    },
    headerText: {
      fontSize: moderateScale(22),
      fontWeight: "700",
      fontFamily: "Poppins_600Bold",
      color: TEXT_COLOR,
    },
    submissionCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: moderateScale(2),
      padding: moderateScale(15),
      borderRadius: moderateScale(8),
      backgroundColor: BG_COLOR,
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      marginBottom: moderateScale(10),
    },
    submissionText: {
      width: "65%",
      fontSize: moderateScale(14),

      color: TEXT_COLOR,
    },
    viewResumeButton: {
      padding: moderateScale(10),
      backgroundColor: BG_COLOR,
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      borderRadius: moderateScale(8),
    },
    viewResumeText: {
      color: TEXT_COLOR,
    },
    noSubmissionsText: {
      fontSize: moderateScale(16),
      color: TEXT_COLOR,
      textAlign: "center",
      marginTop: moderateScale(20),
    },
  });

  // Fetch jobs posted by the recruiter and their submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?.user?.uid) return; // Ensure recruiter is logged in

      setLoading(true);
      try {
        const recruiterJobsRef = doc(firestore, "jobs", user.user.uid); // Fetch the job document for the recruiter
        const jobsDoc = await getDoc(recruiterJobsRef);

        if (jobsDoc.exists()) {
          const jobsData = jobsDoc.data().jobs || []; // Extract the array of jobs
          const allSubmissions = [];

          for (const job of jobsData) {
            const jobAppliedRef = doc(firestore, "jobApplied", job.jobId);
            const jobAppliedDoc = await getDoc(jobAppliedRef);

            if (jobAppliedDoc.exists()) {
              const jobData = jobAppliedDoc.data();
              allSubmissions.push(
                ...jobData.applicants.map((applicant) => ({
                  ...applicant,
                  jobTitle: job.jobTitle,
                }))
              );
            }
          }

          setSubmissions(allSubmissions); // Set all submissions for the recruiter’s jobs
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
        Alert.alert("Error", "Failed to fetch submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user]);

  // Open the resume in a web browser
  const openResume = (resumeUrl) => {
    if (resumeUrl) {
      Linking.openURL(resumeUrl).catch((err) =>
        console.error("Failed to open resume URL:", err)
      );
    } else {
      Alert.alert(
        "No resume available",
        "No resume was provided for this submission."
      );
    }
  };

  // Render each submission
  const renderSubmission = ({ item }) => (
    <View style={styles.submissionCard}>
      <CustomText style={styles.submissionText}>
        {item.userName} ({item.userEmail}) - Applied for: {item.jobTitle}
      </CustomText>
      <TouchableOpacity
        style={styles.viewResumeButton}
        onPress={() => openResume(item?.userResume)}
      >
        <CustomText style={styles.viewResumeText}>View Resume</CustomText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.headerText}>Job submission</Text>
      </View>
      {submissions.length > 0 ? (
        <FlatList
          data={submissions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSubmission}
        />
      ) : (
        <CustomText style={styles.noSubmissionsText}>
          No submissions found.
        </CustomText>
      )}
    </View>
  );
};

export default Submissions;
