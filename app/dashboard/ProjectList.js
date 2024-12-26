import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ProjectList({ projects, onNavigateToProject }) {
  return (
    <ScrollView style={styles.projectList}>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <TouchableOpacity
            key={project._id || index}
            style={styles.projectItem}
            onPress={() => onNavigateToProject(project._id)}
          >
            <Text>Project Name: {project.name}</Text>
            <Text>Project ID: {project._id}</Text>
            <Text>Description: {project.description}</Text>
            <Text>Start Date: {project.startDate}</Text>
            <Text>End Date: {project.endDate}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No projects to display.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
