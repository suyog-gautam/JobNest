import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getColors } from "../../utils/colors";
import { useTheme } from "../../utils/ThemeContext";
import CustomText from "../../utils/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { UseAuth } from "../../utils/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
const CustomDrawer = () => {
  const { theme, setTheme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const { user } = UseAuth();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
      borderRightWidth: 0.2,
      borderRightColor: "white",
    },
    topView: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: scale(20),
    },
    profileImage: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
    },
    headerText: {
      fontSize: scale(14),
      fontFamily: "Poppins_700Bold",
      color: TEXT_COLOR,
      marginLeft: scale(10),
    },
    subHeaderText: {
      fontSize: scale(10),
      color: TEXT_COLOR,
      marginLeft: scale(10),
      marginTop: scale(0),
      width: "70%",
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
    seperator: {
      width: "100%",
      height: moderateScale(1),
      backgroundColor: TEXT_COLOR,
      marginTop: scale(20),
      opacity: 0.2,
    },
    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: scale(10),
      height: scale(40),
    },
    icon: {
      width: scale(20),
      height: scale(20),
      tintColor: TEXT_COLOR,
    },
    itemText: {
      fontFamily: "Poppins_700Bold",
      fontSize: scale(13),
      color: TEXT_COLOR,
      marginLeft: scale(15),
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.user?.uid) {
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
        }
      }
    };

    fetchUserData();
  }, [user]);
  const handleAppTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image
          source={
            userData?.profilePictureUrl
              ? { uri: userData.profilePictureUrl }
              : require("../../images/profile.png")
          }
          style={styles.profileImage}
        />
        <View>
          <CustomText style={styles.headerText}>
            {user?.name ? user.name : "Build Your Profile"}
          </CustomText>
          <CustomText style={styles.subHeaderText}>
            {user?.email
              ? user.email
              : "Job Oppurtunity is Waiting for you at Job Nest"}
          </CustomText>
        </View>
      </View>
      {user ? null : (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.loginBtn}>
            <CustomText style={styles.loginTxt}>Login</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn}>
            <CustomText style={styles.signupTxt}>Register</CustomText>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.seperator} />
      <FlatList
        contentContainerStyle={{ marginTop: scale(20) }}
        data={[
          user
            ? {
                title: "Saved Jobs",
                icon: require("../../images/bookmark.png"),
                onPress: () => navigation.navigate("SavedJobs"),
              }
            : null,

          {
            title: "Theme",
            icon: require("../../images/theme.png"),
            onPress: handleAppTheme,
          },
          user
            ? {
                title: "Logout",
                icon: require("../../images/logout.png"),
                onPress: handleLogout,
              }
            : null,
        ].filter(Boolean)}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={item.onPress ? item.onPress : null} // Ensure onPress is defined
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={item.icon} style={styles.icon} />
                <CustomText style={styles.itemText}>{item.title}</CustomText>
              </View>
              <Image
                source={require("../../images/right.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CustomDrawer;
