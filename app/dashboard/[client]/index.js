import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getProjectDetails } from "../../../api/projects"; // Adjust the import path as needed
import { useAuth } from "../../../context/AuthContext";

export default function ProjectDetails() {
  const { token } = useAuth(); // Get the token from context
  const { client } = useLocalSearchParams(); // Extract projectId from the route
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!token || !client) return;

      try {
        const details = await getProjectDetails(token, client);
        setProjectDetails(details);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [token, client]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {projectDetails ? (
        <>
          <Text style={styles.title}>Project Details</Text>
          <Text style={styles.detail}>Name: {projectDetails.name}</Text>
          <Text style={styles.detail}>
            Description: {projectDetails.description}
          </Text>
          <Text style={styles.detail}>
            Start Date: {projectDetails.startDate}
          </Text>
          <Text style={styles.detail}>End Date: {projectDetails.endDate}</Text>
        </>
      ) : (
        <Text style={styles.error}>No project details found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});
