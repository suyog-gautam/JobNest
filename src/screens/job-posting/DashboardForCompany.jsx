import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { verticalScale, scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../utils/Loader";
import { getColors } from "../../utils/colors";
import { useTheme } from "../../utils/ThemeContext";
import MyJobs from "./tabs/MyJobs";
import SearchCandidates from "./tabs/SearchCandidates";
import Submissions from "./tabs/Submissions";
import Profile from "./tabs/Profile";
import { useNavigation } from "@react-navigation/native";

const DashboardForCompany = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");
  const navigation = useNavigation(); // Correct spelling
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
    },
    visible: {
      opacity: 1,
      height: "100%",
    },
    hidden: {
      opacity: 0, // Make it invisible but still occupy space
      height: 0, // Shrink the height to remove it from the layout
    },
    bottomView: {
      backgroundColor: BG_COLOR,
      width: "100%",
      height: verticalScale(50),
      position: "absolute",
      bottom: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowOpacity: 0.8,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    bottomTab: {
      height: "100%",
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
      borderTopColor: "grey",
      borderTopWidth: 2.5,
    },
    tabIcon: {
      width: scale(25),
      height: scale(25),
      tintColor: "grey",
    },
    activeTab: {
      borderTopColor: "red",
      borderTopWidth: 3,
    },
    activeIcon: {
      tintColor: "red",
    },
    addTab: {
      height: "100%",
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
      borderTopColor: "grey",
      borderTopWidth: 2.5,
    },
    addIcon: {
      width: scale(28),
      height: scale(28),
      tintColor: TEXT_COLOR, // Always black color for add button
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Start loader
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
          setUser(JSON.parse(value)); // Parse the JSON string back to an object
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchUserData(); // Call the function to fetch the data
  }, []);

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleAddJobPress = () => {
    navigation.navigate("AddJobs"); // Ensure correct spelling
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      {/* Home Tab */}
      <View
        style={[
          styles.tabContent,
          selectedTab === "home" ? styles.visible : styles.hidden,
        ]}
      >
        <MyJobs />
      </View>

      {/* Search Tab */}
      <View
        style={[
          styles.tabContent,
          selectedTab === "search" ? styles.visible : styles.hidden,
        ]}
      >
        <SearchCandidates />
      </View>

      {/* Submissions Tab */}
      <View
        style={[
          styles.tabContent,
          selectedTab === "chat" ? styles.visible : styles.hidden,
        ]}
      >
        <Submissions />
      </View>

      {/* Profile Tab */}
      <View
        style={[
          styles.tabContent,
          selectedTab === "profile" ? styles.visible : styles.hidden,
        ]}
      >
        <Profile
          onJobClick={() => {
            setSelectedTab("home");
          }}
        />
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[styles.bottomTab, selectedTab === "home" && styles.activeTab]}
          onPress={() => handleTabPress("home")}
        >
          <Image
            source={require("../../images/home.png")}
            style={[
              styles.tabIcon,
              selectedTab === "home" && styles.activeIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomTab,
            selectedTab === "search" && styles.activeTab,
          ]}
          onPress={() => handleTabPress("search")}
        >
          <Image
            source={require("../../images/search-user.png")}
            style={[
              styles.tabIcon,
              selectedTab === "search" && styles.activeIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addTab} onPress={handleAddJobPress}>
          <Image
            source={require("../../images/addition.png")}
            style={styles.addIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomTab, selectedTab === "chat" && styles.activeTab]}
          onPress={() => handleTabPress("chat")}
        >
          <Image
            source={require("../../images/notification.png")}
            style={[
              styles.tabIcon,
              selectedTab === "chat" && styles.activeIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomTab,
            selectedTab === "profile" && styles.activeTab,
          ]}
          onPress={() => handleTabPress("profile")}
        >
          <Image
            source={require("../../images/user.png")}
            style={[
              styles.tabIcon,
              selectedTab === "profile" && styles.activeIcon,
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardForCompany;
