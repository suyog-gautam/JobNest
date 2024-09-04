import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../../utils/CustomText";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig";
import ProfileOptions from "../../../components/ProfileOptions";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../utils/Loader";
import NoLogin from "../../../components/NoLogin";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import { UseAuth } from "../../../utils/AuthContext";
const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = UseAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.user?.uid) {
        setLoading(true);

        try {
          const userDocRef = doc(firestore, "users", user.user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);
  const handlePictureChange = () => {
    navigation.navigate("ChangeProfilePicForUser");
  };
  const handleResume = () => {
    navigation.navigate("ManageResume");
  };
  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("user");
              alert("Logged out successfully");
              navigation.reset({
                index: 0,
                routes: [{ name: "SelectUser" }],
              });
            } catch (error) {
              console.error("Error logging out: ", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View>
      {loading && <Loader />}
      {!user ? (
        <NoLogin
          heading="Manage Your Profile"
          description="Update your resume, change your profile picture, and keep your information up-to-date."
        />
      ) : (
        <>
          <View style={styles.profileSection}>
            <Image
              source={
                userData?.profilePictureUrl
                  ? { uri: userData?.profilePictureUrl }
                  : require("../../../images/profile.png")
              }
              style={styles.profilePicture}
            />
            <CustomText style={styles.userName}> {userData?.name}</CustomText>
            <CustomText style={styles.userEmail}>{userData?.email}</CustomText>
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity
                onPress={handlePictureChange}
                style={styles.actionButton}
              >
                <CustomText style={styles.actionText}>
                  Change Picture
                </CustomText>
              </TouchableOpacity>
            </View>
            <ProfileOptions
              title="Manage Resume"
              icon={require("../../../images/resume.png")}
              onClick={handleResume}
            />
            <ProfileOptions
              title="Log Out"
              icon={require("../../../images/logout.png")}
              onClick={handleLogout}
            />
          </View>
        </>
      )}
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
  userEmail: {
    fontSize: moderateScale(15),
    color: TEXT_COLOR,
    marginTop: verticalScale(3),
  },
  actionButtonContainer: {
    width: "100%",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionButton: {
    padding: moderateScale(10),
    width: "40%",
    paddingHorizontal: moderateScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: TEXT_COLOR,
    BorderColor: "#34495e",
    borderWidth: 1,
  },
  actionText: {
    textAlign: "center",
    fontSize: moderateScale(15),

    color: BG_COLOR,
    fontFamily: "Poppins_400Regular",
  },
});
