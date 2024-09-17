import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/job-searching/Main";
import SearchJobs from "../screens/job-searching/tabs/SearchJobs";
import SingleJob from "../screens/job-searching/tabs/SingleJob";
import SavedJobs from "../screens/job-searching/tabs/SavedJobs";
import ChangeProfilePicForUser from "../screens/job-searching/tabs/ChangeProfilePicForUser";
import ManageResume from "../screens/job-searching/tabs/ManageResume";
import { useTheme } from "../utils/ThemeContext";
import { getColors } from "../utils/colors";
import AuthRoute from "./AuthRoute";

const Stack = createStackNavigator();

const JobSearchingNavigator = () => {
  const { theme } = useTheme();
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);

  return (
    <AuthRoute fallbackScreen="Main">
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
            headerTitleStyle: {
              marginBottom: 10,
            },
            headerTintColor: TEXT_COLOR,
            headerStyle: {
              backgroundColor: BG_COLOR,
              height: 80,
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
            headerTitleStyle: {
              marginBottom: 10,
            },
            headerTintColor: TEXT_COLOR,
            headerStyle: {
              backgroundColor: BG_COLOR,
              height: 80,
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
            headerTitleStyle: {
              marginBottom: 10,
            },
            headerStyle: {
              backgroundColor: BG_COLOR,
              height: 80,
              shadowColor: TEXT_COLOR,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          }}
        />
        <Stack.Screen
          name="ManageResume"
          component={ManageResume}
          options={{
            headerShown: true,
            title: "Manage Resume",
            headerTitleAlign: "center",
            headerTintColor: TEXT_COLOR,
            headerTitleStyle: {
              marginBottom: 10,
            },
            headerStyle: {
              backgroundColor: BG_COLOR,
              height: 80,
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
            headerTitleStyle: {
              marginBottom: 10,
            },
            headerStyle: {
              backgroundColor: BG_COLOR,
              height: 80,
              shadowColor: TEXT_COLOR,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          }}
        />
      </Stack.Navigator>
    </AuthRoute>
  );
};

export default JobSearchingNavigator;
