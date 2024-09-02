import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR, TEXT_COLOR } from "../../utils/colors";
import CustomText from "../../utils/CustomText";
import { moderateScale, scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { UseAuth } from "../../utils/AuthContext";
const CustomDrawer = () => {
  const navigation = useNavigation();
  const { user } = UseAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image
          source={require("../../images/profile.png")}
          style={styles.profileImage}
        />
        <View>
          <CustomText style={styles.headerText}>
            {user.name ? user.name : "Build Your Profile"}
          </CustomText>
          <CustomText style={styles.subHeaderText}>
            {user.email
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
          { title: "Rate Us", icon: require("../../images/rateus.png") },
          { title: "Theme", icon: require("../../images/theme.png") },
          user
            ? { title: "Logout", icon: require("../../images/logout.png") }
            : null,
        ]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={item.onPress ? item.onPress : null}
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
