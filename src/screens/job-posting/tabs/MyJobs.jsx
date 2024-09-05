import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../utils/Loader";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
const MyJobs = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(90),
    },
    header: {
      paddingVertical: moderateScale(15),
      marginTop: moderateScale(20),
      alignItems: "center",
    },
    headerText: {
      fontSize: moderateScale(26),
      fontWeight: "700",
      fontFamily: "Poppins_600Bold",
      color: TEXT_COLOR,
    },
    card: {
      backgroundColor: BG_COLOR,
      padding: moderateScale(20),
      borderRadius: moderateScale(15),
      marginVertical: moderateScale(12),
      marginHorizontal: moderateScale(5),
      borderWidth: 1,
      borderColor: "#E0E0E0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
    cardContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
    },
    jobDetailsContainer: {
      flex: 1,
    },
    jobTitle: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: moderateScale(18),
      marginBottom: moderateScale(8),
      color: "#81a8bd",
    },
    jobDetails: {
      fontFamily: "Poppins_400Regular",
      fontSize: moderateScale(14),
      color: "#7f8c8d",
      marginBottom: moderateScale(4),
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: moderateScale(10),
    },
    tag: {
      backgroundColor: "#f0f4f8",
      borderRadius: moderateScale(5),
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),
      marginRight: moderateScale(5),
      marginBottom: moderateScale(5),
    },
    tagText: {
      color: "#2c3e50",
      fontFamily: "Poppins_400Regular",
      fontSize: moderateScale(12),
    },
    actionsContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      marginBottom: moderateScale(10),
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noJobsText: {
      textAlign: "center",
      fontSize: moderateScale(16),
      color: "#888",
    },
    skeletonCard: {
      width: "100%",
      height: moderateScale(200),
      borderRadius: moderateScale(15),
      marginVertical: moderateScale(12),
      backgroundColor: "#ffffff",
      padding: moderateScale(20),
      marginVertical: moderateScale(12),
      marginHorizontal: moderateScale(5),
      borderWidth: 1,
      borderColor: "#E0E0E0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (value) {
          const parsedUser = JSON.parse(value);
          setUser(parsedUser);

          // Real-time listener for job updates
          const userDocRef = doc(firestore, "jobs", parsedUser.user.uid);
          const unsubscribe = onSnapshot(userDocRef, async (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setJobs(userData.jobs || []);
              await AsyncStorage.setItem(
                "noOfJobs",
                userData.jobs.length.toString()
              );
            }
            setSkeletonLoading(false); // Stop loading once data is retrieved
          });

          // Clean up listener when the component unmounts
          return () => unsubscribe();
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
        setSkeletonLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = (jobId) => {
    Alert.alert(
      "Delete Job",
      "Do you want to delete this job?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deleteJobFromFirestore(jobId),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteJobFromFirestore = async (jobId) => {
    if (!user) return;

    try {
      setLoading(true);

      const userDocRef = doc(firestore, "jobs", user.user.uid);

      // Retrieve the document
      const docSnapshot = await getDoc(userDocRef); // Use getDoc here
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const jobs = userData.jobs || [];

        // Filter out the job to be deleted
        const updatedJobs = jobs.filter((job) => job.jobId !== jobId);

        // Update the document with the modified jobs array
        await updateDoc(userDocRef, { jobs: updatedJobs });

        Alert.alert("Success", "Job deleted successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete the job. Please try again.");
      console.error("Error deleting job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    navigation.navigate("EditJobs", { job });
  };
  const handleJobPress = (job) => {
    navigation.navigate("JobDetail", { job });
  };
  // Skeleton loader layout for job cards
  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={styles.skeletonCard} />
      <View style={styles.skeletonCard} />
    </SkeletonPlaceholder>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Job Nest</Text>
      </View>
      {loading && <Loader />}
      {skeletonLoading ? (
        renderSkeleton() // Show skeleton loader while loading
      ) : jobs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.noJobsText}>No jobs posted yet.</Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => handleJobPress(item)}
            >
              <View style={styles.cardContent}>
                <View style={styles.jobDetailsContainer}>
                  <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                  <Text style={styles.jobDetails}>Company: {item.company}</Text>
                  <Text style={styles.jobDetails}>
                    Department: {item.department}
                  </Text>
                  <Text style={styles.jobDetails}>
                    Experience: {item.experience}
                  </Text>
                  <Text style={styles.jobDetails}>Package: {item.package}</Text>
                  <View style={styles.tagsContainer}>
                    {item.skills.split(",").map((skill, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{skill.trim()}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(item)}
                  >
                    <MaterialIcons name="edit" size={24} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(item.jobId)}
                  >
                    <MaterialIcons name="delete" size={24} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default MyJobs;
