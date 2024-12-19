import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { getProjects } from "../../api/projects";

export default function ProjectList({ token }) {
  const [projects, setProjects] = useState([]);

  const handleGetProjects = async () => {
    if (!token) {
      Alert.alert("Error", "No token available to fetch projects");
      return;
    }

    try {
      const fetchedProjects = await getProjects(token);
      console.log("Fetched projects:", fetchedProjects);
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      Alert.alert("Error", "Failed to fetch projects");
    }
  };

  return (
    <View style={styles.container}>
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
    width: "100%",
    marginTop: 20,
  },
  projectList: {
    marginTop: 10,
  },
  projectItem: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
