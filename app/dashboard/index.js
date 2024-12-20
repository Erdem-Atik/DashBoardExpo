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
  const { token } = useAuth();
  const [projects, setProjects] = useState([]); // State to store the list of projects

  // Function to create a project when the button is clicked
  const handleCreateProject = async () => {
    if (Platform.OS === "web") {
      console.log("Web Platform");

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
        } catch (error) {
          console.error("Error creating project:", error);
        }
      } else {
        console.warn("No token available to create a project");
      }
    }
  };

  // Function to fetch and display the list of projects
  const handleGetProjects = async () => {
    if (token) {
      try {
        const fetchedProjects = await getProjects(token);
        console.log("Fetched projects:", fetchedProjects);
        setProjects(fetchedProjects); // Update the state with the fetched projects
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
      <Text style={styles.title}>Welcome, "Guest"!</Text>
      <Button title="Get Cookie" onPress={GetCookie} />
      <Button title="Create Project" onPress={handleCreateProject} />
      <Button title="Get Projects" onPress={handleGetProjects} />

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  projectList: {
    marginTop: 20,
    width: "100%",
  },
  projectItem: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
