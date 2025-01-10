import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for dynamic navigation

export default function SideBar({
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
    backgroundColor: "#f0f0f0",
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
