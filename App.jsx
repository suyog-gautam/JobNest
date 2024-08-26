import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import Loader from "./src/utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { BG_COLOR } from "./src/utils/colors";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync(); // Prevent splash screen auto-hide

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const navigationRef = useRef(null);
  const [counter, setCounter] = useState(0);
  // Always call hooks at the top level, unconditionally

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Fetch user data from AsyncStorage
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          // Navigate based on user role
          if (parsedUser.role === "Recruiter") {
            navigationRef.current?.navigate("DashboardForCompany");
          } else {
            navigationRef.current?.navigate("LoginForCompany");
          }
          console.log("Role:", parsedUser.name);
        }

        // Set the app as ready after all tasks are done
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn(error);
        // Ensure splash screen is hidden even on error
        await SplashScreen.hideAsync();
      }
    };

    // Only run the effect if fonts are loaded
    if (fontsLoaded && counter < 2) {
      prepareApp();
      setCounter((prevCounter) => prevCounter + 1);
    }
  }, [fontsLoaded, counter]); // Depend on fontsLoaded

  // If the app is not ready, show a loader
  if (!appIsReady) {
    return <Loader />;
  }

  // Once the app is ready, render the main content
  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <MainNavigator />
        <Toast />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});

export default App;
