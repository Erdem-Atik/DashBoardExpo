import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { user } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username || "Guest"}!</Text>
      <Text>Your token: {user?.token || "No Token Available"}</Text>
      {/* Display other user-related data */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
