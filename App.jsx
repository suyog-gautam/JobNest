import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import Loader from "./src/utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/utils/AuthContext";
import { BG_COLOR } from "./src/utils/colors";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ThemeContextProvider } from "./src/utils/ThemeContext";
SplashScreen.preventAutoHideAsync(); // Prevent splash screen auto-hide

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for RefreshControl
  const [key, setKey] = useState(0); // Key to force re-render

  useEffect(() => {
    const prepareApp = async () => {
      try {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn(error);
        await SplashScreen.hideAsync();
      }
    };

    if (fontsLoaded) {
      prepareApp();
    }
  }, [fontsLoaded]);

  // Function to handle the pull-to-refresh logic
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // Force a re-render by updating the key
    setKey((prevKey) => prevKey + 1);

    setRefreshing(false);
  }, []);

  if (!appIsReady) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <NavigationContainer key={key}>
          <ThemeContextProvider>
            <AuthProvider>
              <MainNavigator />
              <Toast />
            </AuthProvider>
          </ThemeContextProvider>
        </NavigationContainer>
      </ScrollView>
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
