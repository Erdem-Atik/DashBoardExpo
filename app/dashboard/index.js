import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import SideBar from "./SideBar";
import ProjectList from "./ProjectList";
import Loader from "../../components/Loader";
import { createRoot } from "react-dom/client";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  searchProjects,
  getSpecProjects,
} from "../../api/projects";
import { useRouter } from "expo-router";
console.log(createRoot);

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const router = useRouter();

  const handleNavigateToProject = (projectId) => {
    router.push(`/dashboard/${projectId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <SideBar
          token={token}
          setIsLoading={setIsLoading} // Pass setIsLoading to SideBar
          onCreateProject={async () => {
            if (!token) return;
            setIsLoading(true); // Start loader
            try {
              const newProject = {
                name: "New Project",
                description: "A description of the new project",
                startDate: "2024-01-01",
                endDate: "2024-12-31",
              };
              const result = await createProject(token, newProject);
              setProjects((prevProjects) => [...prevProjects, result]);
            } catch (error) {
              console.error("Error creating project:", error);
            } finally {
              setIsLoading(false); // Stop loader
            }
          }}
          onFetchProjects={async () => {
            if (!token) return;
            setIsLoading(true);
            setProjects([]);
            try {
              const fetchedProjects = await searchProjects();
              setProjects(fetchedProjects.projects);
            } catch (error) {
              console.error("Error fetching projects:", error);
            } finally {
              setIsLoading(false);
            }
          }}
          onDeleteProject={async (projectId) => {
            if (!token) return;
            setIsLoading(true);
            try {
              await deleteProject(token, projectId);
              setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== projectId)
              );
            } catch (error) {
              console.error("Error deleting project:", error);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      </View>
      {isLoading && <Loader style={styles.loaderStyle} />}
      <ProjectList
        projects={projects}
        onNavigateToProject={handleNavigateToProject}
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
  loaderStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
