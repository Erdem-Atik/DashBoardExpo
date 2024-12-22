import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createProject, getProjects } from "../../api/projects";
import Cookies from "js-cookie";

export default function Sidebar({ token, onProjectsUpdated }) {
  const handleCreateProject = async () => {
    if (token) {
      const newProject = {
        name: "instance-1",
        description: "erdem 1.1.1",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      };

      try {
        const createResult = await createProject(token, newProject);
        console.log("Project creation result:", createResult);
        onProjectsUpdated(); // Notify parent to refresh the project list
      } catch (error) {
        console.error("Error creating project:", error);
      }
    } else {
      console.warn("No token available to create project");
    }
  };

  const handleGetProjects = async () => {
    if (token) {
      try {
        const fetchedProjects = await getProjects(token);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    } else {
      console.warn("No token available to fetch projects");
    }
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Sidebar</Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
        <Text>Create Project</Text>
      </TouchableOpacity>
      {/* Refresh Projects Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetProjects}>
        <Text>Get Projects</Text>
      </TouchableOpacity>
      {/* Get Cookie Button */}
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
