import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import SideBar from "./SideBar";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  searchProjects,
  getSpecProjects,
} from "../../api/projects";
import { useRouter } from "expo-router";

export default function MainPage() {
  const { token, username } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
        <SideBar />
      </View>
      <View style={styles.main}>
        <Text>main page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sidebar: {
    width: 200,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  main: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});
