import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { getColors } from "../../utils/colors";
import { useTheme } from "../../utils/ThemeContext";
import { verticalScale, scale } from "react-native-size-matters";
import Home from "./tabs/Home";
import Apply from "./tabs/Apply";
import Inbox from "./tabs/Inbox";
import Profile from "./tabs/Profile";
const DrawerScreen = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [selectedTab, setSelectedTab] = useState("home");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
    },
    bottomNavView: {
      backgroundColor: BG_COLOR,
      width: "100%",
      height: verticalScale(50),
      position: "absolute",
      bottom: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowOpacity: 0.8,

      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderTopColor: "grey",
      borderTopWidth: 0.5,
    },
    bottomTab: {
      height: "100%",
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    tabIcon: {
      width: scale(25),
      height: scale(25),
      tintColor: TEXT_COLOR,
    },
    visible: {
      opacity: 1,
      height: "100%",
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  });
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <View style={styles.container}>
      <View style={[selectedTab === "home" ? styles.visible : styles.hidden]}>
        <Home />
      </View>
      <View style={[selectedTab === "send" ? styles.visible : styles.hidden]}>
        <Apply />
      </View>

      <View style={{ display: selectedTab === "chat" ? "flex" : "none" }}>
        <Inbox />
      </View>
      <View style={{ display: selectedTab === "profile" ? "flex" : "none" }}>
        <Profile />
      </View>

      <View style={styles.bottomNavView}>
        <TouchableOpacity
          style={[styles.bottomTab]}
          onPress={() => handleTabPress("home")}
        >
          <Image
            source={
              selectedTab === "home"
                ? require("../../images/home.png")
                : require("../../images/home1.png")
            }
            style={[styles.tabIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomTab]}
          onPress={() => handleTabPress("send")}
        >
          <Image
            source={
              selectedTab == "send"
                ? require("../../images/send.png")
                : require("../../images/send1.png")
            }
            style={[styles.tabIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomTab]}
          onPress={() => handleTabPress("chat")}
        >
          <Image
            source={
              selectedTab == "chat"
                ? require("../../images/bookmarkfiiled.png")
                : require("../../images/bookmark.png")
            }
            style={[styles.tabIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomTab]}
          onPress={() => handleTabPress("profile")}
        >
          <Image
            source={
              selectedTab == "profile"
                ? require("../../images/user.png")
                : require("../../images/user1.png")
            }
            style={[styles.tabIcon]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen;
