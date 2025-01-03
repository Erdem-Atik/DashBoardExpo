import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for dynamic navigation

export default function SideBar({
  token,
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
      <TouchableOpacity
        style={styles.button}
        onPress={onCreateProject}
        disabled={!token}
      >
        <Text>Create Project</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onGetProjects}
        disabled={!token}
      >
        <Text>Get Projects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onDeleteProject("sample-project-id")} // Replace with a real project ID
        disabled={!token}
      >
        <Text>Delete Project</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onUpdateProject("sample-project-id", {
            name: "Updated Project Name",
            description: "Updated description",
          })
        } // Replace with real project ID and updated data
        disabled={!token}
      >
        <Text>Update Project</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToProjectDetails("sample-project-id")} // Replace with real project ID
        disabled={!token}
      >
        <Text>Go to Project Details</Text>
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
