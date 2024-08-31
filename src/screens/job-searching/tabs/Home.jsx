import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import CustomText from "../../../utils/CustomText";
import { moderateScale, scale } from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
import CustomSolidBtn from "../../../components/CustomSolidBtn";
import { useNavigation } from "@react-navigation/native";
import SearchJobs from "./SearchJobs";
const Home = () => {
  const navigation = useNavigation();
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
          style={styles.icon}
        />
        <CustomText style={styles.searchText}>Search for Jobs</CustomText>
      </TouchableOpacity>

      <CustomText style={styles.headerText}>
        {"You are one step away from getting Job"}
      </CustomText>
      <View style={styles.notes}>
        <Image
          source={require("../../../images/star.png")}
          style={styles.icon}
        />
        <CustomText style={styles.noteText}>
          {"Get Jobs after creating account"}
        </CustomText>
      </View>
      <View style={styles.notes}>
        <Image
          source={require("../../../images/star.png")}
          style={styles.icon}
        />
        <CustomText style={styles.noteText}>
          {"Chat with Employers and get hired"}
        </CustomText>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.loginBtn}>
          <CustomText style={styles.loginTxt}>Login</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn}>
          <CustomText style={styles.signupTxt}>Register</CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.jobsearchCard}>
        <Image
          source={require("../../../images/search.gif")}
          style={styles.gif}
        />
        <TextInput
          placeholder="Enter Job Title"
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Enter Job Type"
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn}>
          <CustomText style={styles.searchBtnText}>Search Jobs</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
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
  icon: {
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

    borderRadius: scale(40),
    marginTop: scale(20),
  },
  searchBtnText: {
    color: BG_COLOR,
    fontSize: scale(16),

    fontFamily: "Poppins_400Regular",
  },
});
