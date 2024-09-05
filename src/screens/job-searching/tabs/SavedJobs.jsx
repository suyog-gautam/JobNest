import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  scale,
  moderateVerticalScale,
  moderateScale,
} from "react-native-size-matters";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../../../../firebaseConfig";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import CustomText from "../../../utils/CustomText";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { UseAuth } from "../../../utils/AuthContext";
import Loader from "../../../utils/Loader";
const SavedJobs = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
    },
    jobItem: {
      padding: moderateScale(16),
      backgroundColor: BG_COLOR,
      margin: moderateScale(8),
      borderRadius: moderateScale(8),
      borderWidth: 1,
      borderColor: "#ddd",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bookmark: {
      height: scale(18),
      width: scale(18),
      tintColor: TEXT_COLOR,
    },
    jobTitle: {
      color: TEXT_COLOR,
      fontSize: moderateScale(16),
      fontFamily: "Poppins_700Bold",
    },
    companyName: {
      fontSize: moderateScale(14),
      color: TEXT_COLOR,
    },
    details: {
      marginTop: moderateScale(4),
    },
    detailsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: moderateScale(8),
    },
    icon: {
      marginRight: scale(4),
      tintColor: "#8a7c72",
    },
    detailText: {
      fontFamily: "Poppins_400Regular",
      fontSize: moderateScale(12),
      color: "#8a7c72",
      marginRight: scale(16),
    },
    description: {
      fontFamily: "Poppins_400Regular",
      fontSize: moderateScale(12),
      color: "#8a7c72",
      marginBottom: moderateScale(8),
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: moderateScale(8),
    },
    skill: {
      fontFamily: "Poppins_400Regular",
      fontSize: moderateScale(12),
      color: "#2196F3",
      marginRight: scale(8),
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: moderateScale(2),
    },
    timePosted: {
      fontFamily: "Poppins_400Regular",
      fontSize: moderateScale(12),
      color: "#8a7c72",
    },
    noResults: {
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
      marginTop: moderateScale(20),
      fontSize: moderateScale(16),
      color: TEXT_COLOR,
    },
  });

  useEffect(() => {
    if (user?.user?.uid) {
      const savedJobsRef = doc(firestore, "savedJobs", user.user.uid);

      const unsubscribe = onSnapshot(savedJobsRef, (doc) => {
        if (doc.exists()) {
          const jobIds = doc.data().jobs || [];
          fetchJobs(jobIds);
        } else {
          setSavedJobs([]);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const fetchJobs = async (jobIds) => {
    try {
      setLoading(true);
      const jobsRef = collection(firestore, "jobs");
      const unsubscribe = onSnapshot(jobsRef, (querySnapshot) => {
        const jobsList = [];
        querySnapshot.forEach((doc) => {
          const userJobs = doc.data().jobs || [];
          userJobs.forEach((job) => {
            if (jobIds.includes(job.jobId)) {
              jobsList.push(job);
            }
          });
        });
        setSavedJobs(jobsList);
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobPress = (item) => {
    navigation.navigate("SingleJob", { job: item });
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <FlatList
        style={{ marginTop: moderateVerticalScale(10) }}
        data={savedJobs}
        keyExtractor={(item) => item.jobId}
        renderItem={({ item }) => {
          const postedDate = new Date(item?.postedOn);
          const formattedTime = isNaN(postedDate)
            ? "Invalid Date"
            : formatDistanceToNow(postedDate, { addSuffix: true });

          return (
            <TouchableOpacity onPress={() => handleJobPress(item)}>
              <View style={styles.jobItem}>
                <View style={styles.header}>
                  <CustomText style={styles.jobTitle}>
                    {item.jobTitle}
                  </CustomText>

                  <Image
                    source={require("../../../images/bookmarkfiiled.png")}
                    style={styles.bookmark}
                  />
                </View>
                <CustomText style={styles.companyName}>
                  {item.company}
                </CustomText>
                <View style={styles.details}>
                  <View style={styles.detailsRow}>
                    <MaterialIcons
                      name="work"
                      size={16}
                      color="grey"
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>
                      {item.experience} Years
                    </Text>
                    <FontAwesome
                      name="money"
                      size={16}
                      color="grey"
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>₹ {item.package}</Text>
                    <Ionicons
                      name="location-sharp"
                      size={16}
                      color="grey"
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>{item.address}</Text>
                  </View>
                  <View style={styles.skillsContainer}>
                    {item.skills.split(",").map((skill, index) => (
                      <Text key={index} style={styles.skill}>
                        {skill.trim()}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.description}>
                    {item.jobDescription.slice(0, 50)}...
                  </Text>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.timePosted}>{formattedTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={styles.noResults}>No saved jobs found</Text>
        )}
      />
    </View>
  );
};

export default SavedJobs;
