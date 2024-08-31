import { View, Text } from "react-native";
import React from "react";
import NoLogin from "../../../components/NoLogin";

const Profile = () => {
  return (
    <View>
      <NoLogin
        heading="Manage Your Profile"
        description="Update your resume, change your profile picture, and keep your information up-to-date."
      />
    </View>
  );
};

export default Profile;
