import React, { useContext, useState } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { createProject, getProjects } from "../../api/projects";

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);

  const handleCreateProject = async () => {
    if (Platform.OS === "web" && token) {
      const newProject = {
        name: "instance-1",
        description: "erdem 1.1.1",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      };

      try {
        const createResult = await createProject(token, newProject);
        console.log("Project creation result:", createResult);
      } catch (error) {
        console.error("Error creating project:", error);
      }
    } else {
      console.warn("No token available to create a project");
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

  const GetCookie = () => {
    alert(Cookies.get("my-key"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <Button title="Get Cookie" onPress={GetCookie} />
        <Button title="Create Project" onPress={handleCreateProject} />
        <Button title="Get Projects" onPress={handleGetProjects} />
      </View>
      <ScrollView style={styles.projectList}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text>Project Name: {project.name}</Text>
              <Text>Description: {project.description}</Text>
              <Text>Start Date: {project.startDate}</Text>
              <Text>End Date: {project.endDate}</Text>
            </View>
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
    flexDirection: "row", // Arrange sidebar and project list horizontally
    backgroundColor: "#f9f9f9",
  },
  sidebar: {
    width: 200, // Fixed width for the sidebar
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  projectList: {
    flex: 1, // Take remaining space
    padding: 20,
  },
  projectItem: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
