import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import CustomText from "../../../utils/CustomText";
import Loader from "../../../utils/Loader";
import { ScrollView } from "react-native-gesture-handler";

const JobDetail = ({ route }) => {
  const { job } = route.params;
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  // Fetch submissions for the job
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const jobAppliedRef = doc(firestore, "jobApplied", job.jobId);
        const jobAppliedDoc = await getDoc(jobAppliedRef);

        if (jobAppliedDoc.exists()) {
          const jobAppliedData = jobAppliedDoc.data();
          setSubmissions(jobAppliedData.applicants || []);
        } else {
          setSubmissions([]);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
        Alert.alert("Error", "Failed to fetch submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [job.jobId]);
  const openResume = (resumeUrl) => {
    if (resumeUrl) {
      Linking.openURL(resumeUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      Alert.alert("No resume available", "Please upload a resume first.");
    }
  };
  const renderSubmission = ({ item }) => (
    <View style={styles.submissionCard}>
      <Text style={styles.submissionText}>
        {item.userName} ({item.userEmail} )
      </Text>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => openResume(item?.userResume)}
      >
        <Text style={styles.submissionText}>View Resume</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <CustomText style={styles.jobTitle}>
          {job.jobTitle} in {job.company}
        </CustomText>

        <CustomText style={styles.jobDescription}>
          {job.jobDescription}
        </CustomText>

        {/* Other Job Details */}
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Department:</CustomText>
          <CustomText style={styles.detailValue}>{job.department}</CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Experience:</CustomText>
          <CustomText style={styles.detailValue}>
            {job.experience} Years
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Skills:</CustomText>
          <CustomText style={styles.detailValue}>{job.skills}</CustomText>
        </View>

        {/* Submissions Section */}
        <View style={styles.submissionsContainer}>
          <CustomText style={styles.submissionsTitle}>Submissions</CustomText>
          {submissions.length === 0 ? (
            <Text style={styles.noSubmissionsText}>No submissions yet.</Text>
          ) : (
            <FlatList
              data={submissions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSubmission}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default JobDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: moderateScale(15),
  },
  jobTitle: {
    fontSize: moderateScale(20),
    fontFamily: "Poppins_700Bold",
    color: TEXT_COLOR,
    marginBottom: moderateScale(10),
  },
  jobDescription: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
    marginBottom: moderateScale(20),
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  otherDetails: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins_600Bold",
    color: TEXT_COLOR,
  },
  detailValue: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
  },
  submissionsContainer: {
    marginTop: moderateScale(20),
  },
  submissionsTitle: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins_700Bold",
    color: TEXT_COLOR,
    marginBottom: moderateScale(10),
  },
  submissionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    backgroundColor: "#f0f0f0",
    marginBottom: moderateScale(10),
  },
  submissionText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins_400Regular",

    color: TEXT_COLOR,
  },
  noSubmissionsText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
    textAlign: "center",
  },
  applyButton: {
    padding: moderateScale(10),
    backgroundColor: BG_COLOR,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: moderateScale(12),
  },
});
