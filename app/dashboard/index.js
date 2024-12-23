import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import SideBar from "./SideBar";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../../api/projects";
import { useRouter } from "expo-router"; // Import useRouter for dynamic navigation

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  // Callback to fetch projects
  const fetchProjects = async () => {
    if (!token) return;
    try {
      const fetchedProjects = await getProjects(token);
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Callback to create a project
  const handleCreateProject = async () => {
    if (!token) return;
    const newProject = {
      name: "New Project",
      description: "A description of the new project",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    };
    try {
      const result = await createProject(token, newProject);
      console.log("Project created:", result);
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Callback to delete a project
  const handleDeleteProject = async (projectId) => {
    if (!token) return;
    try {
      await deleteProject(token, projectId);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Callback to update a project
  const handleUpdateProject = async (projectId, updatedData) => {
    if (!token) return;
    try {
      const updatedProject = await updateProject(token, projectId, updatedData);
      console.log("Project updated:", updatedProject);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Callback to navigate to the project details route
  const handleNavigateToProject = (projectId) => {
    router.push(`/dashboard/${projectId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <SideBar
          token={token}
          onCreateProject={handleCreateProject}
          onFetchProjects={fetchProjects}
          onDeleteProject={handleDeleteProject}
          onUpdateProject={handleUpdateProject}
        />
      </View>
      <ScrollView style={styles.projectList}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <TouchableOpacity
              key={index}
              style={styles.projectItem}
              onPress={() => handleNavigateToProject(project.id)} // Navigate to dynamic route
            >
              <Text>Project Name: {project.name}</Text>
              <Text>Description: {project.description}</Text>
              <Text>Start Date: {project.startDate}</Text>
              <Text>End Date: {project.endDate}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No projects to display.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  sidebar: {
    width: 200,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  projectList: {
    flex: 1,
    padding: 20,
  },
  projectItem: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
