import React, { use, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for dynamic navigation

export default function SideBar({
  token,
  onCreateProject,
  onFetchProjects,
  onDeleteProject,
  onUpdateProject,
  onNavigateToDashBoard,
}) {
  const router = useRouter(); // Initialize router for navigation

  const navigateToDashBoard = () => {
    console.log("hellooo");
    router.push("/dashboard/"); // Navigate to the dashboard page
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Main Page</Text>

      <TouchableOpacity style={styles.button} onPress={navigateToDashBoard}>
        <Text>DashBoard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onFetchProjects}
        disabled={!token}
      >
        <Text>Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onDeleteProject("sample-project-id")} // Replace with a real project ID
        disabled={!token}
      >
        <Text>My Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
