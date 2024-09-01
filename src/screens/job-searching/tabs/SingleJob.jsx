import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import CustomText from "../../../utils/CustomText";
import { moderateScale } from "react-native-size-matters";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;
const SingleJob = () => {
  const route = useRoute();
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: moderateScale(50) }}>
        <CustomText style={styles.jobTitle}>
          {job.jobTitle} in {job.company}
        </CustomText>
        <CustomText style={styles.jobDescription}>
          {job.jobDescription}
        </CustomText>

        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Department:</CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            {job.department}
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Skills Required:</CustomText>
          <CustomText style={styles.skillDetails}>{job.skills}</CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Experience:</CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            {job.experience} Years
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>Package:</CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            ₹ {job.package}
          </CustomText>
        </View>
        <View style={styles.detailsRow}>
          <CustomText style={styles.otherDetails}>
            Application Deadline:
          </CustomText>
          <CustomText
            style={[styles.otherDetails, { fontFamily: "Poppins_400Regular" }]}
          >
            {job.applicationDeadline}
          </CustomText>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveBtn}>
          <Image
            source={require("../../../images/bookmark.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn}>
          <CustomText style={styles.applyText}>Apply Now</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: moderateScale(10),
  },
  jobTitle: {
    fontSize: moderateScale(20),
    fontFamily: "Poppins_700Bold",
    color: TEXT_COLOR,
    width: "90%",
    alignSelf: "center",

    marginTop: moderateScale(20),
  },

  jobDescription: {
    width: "90%",
    fontFamily: "Poppins_400Regular",
    alignSelf: "center",
    fontSize: moderateScale(16),
    marginTop: moderateScale(10),
    color: TEXT_COLOR,
  },
  detailsRow: {
    flexDirection: "row",
    width: "90%",
    gap: moderateScale(20),
    alignSelf: "center",
  },

  otherDetails: {
    fontSize: moderateScale(16),

    marginVertical: 6,
  },
  skillDetails: {
    fontSize: moderateScale(16),
    marginVertical: 6,
    width: "60%",
    color: TEXT_COLOR,
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 3,
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(20),
    justifyContent: "space-evenly",

    alignSelf: "center",
  },

  applyBtn: {
    backgroundColor: TEXT_COLOR,
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    color: BG_COLOR,
    width: 0.65 * screenWidth,

    marginRight: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
  },
  saveBtn: {
    backgroundColor: BG_COLOR,
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    width: 0.2 * screenWidth,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: moderateScale(10),
  },
  icon: {
    width: moderateScale(23),
    height: moderateScale(23),
    tintColor: TEXT_COLOR,
  },
});
