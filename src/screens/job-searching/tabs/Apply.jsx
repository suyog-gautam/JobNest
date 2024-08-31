import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NoLogin from "../../../components/NoLogin";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import CustomSolidBtn from "../../../components/CustomSolidBtn";
import CustomText from "../../../utils/CustomText";
import { moderateScale } from "react-native-size-matters";

const Apply = () => {
  return (
    <View style={styles.conatiner}>
      <NoLogin
        heading="One place to track all you Job applications"
        description={
          "Track all of your jobs that you applied but for that you need to create account"
        }
      />
    </View>
  );
};

export default Apply;
const styles = StyleSheet.create({
  conatiner: {
    backgroudColor: BG_COLOR,
  },
});
