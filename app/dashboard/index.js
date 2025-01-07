import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import SideBar from "./SideBar";
import ProjectList from "./ProjectList";
import {
  createProject,
  deleteProject,
  updateProject,
  searchProjects,
  getSpecProjects,
} from "../../api/projects";
import { useRouter } from "expo-router";
import Loader from "../../components/Loader";

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Navigate to project details page
  const handleNavigateToProject = (projectId) => {
    router.push(`/dashboard/${projectId}`);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={!isLoading ? styles.sidebar : styles.invisible}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <SideBar
          onCreateProject={async () => {
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
          onGetProjects={async () => {
            setIsLoading(true);

            console.log(isLoading);

            try {
              const gottenProjects = await searchProjects();
              setIsLoading(true);
              if (gottenProjects.success) {
                setProjects(gottenProjects.projects);
                setIsLoading(false);
              }
            } catch (error) {
              console.error("Error fetching projects:", error);
              setIsLoading(false);
            }
          }}
          onDeleteProject={async (projectId) => {
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
      <View style={!isLoading ? styles.projectList : styles.invisible}>
        <ProjectList
          projects={projects}
          onNavigateToProject={handleNavigateToProject}
          onFetchSpecProject={async (projectId) => {
            try {
              setIsLoading(true);
              const fetchedProject = await getSpecProjects(projectId);
              console.log(fetchedProject);
              if (fetchedProject.success) {
                setIsLoading(false);
                setProjects((prevProjects) => [
                  ...prevProjects,
                  fetchedProject,
                ]);
              }
            } catch (error) {
              console.error("Error fetching project:", error);
            }
          }}
          onDeleteProject={async (projectId) => {
            console.log(projectId);

            try {
              setIsLoading(true);
              const deleteConfirmation = await deleteProject(projectId);
              if (deleteConfirmation.success) {
                setProjects((prevProjects) =>
                  prevProjects.filter((project) => project.id !== projectId)
                );
                setIsLoading(false);
              }
            } catch (error) {
              console.error("Error deleting project:", error);
            }
          }}
          onUpdateProject={async (projectId) => {
            try {
              setIsLoading(true);
              const updatedProject = await updateProject(projectId);
              if (updatedProject.success) {
                setIsLoading(false);
                setProjects((prevProjects) => [
                  ...prevProjects,
                  updatedProject,
                ]);
              }
            } catch (error) {
              console.error("Error updating project:", error);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 20,
  },
  sidebar: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  projectList: {
    flex: 6,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  invisible: {
    display: "none",
  },
});
