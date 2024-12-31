import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import SideBar from "./SideBar";
import ProjectList from "./ProjectList";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  searchProjects,
  getSpecProjects,
} from "../../api/projects";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);
  const router = useRouter();

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
              const fetchedProjects = await searchProjects();
              setProjects(fetchedProjects.projects);
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
        />
      </View>
      {/* Use the ProjectList component here */}
      <ProjectList
        projects={projects}
        onNavigateToProject={handleNavigateToProject}
        onFetchSpecProject={async (projectId) => {
          if (!token) return;
          try {
            const fetchedProject = await getSpecProjects(projectId);
            setProjects((prevProjects) => [...prevProjects, fetchedProject]);
          } catch (error) {
            console.error("Error fetching project:", error);
          }
        }}
        onDeleteProject={async (projectId) => {
          console.log(projectId);
          if (!token) return;
          try {
            await deleteProject(projectId);
            setProjects((prevProjects) =>
              prevProjects.filter((project) => project.id !== projectId)
            );
          } catch (error) {
            console.error("Error deleting project:", error);
          }
        }}
        onUpdateProject={async (projectId) => {
          if (!token) return;
          try {
            const updatedProject = await updateProject(projectId);
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
});
