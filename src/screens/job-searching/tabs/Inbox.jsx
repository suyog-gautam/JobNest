import { View, Text } from "react-native";
import React from "react";
import NoLogin from "../../../components/NoLogin";

const Inbox = () => {
  return (
    <View>
      <NoLogin
        heading="Connect with Recruiters"
        description="Start conversations with potential employers and build your professional network."
      />
    </View>
  );
};

export default Inbox;
