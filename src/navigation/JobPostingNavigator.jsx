import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForCompany from "../screens/job-posting/LoginForCompany";
import SignUpForCompany from "../screens/job-posting/SignUpForCompany";
import DashboardForCompany from "../screens/job-posting/DashboardForCompany";
import EditJobs from "../screens/job-posting/tabs/EditJobs";
import AddJobs from "../screens/job-posting/tabs/AddJobs";
import UpdateCompanyProfile from "../screens/job-posting/tabs/UpdateCompanyProfile";
import ChangeProfilePicForCompany from "../screens/job-posting/tabs/ChangeProfilePicForCompany";
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
        component={ChangeProfilePicForCompany}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default JobPostingNavigator;
