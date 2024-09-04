import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CustomText from "../../../utils/CustomText";
import Loader from "../../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import DocumentPicker from "react-native-document-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as FileSystem from "expo-file-system";
import { UseAuth } from "../../../utils/AuthContext";

const ManageResume = () => {
  const navigation = useNavigation();
  const [resume, setResume] = useState(null); // For selected resume
  const [resumeUrl, setResumeUrl] = useState(null); // For displaying resume
  const [loading, setLoading] = useState(false);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const [uid, setUid] = useState(null);
  const { user } = UseAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch the resume URL from Firestore
        if (user.user.uid) {
          const userDocRef = doc(firestore, "users", user.user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.resumeUrl) {
              setResumeUrl(userData.resumeUrl); // Set the resume URL from Firestore
            }
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      if (result) {
        setResume(result); // Store the selected resume
        setUploadEnabled(true); // Enable the upload button
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Document picker canceled");
      } else {
        console.error("Error picking document:", err);
      }
    }
  };

  const uploadResume = async () => {
    if (!resume) return;

    setLoading(true);
    try {
      console.log("Fetching resume from URI:", resume.uri);

      const fileUri = FileSystem.documentDirectory + resume.name;
      await FileSystem.copyAsync({
        from: resume.uri,
        to: fileUri,
      });

      const response = await fetch(fileUri);
      const blob = await response.blob(); // Fetching the file as a blob

      const storage = getStorage();
      const storageRef = ref(storage, `resumes/${Date.now()}_${resume.name}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      console.log("Uploaded Resume URL:", downloadURL);

      const userDocRef = doc(firestore, "users", uid);
      await updateDoc(userDocRef, {
        resumeUrl: downloadURL,
      });

      setResumeUrl(downloadURL); // Update the displayed resume with the new URL
      setResume(null); // Reset the selected resume
      setUploadEnabled(false); // Disable the upload button

      Alert.alert("Success", "Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error.message);
      Alert.alert("Error", "Failed to upload resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openResume = () => {
    if (resumeUrl) {
      Linking.openURL(resumeUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      Alert.alert("No resume available", "Please upload a resume first.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}

      <View style={styles.resumeSection}>
        {resume ? ( // Show selected resume name if a new file is selected
          <Text style={styles.resumeText}>Selected File: {resume.name}</Text>
        ) : resumeUrl ? ( // Show "View Resume" button if no new resume is selected and there is an existing resume
          <TouchableOpacity onPress={openResume} style={styles.actionButton}>
            <CustomText style={styles.actionText}>View Resume</CustomText>
          </TouchableOpacity>
        ) : (
          <Text style={styles.resumeText}>No Resume Uploaded</Text>
        )}

        <TouchableOpacity onPress={pickDocument} style={styles.actionButton}>
          <CustomText style={styles.actionText}>
            {resumeUrl ? "Change Resume" : "Pick Resume from Files"}
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={uploadEnabled ? uploadResume : null}
          style={[styles.actionButton, !uploadEnabled && styles.disabledButton]}
          activeOpacity={uploadEnabled ? 0.7 : 1}
        >
          {loading ? (
            <Loader />
          ) : (
            <CustomText style={styles.actionText}>
              {resumeUrl ? "Update Resume" : "Upload Resume"}
            </CustomText>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ManageResume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  resumeSection: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(500),
  },
  resumeText: {
    color: TEXT_COLOR,
    fontSize: moderateScale(18),
    marginBottom: verticalScale(20),
    fontFamily: "Poppins_600Medium",
  },
  actionButton: {
    marginTop: verticalScale(20),
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: TEXT_COLOR,
    borderColor: "#34495e",
    borderWidth: 1,
  },
  actionText: {
    fontSize: moderateScale(14),
    color: BG_COLOR,
    fontFamily: "Poppins_400Regular",
  },
});
