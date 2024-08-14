import React from "react";
import { View, StyleSheet } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { BG_COLOR } from "./src/utils/colors";
import CustomText from "./src/utils/CustomText"; // Make sure the path is correct

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <CustomText>Loading...</CustomText>;
  }

  return (
    <View style={styles.container}>
      <MainNavigator />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR, // Make sure BG_COLOR is valid
  },
});

export default App;
