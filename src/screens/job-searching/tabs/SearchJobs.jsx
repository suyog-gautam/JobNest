import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
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
import { TEXT_COLOR } from "../../../utils/colors";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../../../../firebaseConfig"; // Adjust the import according to your setup
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { BG_COLOR } from "../../../utils/colors";
import { formatDistanceToNow } from "date-fns";
import CustomText from "../../../utils/CustomText";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";

const SearchJobs = () => {
  const [searchText, setSearchText] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllJobs = async () => {
      const jobsCollectionRef = collection(firestore, "jobs");

      const unsubscribe = onSnapshot(jobsCollectionRef, (querySnapshot) => {
        const jobsList = [];
        querySnapshot.forEach((doc) => {
          const userJobs = doc.data().jobs || [];
          jobsList.push(...userJobs);
        });
        setAllJobs(jobsList);
      });

      return () => unsubscribe();
    };

    fetchAllJobs();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredJobs([]);
    } else {
      const filtered = allJobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          job.company.toLowerCase().includes(searchText.toLowerCase()) ||
          job.skills.toLowerCase().includes(searchText.toLowerCase()) ||
          job.package.toLowerCase().includes(searchText.toLowerCase()) ||
          job.experience.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchText, allJobs]);

  const handleJobPress = (job) => {
    navigation.navigate("SingleJob", { job });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={require("../../../images/search.png")}
          style={styles.searchicon}
        />
        <TextInput
          style={styles.searchText}
          placeholder="Search for Jobs"
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => setSearchText("")}>
          <Image
            source={require("../../../images/cross.png")}
            style={styles.searchicon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginTop: moderateVerticalScale(10) }}
        data={filteredJobs}
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
                  <TouchableOpacity
                    onPress={() => setIsSaved((prevValue) => !prevValue)}
                  >
                    <Image
                      source={
                        isSaved
                          ? require("../../../images/bookmarkfiiled.png")
                          : require("../../../images/bookmark.png")
                      }
                      style={styles.bookmark}
                    />
                  </TouchableOpacity>
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
          <Text style={styles.noResults}>No jobs found</Text>
        )}
      />
    </View>
  );
};

export default SearchJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: BG_COLOR,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderRadius: scale(40),

    alignSelf: "center",
    width: "90%",
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    marginTop: moderateScale(15),
    paddingLeft: scale(15),
    height: moderateScale(50),
  },
  searchicon: {
    width: scale(15),
    height: scale(15),
    tintColor: TEXT_COLOR,
  },
  searchText: {
    width: "80%",
    fontSize: moderateScale(16),
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
    marginLeft: scale(10),
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
  saveText: {
    fontSize: moderateScale(12),
    color: "#2196F3",
  },
  noResults: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
  },
});
