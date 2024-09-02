import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/job-searching/Main";
import SearchJobs from "../screens/job-searching/tabs/SearchJobs";
import SingleJob from "../screens/job-searching/tabs/SingleJob";
import LoginForUsers from "../screens/job-searching/LoginForUsers";
import SingupForUsers from "../screens/job-searching/SingupForUsers";
import SavedJobs from "../screens/job-searching/tabs/SavedJobs";
import { BG_COLOR, TEXT_COLOR } from "../utils/colors";
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
        options={{
          headerShown: true,
          title: "Search Jobs",
          headerTitleAlign: "center",
          headerTintColor: TEXT_COLOR,

          headerStyle: {
            backgroundColor: BG_COLOR,
            height: 70,
            shadowColor: TEXT_COLOR,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      />
      <Stack.Screen
        name="SingleJob"
        component={SingleJob}
        options={{
          headerShown: true,
          title: "Job Details",
          headerTitleAlign: "center",
          headerTintColor: TEXT_COLOR,

          headerStyle: {
            backgroundColor: BG_COLOR,
            height: 70,
            shadowColor: TEXT_COLOR,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobs}
        options={{
          headerShown: true,
          title: "Saved Jobs",
          headerTitleAlign: "center",
          headerTintColor: TEXT_COLOR,

          headerStyle: {
            backgroundColor: BG_COLOR,
            height: 70,
            shadowColor: TEXT_COLOR,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      />
      <Stack.Screen
        name="LoginForUsers"
        component={LoginForUsers}
        options={{
          headerShown: true,
          title: "Login",
          headerTitleAlign: "center",
          headerTintColor: TEXT_COLOR,

          headerStyle: {
            backgroundColor: BG_COLOR,
            height: 70,
            shadowColor: TEXT_COLOR,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      />
      <Stack.Screen
        name="SignupForUsers"
        component={SingupForUsers}
        options={{
          headerShown: true,
          title: "Create Acount",
          headerTitleAlign: "center",
          headerTintColor: TEXT_COLOR,

          headerStyle: {
            backgroundColor: BG_COLOR,
            height: 70,
            shadowColor: TEXT_COLOR,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;
