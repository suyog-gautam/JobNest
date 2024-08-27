import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../../utils/CustomText";

const Profile = () => {
  const handleEditProfile = () => {
    // Navigate to edit profile or perform edit action
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Replace with your profile picture URL
          style={styles.profilePicture}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
          <MaterialIcons name="edit" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <CustomText style={styles.label}>Name</CustomText>
        <Text style={styles.infoText}>John Doe</Text>

        <CustomText style={styles.label}>Email</CustomText>
        <Text style={styles.infoText}>johndoe@gmail.com</Text>

        <CustomText style={styles.label}>Phone</CustomText>
        <Text style={styles.infoText}>+1 234 567 890</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: moderateScale(20),
  },
  header: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  headerText: {
    fontSize: moderateScale(26),
    fontWeight: "bold",
    color: "#34495e",
    fontFamily: "Poppins_600Bold",
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(30),
  },
  profilePicture: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: "#E0E0E0",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: moderateScale(10),
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    padding: moderateScale(5),
    elevation: 3,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: moderateScale(14),
    color: "#7f8c8d",
    fontFamily: "Poppins_400Regular",
    marginBottom: verticalScale(4),
  },
  infoText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins_500Medium",
    color: "#34495e",
    marginBottom: verticalScale(10),
  },
});
