import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerScreen from "./DrawerScreen";
import CustomDrawer from "./CustomDrawer";
import { getColors } from "../../utils/colors";
import { UseAuth } from "../../utils/AuthContext";
import { useTheme } from "../../utils/ThemeContext";
const Main = () => {
  const { user } = UseAuth();
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const Drawer = createDrawerNavigator();
  useEffect(() => {}, [user]);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: TEXT_COLOR,
        headerStyle: {
          backgroundColor: BG_COLOR,
        },
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Drawer"
        component={DrawerScreen}
        options={{ title: "Job Nest" }}
      />
    </Drawer.Navigator>
  );
};

export default Main;
