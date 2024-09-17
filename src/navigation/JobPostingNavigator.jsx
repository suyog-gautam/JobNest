import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UseAuth } from "../utils/AuthContext";
import DashboardForCompany from "../screens/job-posting/DashboardForCompany";
import AddJobs from "../screens/job-posting/tabs/AddJobs";
import EditJobs from "../screens/job-posting/tabs/EditJobs";
import UpdateCompanyProfile from "../screens/job-posting/tabs/UpdateCompanyProfile";
import ChangeProfilePicForCompany from "../screens/job-posting/tabs/ChangeProfilePicForCompany";
import { useTheme } from "../utils/ThemeContext";
import { getColors } from "../utils/colors";
import AuthRoute from "./AuthRoute";
import JobDetail from "../screens/job-posting/tabs/JobDetail";
const Stack = createStackNavigator();

const JobPostingNavigator = () => {
  const { theme } = useTheme();
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);

  return (
    <AuthRoute requiredRole="Recruiter" fallbackScreen="LoginForCompany">
      <Stack.Navigator>
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
          name="JobDetail"
          component={JobDetail}
          options={{
            headerShown: true,
            title: "Job Details ",
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
      </Stack.Navigator>
    </AuthRoute>
  );
};

export default JobPostingNavigator;
