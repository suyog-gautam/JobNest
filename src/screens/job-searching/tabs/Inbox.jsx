import { View, Text } from "react-native";
import React from "react";
import NoLogin from "../../../components/NoLogin";
import { UseAuth } from "../../../utils/AuthContext";
const Submissions = () => {
  const { user } = UseAuth();
  return (
    <View>
      {!user ? (
        <NoLogin
          heading="Connect with Recruiters"
          description="Start conversations with potential employers and build your professional network."
        />
      ) : (
        <Text>Logged In</Text>
      )}
    </View>
  );
};

export default Submissions;
