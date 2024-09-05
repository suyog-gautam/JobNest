import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";

import CustomText from "../../../utils/CustomText"; // Assuming CustomText is a named export
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../../../utils/Loader";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../../../../firebaseConfig";
import { UseAuth } from "../../../utils/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const ChangeProfilePicForUser = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const { user } = UseAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const [uid, setUid] = useState(user?.user?.uid);
  // const[ profilepic, setprofilepic] = useState(null);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
    },
    backArrow: {
      fontSize: moderateScale(30),
      color: TEXT_COLOR,
    },
    header: {
      width: "100%",
      height: verticalScale(45),
      flexDirection: "row",
      alignItems: "center",
      marginTop: moderateScale(30),
      paddingLeft: moderateScale(20),
      marginBottom: moderateScale(30),
    },
    title: {
      color: TEXT_COLOR,
      fontSize: moderateScale(23),
      fontWeight: "600",
      marginLeft: scale(15),
      fontFamily: "Poppins_500Medium",
    },
    disabledButton: {
      backgroundColor: "gray",
    },
    profileSection: {
      justifyContent: "center",
      alignItems: "center",
      height: moderateScale(500),
    },
    profilePicture: {
      width: moderateScale(150),
      height: moderateScale(150),
      borderRadius: 50,
      backgroundColor: "#f1f1f1",
      borderWidth: 1,
      borderColor: TEXT_COLOR,
    },
    actionButtonContainer: {
      width: "100%",
      marginTop: verticalScale(20),
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    actionButton: {
      marginTop: verticalScale(20),
      padding: moderateScale(10),
      paddingHorizontal: moderateScale(14),
      borderRadius: moderateScale(12),
      backgroundColor: TEXT_COLOR,
      BorderColor: "#34495e",
      borderWidth: 1,
    },
    actionText: {
      fontSize: moderateScale(14),

      color: BG_COLOR,
      fontFamily: "Poppins_400Regular",
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (uid) {
          // Create a reference to the user's document in Firestore
          const userDocRef = doc(firestore, "users", uid);

          // Fetch the user's document from Firestore
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            // Check if profilePictureUrl exists in the user's data and set the image
            if (userData?.profilePictureUrl) {
              setImage(userData.profilePictureUrl);
            }
          } else {
            console.log("No such user document!");
          }
        }
      } catch (error) {
        console.error("Failed to load user data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("This is result", result);
      setImage(result.assets[0].uri);

      setUploadEnabled(true);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `profile_pics/${Date.now()}.jpg`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      console.log("Uploaded Image URL:", downloadURL);

      // Update the user's document with the new profile picture URL
      const userDocRef = doc(firestore, "users", uid);
      await updateDoc(userDocRef, {
        profilePictureUrl: downloadURL, // Assuming you want to store the URL under 'profilePictureUrl'
      });

      Alert.alert(
        "Success",
        "Image uploaded and profile updated successfully!"
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
      setUploadEnabled(false);
      navigation.navigate("Main");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}

      <View style={styles.profileSection}>
        <Image
          source={
            image ? { uri: image } : require("../../../images/profile.png")
          }
          style={styles.profilePicture}
        />

        <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
          <CustomText style={styles.actionText}>
            Pick Image from Gallery
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={uploadEnabled ? uploadImage : null} // Only trigger uploadImage if uploadEnabled is true
          style={[styles.actionButton, !uploadEnabled && styles.disabledButton]}
          activeOpacity={uploadEnabled ? 0.7 : 1} // Change opacity only when enabled
        >
          {loading ? (
            <Loader />
          ) : (
            <CustomText style={styles.actionText}>Update Picture</CustomText>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeProfilePicForUser;
