import React, { useContext, useState } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./SideBar";
import { useProjectContext } from "../../context/ProjectContext";

export default function Dashboard() {
  const { token, username } = useAuth();
  const [projects, setProjects] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <Sidebar token={token} />
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
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
