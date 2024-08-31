import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/job-searching/Main";
import SearchJobs from "../screens/job-searching/tabs/SearchJobs";
const JobSearchingNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchJobs"
        component={SearchJobs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;
