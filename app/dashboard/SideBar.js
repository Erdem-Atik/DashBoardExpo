import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useProjectContext } from "../../context/ProjectContext"; // Adjust path to your context
import { useAuth } from "../../context/AuthContext"; // Adjust path to your context

export default function Sidebar() {
  const { token } = useAuth();
  const {
    fetchProjects,
    addProject,
    deleteProject,
    updateProject,
    loading,
    error,
  } = useProjectContext();

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Sidebar</Text>

      {/* Create Project Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addProject({
            name: "New Project",
            description: "Description of new project",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
          })
        }
        disabled={loading}
      >
        <Text>{loading ? "Creating..." : "Create Project"}</Text>
      </TouchableOpacity>

      {/* Get Projects Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={fetchProjects}
        disabled={loading}
      >
        <Text>{loading ? "Fetching..." : "Get Projects"}</Text>
      </TouchableOpacity>

      {/* Update Project Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          updateProject("project-id", {
            name: "Updated Project Name",
            description: "Updated description",
          })
        }
        disabled={loading}
      >
        <Text>{loading ? "Updating..." : "Update Project"}</Text>
      </TouchableOpacity>

      {/* Delete Project Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => deleteProject("project-id")}
        disabled={loading}
      >
        <Text>{loading ? "Deleting..." : "Delete Project"}</Text>
      </TouchableOpacity>

      {/* Error Display */}
      {error && <Text style={styles.error}>Error: {error}</Text>}
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
  error: {
    color: "red",
    marginTop: 10,
  },
});
