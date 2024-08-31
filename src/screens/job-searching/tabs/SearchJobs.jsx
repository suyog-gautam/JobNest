import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import { scale, moderateScale } from "react-native-size-matters";
const SearchJobs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={require("../../../images/search.png")}
          style={styles.icon}
        />
        <TextInput
          style={styles.searchText}
          placeholder="Search for Jobs"
          placeholderTextColor={"grey"}
        ></TextInput>
        <Image
          source={require("../../../images/search.png")}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default SearchJobs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: moderateScale(40),
    paddingLeft: scale(15),
    height: moderateScale(50),
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: TEXT_COLOR,
  },
  searchText: {
    padding: 10,
    width: "80%",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: TEXT_COLOR,
    marginLeft: 10,
  },
});
