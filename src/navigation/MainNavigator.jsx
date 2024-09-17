import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UseAuth } from "../utils/AuthContext";
import JobPostingNavigator from "./JobPostingNavigator";
import JobSearchingNavigator from "./JobSearchingNavigator";
import SelectUser from "../screens/onboarding/SelectUser";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../utils/ThemeContext";
import { getColors } from "../utils/colors";
import LoginForCompany from "../screens/job-posting/LoginForCompany";
import LoginForUsers from "../screens/job-searching/LoginForUsers";
import SignupForUsers from "../screens/job-searching/SingupForUsers";
import SignUpForCompany from "../screens/job-posting/SignUpForCompany";
import Main from "../screens/job-searching/Main";

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const { user } = UseAuth();
  const navigation = useNavigation();

  // Redirect based on the user's role after login
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigation.reset({
        index: 0,
        routes: [{ name: "JobPostingNavigator" }],
      });
    } else if (user?.role === "Candidate") {
      navigation.reset({
        index: 0,
        routes: [{ name: "JobSearchingNavigator" }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "SelectUser" }],
      });
    }
  }, [user]);

  return (
    <Stack.Navigator>
      {/* Initial User Selection or Login */}
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
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpForCompany"
            component={SignUpForCompany}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginForUsers"
            component={LoginForUsers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupForUsers"
            component={SignupForUsers}
            options={{ headerShown: false }}
          />
        </>
      ) : null}

      {/* Navigators based on user role */}
      {user?.role === "Recruiter" ? (
        <Stack.Screen
          name="JobPostingNavigator"
          component={JobPostingNavigator}
          options={{ headerShown: false }}
        />
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
