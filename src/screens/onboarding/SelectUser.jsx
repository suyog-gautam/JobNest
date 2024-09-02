import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BG_COLOR, TEXT_COLOR } from "../../utils/colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../utils/CustomText";
import JobSearchingNavigator from "../../navigation/JobSearchingNavigator";
import { UseAuth } from "../../utils/AuthContext";
import { useEffect } from "react";
const screenWidth = Dimensions.get("window").width;

const SelectUser = () => {
  const { user } = UseAuth();
  useEffect(() => {}, [user]);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />

      <CustomText style={styles.title}>What you are looking for?</CustomText>
      <TouchableOpacity
        style={styles.wantToHire}
        onPress={() => navigation.navigate("LoginForCompany")} // Use a lambda to defer execution
      >
        <CustomText style={styles.buttonHire}>
          Want To Hire Candidate
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wantToSearch}
        onPress={() => navigation.navigate("JobSearchingNavigator")} // Use a lambda to defer execution
      >
        <CustomText style={styles.buttonFind}>Want To Get Job</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    backgroundColor: BG_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: moderateScale(85),
    height: moderateScale(85),
    marginBottom: moderateScale(30),
    borderRadius: moderateScale(7),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  wantToHire: {
    width: screenWidth * 0.9,
    height: verticalScale(45),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  wantToSearch: {
    width: screenWidth * 0.9,
    height: verticalScale(50),
    borderColor: TEXT_COLOR,
    borderWidth: 2,
    backgroundColor: BG_COLOR,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  buttonFind: {
    color: TEXT_COLOR,
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  buttonHire: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
});

export default SelectUser;
