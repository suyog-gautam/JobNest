import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import JobPostingNavigator from "./JobPostingNavigator";
import JobSearchingNavigator from "./JobSearchingNavigator";
import SelectUser from "../screens/onboarding/SelectUser";
const Stack = createStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
