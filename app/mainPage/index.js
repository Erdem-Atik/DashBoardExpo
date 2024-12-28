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
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
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
    alignItems: "center",
    justifyContent: "center",
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
