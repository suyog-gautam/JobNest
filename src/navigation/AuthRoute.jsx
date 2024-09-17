import React from "react";
import { View, ActivityIndicator } from "react-native";
import { UseAuth } from "../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";

const AuthRoute = ({ children, requiredRole, fallbackScreen }) => {
  const { user, loading } = UseAuth();
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If the user is not logged in or doesn't match the required role, redirect
  if (!user || (requiredRole && user.role !== requiredRole)) {
    navigation.navigate(fallbackScreen);
    return null;
  }

  return children;
};

export default AuthRoute;
