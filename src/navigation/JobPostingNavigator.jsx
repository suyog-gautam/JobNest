import { View, Text } from "react-native";
import React from "react";
import LoginForCompany from "../screens/job-posting/LoginForCompany";
import SignUpForCompany from "../screens/job-posting/SignUpForCompany";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const JobPostingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginForCompany"
        component={LoginForCompany}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpForCompany"
        component={SignUpForCompany}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default JobPostingNavigator;
