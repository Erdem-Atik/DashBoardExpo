import React, { useState, useEffect } from "react";
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
import { useRouter } from "expo-router";

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return;
      try {
        const fetchedProjects = await getProjects(token);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [token]);

  // Navigate to project details page
  const handleNavigateToProject = (projectId) => {
    router.push(`/dashboard/${projectId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <SideBar
          token={token}
          onCreateProject={async () => {
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
              setProjects((prevProjects) => [...prevProjects, result]);
            } catch (error) {
              console.error("Error creating project:", error);
            }
          }}
          onFetchProjects={async () => {
            if (!token) return;
            try {
              const fetchedProjects = await getProjects(token);
              setProjects(fetchedProjects);
            } catch (error) {
              console.error("Error fetching projects:", error);
            }
          }}
          onDeleteProject={async (projectId) => {
            if (!token) return;
            try {
              await deleteProject(token, projectId);
              setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== projectId)
              );
            } catch (error) {
              console.error("Error deleting project:", error);
            }
          }}
          onUpdateProject={async (projectId, updatedData) => {
            if (!token) return;
            try {
              const updatedProject = await updateProject(
                token,
                projectId,
                updatedData
              );
              setProjects((prevProjects) =>
                prevProjects.map((project) =>
                  project.id === projectId ? updatedProject : project
                )
              );
            } catch (error) {
              console.error("Error updating project:", error);
            }
          }}
        />
      </View>
      <ScrollView style={styles.projectList}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <TouchableOpacity
              key={project._id || index}
              style={styles.projectItem}
              onPress={() => handleNavigateToProject(project._id)}
            >
              <Text>Project Name: {project.name}</Text>
              <Text>Project Name: {project._id}</Text>
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
