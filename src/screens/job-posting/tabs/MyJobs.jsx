import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BG_COLOR } from "../../../utils/colors";
import { moderateScale } from "react-native-size-matters";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig";
import Loader from "../../../utils/Loader";
const MyJobs = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
          const parsedUser = JSON.parse(value);
          setUser(parsedUser);

          // Fetch the user's posted jobs from Firestore
          const userDocRef = doc(firestore, "jobs", parsedUser.user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setJobs(userData.jobs || []); // Set the jobs array from Firestore
          }
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Nest</Text>

      {/* Display jobs in card format */}
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.jobDetails}>Company: {item.company}</Text>
            <Text style={styles.jobDetails}>Department: {item.department}</Text>
            <Text style={styles.jobDetails}>Experience: {item.experience}</Text>
            <Text style={styles.jobDetails}>Package: {item.package}</Text>
            <View style={styles.tagsContainer}>
              {item.skills.split(",").map((skill, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{skill.trim()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noJobsText}>No jobs posted yet.</Text>
        )}
      />
    </View>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: moderateScale(10),
  },
  header: {
    fontFamily: "Poppins_600Bold",
    fontSize: moderateScale(26),
    marginLeft: moderateScale(10),
    marginTop: moderateScale(30),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  jobTitle: {
    fontFamily: "Poppins_600Bold",
    fontSize: moderateScale(18),
    marginBottom: moderateScale(5),
  },
  jobDetails: {
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(14),
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: moderateScale(10),
  },
  tag: {
    backgroundColor: "#007BFF", // Blue background color for the tags
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    marginRight: moderateScale(5),
    marginBottom: moderateScale(5),
  },
  tagText: {
    color: "#fff", // White text color for contrast
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(12),
  },
  noJobsText: {
    textAlign: "center",
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    color: "#888",
  },
});
