import React from "react";
import { Button, Platform, Alert } from "react-native";
import { createProject } from "../../api/projects";

export default function CreateProjectButton({ token }) {
  const handleCreateProject = async () => {
    if (!token) {
      Alert.alert("Error", "No token available to create a project");
      return;
    }

    if (Platform.OS === "web") {
      console.log("Web Platform");

      const newProject = {
        name: "instance-1",
        description: "erdem 1.1.1",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      };

      try {
        const createResult = await createProject(token, newProject);
        console.log("Project creation result:", createResult);
        Alert.alert("Success", "Project created successfully");
      } catch (error) {
        console.error("Error creating project:", error);
        Alert.alert("Error", "Failed to create project");
      }
    }
  };

  return <Button title="Create Project" onPress={handleCreateProject} />;
}
