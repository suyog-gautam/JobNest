import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobPostingNavigator from "./JobPostingNavigator";
import JobSearchingNavigator from "./JobSearchingNavigator";
import LoginForCompany from "../screens/job-posting/LoginForCompany";
import LoginForUsers from "../screens/job-searching/LoginForUsers";
import SignUpForCompany from "../screens/job-posting/SignUpForCompany";
import SignupForUsers from "../screens/job-searching/SingupForUsers";
import SelectUser from "../screens/onboarding/SelectUser";
import SearchJobs from "../screens/job-searching/tabs/SearchJobs";
import { UseAuth } from "../utils/AuthContext";

import { useNavigation } from "@react-navigation/native";
import { BG_COLOR, TEXT_COLOR } from "../utils/colors";
import Main from "../screens/job-searching/Main";
import DashboardForCompany from "../screens/job-posting/DashboardForCompany";
import JobDetail from "../screens/job-posting/tabs/JobDetail";
const Stack = createStackNavigator();

const MainNavigator = () => {
  const navigation = useNavigation();
  const { user } = UseAuth();
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigation.navigate("JobPostingNavigator");
    } else if (user?.role === "Candidate") {
      navigation.navigate("JobSearchingNavigator");
    } else {
      return;
    }
  }, [user]);

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="SelectUser"
            component={SelectUser}
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
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JobSearchingNavigator"
            component={JobSearchingNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginForUsers"
            component={LoginForUsers}
            options={{ headerShown: true, title: "Login" }}
          />
          <Stack.Screen
            name="SignupForUsers"
            component={SignupForUsers}
            options={{ headerShown: true, title: "Create Account" }}
          />
          <Stack.Screen
            name="DashboardForCompany"
            component={DashboardForCompany}
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
            name="JobDetail"
            component={JobDetail}
            options={{ headerShown: true }}
          />
        </>
      ) : user?.role === "Recruiter" ? (
        <>
          <Stack.Screen
            name="JobPostingNavigator"
            component={JobPostingNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="JobSearchingNavigator"
          component={JobSearchingNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
