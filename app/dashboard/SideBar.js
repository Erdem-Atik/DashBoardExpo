import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for dynamic navigation

export default function SideBar({
  userName,
  onCreateProject,
  onGetProjects,
  onDeleteProject,
  onUpdateProject,
}) {
  const router = useRouter(); // Initialize router for navigation

  const navigateToProjectDetails = (projectId) => {
    router.push(`/dashboard/${projectId}`); // Navigate to dynamic route
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Welcome, {userName || "Guest"}!</Text>
      <TouchableOpacity style={styles.button} onPress={onCreateProject}>
        <Text>Create Project</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onGetProjects}>
        <Text>Get Projects</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    padding: 10,
    backgroundColor: "red", //#f0f0f0"
    maxHeight: "50%", // Ensure the sidebar takes the full height of the screen
    margin: 0, // Remove any default margin
    borderWidth: 5,
  },
  title: {
    fontSize: 12,
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
