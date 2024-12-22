import React, { createContext, useContext, useState } from "react";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../api/projects"; // Adjust the import path as needed
import { useAuth } from "./AuthContext";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]); // Store the list of projects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const allProjects = await getProjects(token);
      setProjects(allProjects);
    } catch (err) {
      setError("Failed to fetch projects.");
      console.error("Fetch projects error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const addProject = async (token, projectData) => {
    setLoading(true);
    setError(null);
    try {
      const newProject = await createProject(token, projectData);
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (err) {
      setError("Failed to create project.");
      console.error("Create project error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing project
  const editProject = async (token, projectId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProject = await updateProject(token, projectId, updatedData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject : project
        )
      );
    } catch (err) {
      setError("Failed to update project.");
      console.error("Update project error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const removeProject = async (token, projectId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteProject(token, projectId);
      if (result.success) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      } else {
        setError("Failed to delete project.");
        console.error("Delete project error:", result.error);
      }
    } catch (err) {
      setError("Failed to delete project.");
      console.error("Delete project error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        fetchProjects,
        addProject,
        editProject,
        removeProject,
        loading,
        error,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
