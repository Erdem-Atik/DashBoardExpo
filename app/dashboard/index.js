import React, { useState, useEffect } from "react";
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
  const { token, userName } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null); // Move state here
  const router = useRouter();

  // Navigate to project details page
  const handleNavigateToProject = (projectId) => {
    router.push(`/dashboard/${projectId}`);
  };

  useEffect(() => {
    console.log("Updated projects:", projects);
  }, [projects]);

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      {!isLoading && (
        <SideBar
          userName={userName}
          selectedButton={selectedButton} // Pass selected button state
          setSelectedButton={setSelectedButton} // Pass setter function
          onCreateProject={async () => {
            const newProject = {
              name: "New Project",
              description: "A description of the new project",
              startDate: "2024-01-01",
              endDate: "2024-12-31",
            };
            try {
              setIsLoading(true);
              const result = await createProject(token, newProject);
              console.log("Project created:", result);
              setProjects((prevProjects) => [...prevProjects, result]);
              if (result.success) {
                setIsLoading(false);
                handleNavigateToProject(result.projectId);
              }
            } catch (error) {
              console.error("Error creating project:", error);
            }
          }}
          onGetProjects={async () => {
            setIsLoading(true);
            try {
              const gottenProjects = await searchProjects();
              if (gottenProjects.success) {
                setProjects(gottenProjects.projects);
                console.log(projects);
              }
            } catch (error) {
              console.error("Error fetching projects:", error);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      )}
      {!isLoading && (
        <ProjectList
          projects={projects}
          onNavigateToProject={handleNavigateToProject}
          onFetchSpecProject={async (projectId) => {
            try {
              setIsLoading(true);
              const fetchedProject = await getSpecProjects(projectId);

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
      )}
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
