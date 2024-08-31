import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerScreen from "./DrawerScreen";
import CustomDrawer from "./CustomDrawer";
import { BG_COLOR, TEXT_COLOR } from "../../utils/colors";
const Main = () => {
  const Drawer = createDrawerNavigator();
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
