import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../utils/CustomText";

import Ionicons from "@expo/vector-icons/Ionicons";
import { getColors } from "../utils/colors";
import { useTheme } from "../utils/ThemeContext";
const ProfileOptions = ({ title, icon, onClick }) => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  return (
    <TouchableOpacity
      style={{
        width: " 90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignltems: "center",
        marginTop: moderateScale(20),
      }}
      onPress={() => {
        onClick();
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={icon}
          style={{
            width: moderateScale(25),
            height: moderateScale(25),
            tintColor: TEXT_COLOR,
          }}
        />
        <CustomText
          style={{
            color: TEXT_COLOR,
            fontSize: moderateScale(16),
            marginLeft: moderateScale(20),
          }}
        >
          {title}
        </CustomText>
      </View>
      <Image
        source={require("../images/right.png")}
        style={{
          height: moderateScale(20),
          width: moderateScale(20),
          tintColor: TEXT_COLOR,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileOptions;
