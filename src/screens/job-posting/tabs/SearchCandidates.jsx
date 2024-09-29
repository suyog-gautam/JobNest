import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  scale,
  moderateVerticalScale,
  moderateScale,
  verticalScale,
} from "react-native-size-matters";
import { getColors } from "../../../utils/colors";
import { useTheme } from "../../../utils/ThemeContext";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../../../../firebaseConfig"; // Adjust the import according to your setup
import CustomText from "../../../utils/CustomText";
import { UseAuth } from "../../../utils/AuthContext";

const SearchCandidates = () => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const { user } = UseAuth();
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: verticalScale(15),
      marginBottom: verticalScale(10),
      backgroundColor: BG_COLOR,
    },
    header: {
      marginTop: verticalScale(10),
      alignItems: "center",
    },
    headerText: {
      fontSize: moderateScale(22),
      fontWeight: "700",
      fontFamily: "Poppins_600Bold",
      color: TEXT_COLOR,
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: BG_COLOR,
      borderRadius: scale(40),
      alignSelf: "center",
      width: "90%",
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      marginTop: moderateScale(15),
      marginBottom: moderateScale(15),
      paddingLeft: scale(15),
      height: moderateScale(50),
    },
    searchicon: {
      width: scale(15),
      height: scale(15),
      tintColor: TEXT_COLOR,
    },
    searchText: {
      width: "80%",
      fontSize: moderateScale(16),
      fontFamily: "Poppins_400Regular",
      color: TEXT_COLOR,
      marginLeft: scale(10),
    },
    userItem: {
      flexDirection: "row",
      gap: scale(25),
      padding: moderateScale(8),
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    userName: {
      fontSize: moderateScale(16),
      color: TEXT_COLOR,
    },
    profilePic: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(50),
    },
    noResults: {
      textAlign: "center",
      marginTop: moderateScale(20),
      fontSize: moderateScale(16),
      color: "gray",
    },
  });
  useEffect(() => {
    const fetchAllUsers = async () => {
      const usersCollectionRef = collection(firestore, "users");

      const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          // Check if the user's role is 'Candidate'
          if (userData.role === "Candidate") {
            usersList.push(userData);
          }
        });
        setAllUsers(usersList);
        setFilteredUsers(usersList); // Initialize filteredUsers with allUsers having role 'Candidate'
      });

      return () => unsubscribe();
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText, allUsers]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search Candidates</Text>
      </View>
      <View style={styles.searchBox}>
        <Image
          source={require("../../../images/search.png")}
          style={styles.searchicon}
        />
        <TextInput
          style={styles.searchText}
          placeholder="Search for candidates"
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => setSearchText("")}>
          <Image
            source={require("../../../images/cross.png")}
            style={styles.searchicon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.jobId} // Adjust this according to your user data
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Image
              source={
                item.profilePictureUrl
                  ? { uri: item.profilePictureUrl }
                  : require("../../../images/profile.png")
              }
              style={styles.profilePic}
            />
            <View>
              <CustomText style={styles.userName}>{item.name}</CustomText>
              <CustomText style={styles.userName}>{item.email}</CustomText>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noResults}>No candidates found</Text>
        )}
      />
    </View>
  );
};

export default SearchCandidates;
