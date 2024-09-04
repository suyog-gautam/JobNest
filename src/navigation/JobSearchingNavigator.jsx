import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/job-searching/Main";
import SearchJobs from "../screens/job-searching/tabs/SearchJobs";
import SingleJob from "../screens/job-searching/tabs/SingleJob";
import LoginForUsers from "../screens/job-searching/LoginForUsers";
import SingupForUsers from "../screens/job-searching/SingupForUsers";
import SavedJobs from "../screens/job-searching/tabs/SavedJobs";
import { BG_COLOR, TEXT_COLOR } from "../utils/colors";
import { UseAuth } from "../utils/AuthContext";
import ChangeProfilePicForUser from "../screens/job-searching/tabs/ChangeProfilePicForUser";
import ManageResume from "../screens/job-searching/tabs/ManageResume";
import SelectUser from "../screens/onboarding/SelectUser";

const JobSearchingNavigator = () => {
  const Stack = createStackNavigator();
  const { user } = UseAuth();

  return (
    <Stack.Navigator>
      {/* The Main Screen should always be shown */}
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />

      {/* Conditionally show Login and Signup only if user is not logged in */}

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
          title: "Create Account",
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

      {/* These screens should always be accessible */}
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
        name="ChangeProfilePicForUser"
        component={ChangeProfilePicForUser}
        options={{
          headerShown: true,
          title: "Change Profile Picture",
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
        name="SelectUser"
        component={SelectUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageResume"
        component={ManageResume}
        options={{
          headerShown: true,
          title: "Manage Resume",
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
    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;
