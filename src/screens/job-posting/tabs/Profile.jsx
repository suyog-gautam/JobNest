import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../../utils/CustomText";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import ProfileOptions from "../../../components/ProfileOptions";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../utils/Loader";
const Profile = ({ onJobClick }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const value = await AsyncStorage.getItem("updateData");
        const photo = await AsyncStorage.getItem("user");
        if (photo) {
          const data = JSON.parse(photo);
          setProfilePictureUrl(data?.profilePictureUrl);
          console.log("photo", data?.profilePictureUrl);
        }

        if (value) {
          const parsedUser = JSON.parse(value);

          setUserData(parsedUser);
        }

        const jobs = await AsyncStorage.getItem("noOfJobs");
        if (jobs) {
          setTotalJobs(jobs);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate("UpdateCompanyProfile");
  };
  const handlePictureChange = () => {
    navigation.navigate("ChangeProfilePicForCompany");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={
            profilePictureUrl
              ? { uri: profilePictureUrl }
              : require("../../../images/user.png")
          }
          style={styles.profilePicture}
        />
        <CustomText style={styles.userName}>{userData?.name}</CustomText>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            onPress={handlePictureChange}
            style={styles.actionButton}
          >
            <CustomText style={styles.actionText}>Change Picture</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.actionButton}
          >
            <CustomText style={styles.actionText}>Update Profile</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <ProfileOptions
        title={`My Jobs (${totalJobs})`}
        icon={require("../../../images/jobs.png")}
        onClick={() => {
          onJobClick();
        }}
      />
      <ProfileOptions
        title="Contact"
        icon={require("../../../images/contact.png")}
      />
      <ProfileOptions
        title="App Theme"
        icon={require("../../../images/theme.png")}
      />
      <ProfileOptions
        title="Log Out"
        icon={require("../../../images/logout.png")}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: moderateScale(20),
  },
  header: {
    marginTop: verticalScale(10),
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  headerText: {
    fontSize: moderateScale(26),
    fontWeight: "700",
    fontFamily: "Poppins_600Bold",
    color: TEXT_COLOR,
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(40),
  },
  profilePicture: {
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(50),
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: TEXT_COLOR,
  },
  userName: {
    fontSize: moderateScale(20),
    color: TEXT_COLOR,
    fontWeight: "700",
    fontFamily: "Poppins_600Medium",
    marginTop: verticalScale(10),
  },
  actionButtonContainer: {
    width: "100%",
    marginTop: verticalScale(20),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionButton: {
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: TEXT_COLOR,
    BorderColor: "#34495e",
    borderWidth: 1,
  },
  actionText: {
    fontSize: moderateScale(14),

    color: BG_COLOR,
    fontFamily: "Poppins_400Regular",
  },
});
