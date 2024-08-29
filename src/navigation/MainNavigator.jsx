import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobPostingNavigator from "./JobPostingNavigator";
import JobSearchingNavigator from "./JobSearchingNavigator";

import SelectUser from "../screens/onboarding/SelectUser";
import DashboardForCompany from "../screens/job-posting/DashboardForCompany";
import AddJobs from "../screens/job-posting/tabs/AddJobs";
import EditJobs from "../screens/job-posting/tabs/EditJobs";
import UpdateCompanyProfile from "../screens/job-posting/tabs/UpdateCompanyProfile";
import ChangProfilePicForCompany from "../screens/job-posting/tabs/ChangeProfilePicForCompany";
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectUser"
        component={SelectUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobPostingNavigator"
        component={JobPostingNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobSearchingNavigator"
        component={JobSearchingNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DashboardForCompany"
        component={DashboardForCompany}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddJobs"
        component={AddJobs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditJobs"
        component={EditJobs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateCompanyProfile"
        component={UpdateCompanyProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeProfilePicForCompany"
        component={ChangProfilePicForCompany}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
