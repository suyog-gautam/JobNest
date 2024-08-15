// CustomText.js
import React from "react";
import { Text, StyleSheet } from "react-native";

const CustomText = ({ style, children, ...props }) => (
  <Text style={[styles.defaultStyle, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "Poppins_500Medium",
  },
});

export default CustomText;
