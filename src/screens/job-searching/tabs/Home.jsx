import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
import CustomText from "../../../utils/CustomText";
import {
  moderateScale,
  scale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
import CustomSolidBtn from "../../../components/CustomSolidBtn";
import { useNavigation } from "@react-navigation/native";
import { UseAuth } from "../../../utils/AuthContext";
import SearchJobs from "./SearchJobs";
import { formatDistanceToNow } from "date-fns";
import Loader from "../../../utils/Loader";
import { firestore } from "../../../../firebaseConfig";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";

const PAGE_SIZE = 3; // Number of jobs per page

const Home = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const { user } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Track total pages
  const navigation = useNavigation();

  const fetchTrendingJobs = async () => {
    try {
      setLoading(true);
      const jobsRef = collection(firestore, "jobs");
      const jobsList = [];

      const unsubscribe = onSnapshot(jobsRef, (querySnapshot) => {
        querySnapshot.forEach((docSnapshot) => {
          const userJobs = docSnapshot.data().jobs || [];
          userJobs.forEach((job) => {
            jobsList.push(job);
          });
        });
        const totalJobs = jobsList.length;
        setTotalPages(Math.ceil(totalJobs / PAGE_SIZE)); // Calculate total pages
        setTrendingJobs(
          jobsList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        ); // Paginate jobs
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingJobs();
  }, [currentPage]);

  const handleJobPress = (item) => {
    navigation.navigate("SingleJob", { job: item });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          style={[
            styles.pageNumber,
            currentPage === i && styles.activePageNumber,
          ]}
        >
          <Text
            style={[
              styles.pageNumberText,
              currentPage === i && styles.activePageNumberText,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          <Image
            source={require("../../../images/left-arrow.png")}
            style={styles.paginateIcon}
          />
        </TouchableOpacity>
        {pages}
        <TouchableOpacity
          onPress={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        >
          <Image
            source={require("../../../images/right-arrow.png")}
            style={styles.paginateIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: BG_COLOR,
      flex: 1,
    },
    trendingContainer: {
      marginBottom: moderateScale(170),
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: BG_COLOR,
      borderRadius: scale(40),
      marginHorizontal: scale(20),
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      marginTop: moderateScale(15),
      paddingLeft: scale(15),
      height: moderateScale(50),
    },
    trendingText: {
      color: TEXT_COLOR,
      fontSize: moderateScale(20),
      fontFamily: "Poppins_600SemiBold",
      paddingTop: moderateScale(10),
      paddingLeft: moderateScale(20),
    },
    searchIcon: {
      width: 20,
      height: 20,
      tintColor: "grey",
    },
    searchText: {
      fontSize: 16,
      fontFamily: "Poppins_400Regular",
      color: "grey",
      marginLeft: 10,
    },
    headerText: {
      fontSize: moderateScale(22),
      fontFamily: "Poppins_700Bold",
      width: "90%",
      paddingLeft: moderateScale(30),
      color: TEXT_COLOR,
      marginTop: moderateScale(20),
    },
    notes: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: moderateScale(7),
      paddingLeft: moderateScale(30),
    },
    noteText: {
      fontSize: moderateScale(14),
      fontFamily: "Poppins_400Regular",
      color: TEXT_COLOR,
      marginLeft: 10,
    },
    buttonView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginTop: scale(20),
    },
    loginBtn: {
      backgroundColor: TEXT_COLOR,
      padding: scale(7),
      borderRadius: scale(5),
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      borderRadius: scale(30),
      alignItems: "center",
      justifyContent: "center",
      width: "45%",
    },
    loginTxt: {
      color: BG_COLOR,
      fontSize: scale(12),
    },
    signupBtn: {
      backgroundColor: BG_COLOR,
      padding: scale(7),
      borderColor: TEXT_COLOR,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: scale(30),
      width: "45%",
    },
    signupTxt: {
      color: TEXT_COLOR,
      fontSize: scale(12),
    },
    jobsearchCard: {
      backgroundColor: BG_COLOR,
      padding: moderateScale(20),
      marginTop: moderateScale(20),
      alignItems: "center",
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      marginHorizontal: moderateScale(10),
      borderRadius: scale(20),
    },
    gif: {
      width: scale(100),
      height: scale(100),
      alignSelf: "center",
    },
    input: {
      width: "100%",
      height: scale(40),
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      fontFamily: "Poppins_400Regular",
      borderRadius: scale(20),
      marginTop: scale(10),
      paddingLeft: scale(20),
      color: TEXT_COLOR,
    },
    searchBtn: {
      backgroundColor: TEXT_COLOR,
      paddingHorizontal: scale(30),
      paddingVertical: scale(10),
      width: "70%",
      textAlign: "center",
      borderRadius: scale(40),
      marginTop: scale(20),
    },
    searchBtnText: {
      color: BG_COLOR,
      fontSize: scale(17),
      textAlign: "center",
      fontFamily: "Poppins_400Regular",
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
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: moderateScale(10),
    },
    paginationButton: {
      marginHorizontal: scale(5),
      paddingVertical: scale(5),
      paddingHorizontal: scale(3),

      backgroundColor: TEXT_COLOR,
      borderRadius: scale(5),
    },
    paginationButtonText: {
      color: BG_COLOR,
      fontSize: scale(14),
    },
    pageNumber: {
      marginHorizontal: scale(5),

      paddingHorizontal: scale(5),
      borderRadius: scale(5),
    },
    activePageNumber: {
      backgroundColor: TEXT_COLOR,
    },
    pageNumberText: {
      fontWeight: "bold",
      color: TEXT_COLOR,
      fontSize: scale(14),
    },
    activePageNumberText: {
      color: BG_COLOR,
    },
    paginateIcon: {
      tintColor: BG_COLOR,
      width: moderateScale(14),
      height: moderateScale(12),
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => {
          navigation.navigate("SearchJobs");
        }}
      >
        <Image
          source={require("../../../images/search.png")}
          style={styles.searchIcon}
        />
        <CustomText style={styles.searchText}>Search for Jobs</CustomText>
      </TouchableOpacity>
      {user && (
        <View style={styles.trendingContainer}>
          <CustomText style={styles.trendingText}>Available Jobs</CustomText>
          {loading ? (
            <Loader />
          ) : trendingJobs.length > 0 ? (
            <>
              <FlatList
                style={{ marginTop: moderateVerticalScale(10) }}
                data={trendingJobs}
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
                            <Text style={styles.detailText}>
                              ₹ {item.package}
                            </Text>
                            <Ionicons
                              name="location-sharp"
                              size={16}
                              color="grey"
                              style={styles.icon}
                            />
                            <Text style={styles.detailText}>
                              {item.address}
                            </Text>
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
                  <Text style={styles.noResults}>No trending jobs found</Text>
                )}
                ListFooterComponent={renderPagination}
              />
            </>
          ) : (
            <Text style={styles.noResults}>No trending jobs found</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Home;
