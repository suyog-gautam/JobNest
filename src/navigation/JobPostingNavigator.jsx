import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UseAuth } from "../utils/AuthContext";
import DashboardForCompany from "../screens/job-posting/DashboardForCompany";
import EditJobs from "../screens/job-posting/tabs/EditJobs";
import AddJobs from "../screens/job-posting/tabs/AddJobs";
import UpdateCompanyProfile from "../screens/job-posting/tabs/UpdateCompanyProfile";
import ChangeProfilePicForCompany from "../screens/job-posting/tabs/ChangeProfilePicForCompany";
import SelectUser from "../screens/onboarding/SelectUser";
import { useNavigation } from "@react-navigation/native";
import Main from "../screens/job-searching/Main";
import MainNavigator from "./MainNavigator";
import LoginForCompany from "../screens/job-posting/LoginForCompany";

import JobSearchingNavigator from "./JobSearchingNavigator";
import SignUpForCompany from "../screens/job-posting/SignUpForCompany";
const Stack = createStackNavigator();

const JobPostingNavigator = () => {
  const navigation = useNavigation();
  const { user } = UseAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("MainNavigator");
    } else if (user?.role === "Recruiter") {
      return;
    } else {
      navigation.navigate("JobSearchingNavigator");
    }
  }, [user]);
  useEffect(() => {
    if (!user) {
      navigation.navigate("SelectUser");
    } else if (user?.role === "Candidate") {
      navigation.navigate("Main");
    }
  }, [user, navigation]);

  return (
    <Stack.Navigator>
      {user?.role === "Recruiter" ? (
        <>
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
            name="LoginForCompany"
            component={LoginForCompany}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpForCompany"
            component={SignUpForCompany}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default JobPostingNavigator;
