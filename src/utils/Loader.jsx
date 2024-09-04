import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";
import { scale, moderateScale } from "react-native-size-matters";
import CustomText from "./CustomText";
import { BG_COLOR } from "./colors";
const Loader = () => {
  return (
    <Modal transparent={true} animationType="none">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Inner container for loader and text with 0.5 opacity */}
        <View
          style={{
            padding: moderateScale(20),
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: moderateScale(10),
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#FFF" />
          <CustomText
            style={{
              color: "#FFF",
              marginTop: moderateScale(10),
              fontSize: scale(12),
            }}
          >
            PLEASE WAIT...
          </CustomText>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
