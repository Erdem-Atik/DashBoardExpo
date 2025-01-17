import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for dynamic navigation
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SideBar({
  userName,
  selectedButton,
  setSelectedButton,
  onCreateProject,
  onGetProjects,
}) {
  const router = useRouter(); // Initialize router for navigation

  const navigateToProjectDetails = (projectId) => {
    router.push(`/dashboard/${projectId}`); // Navigate to dynamic route
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={() => router.push("/dashboard")}>
        <Image
          source={require("../../assets/yonetimEd.png")}
          style={styles.logo}
          onPress={() => router.push("/")}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome, {userName || "Guest"}!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onCreateProject}>
          <Ionicons name="create" size={18} color="black" />
          <Text> Create Project</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "dashboard" && styles.buttonSelected,
          ]}
          onPress={() => {
            setSelectedButton("dashboard");
            onGetProjects();
          }}
        >
          <MaterialIcons
            name="dashboard"
            size={18}
            color={selectedButton === "dashboard" ? "#007AFF" : "black"}
          />
          <Text
            style={[
              styles.buttonText,
              selectedButton === "dashboard" && styles.buttonTextSelected,
            ]}
          >
            {" "}
            DashBoard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="report" size={18} color="black" />
          <Text> Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="account" size={18} color="black" />
          <Text> My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    padding: 10,
    backgroundColor: "red",
    margin: 0, // Remove any default margin
    maxWidth: "%55",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#f9f9f9", //"#f9f9f9"
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    color: "black",
  },
  buttonTextSelected: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
