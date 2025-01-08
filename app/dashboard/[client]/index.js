import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  getSpecProjects,
  updateProject,
  deleteProject,
} from "../../../api/projects"; // Adjust the import path as needed
import SideBar from "../SideBar";
import Loader from "../../../components/Loader";
import ResultModal from "../../../components/ResultModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

export default function ProjectDetails() {
  const { client } = useLocalSearchParams(); // Extract projectId from the route
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [delConfirmModal, setDelConfirmModal] = useState(false);
  const [upConfirmModal, setUpConfirmModal] = useState(false);
  const router = useRouter();

  const confirmUpdate = async (projectId) => {
    try {
      setLoading(true);
      const response = await updateProject(projectId);
      const result = await response.json();
      if (result.success) {
        console.log(result);
        setLoading(false);
        setUpConfirmModal(true);
        return true;
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const confirmDelete = async (projectId) => {
    try {
      const response = await deleteProject(projectId);

      if (response.success) {
        setLoading(false);
        setDeleteModalVisible(true);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!client) return;

      try {
        const details = await getSpecProjects(client);
        setProjectDetails(details.projects);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [client]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SideBar></SideBar>
      {projectDetails ? (
        <>
          <Text style={styles.title}>Project Details</Text>

          <Text style={styles.detail}>Name: {projectDetails[0].name}</Text>
          <Text style={styles.detail}>
            Description: {projectDetails[0].description}
          </Text>
          <Text style={styles.detail}>ID: {projectDetails[0]._id}</Text>
          <Text style={styles.detail}>
            Start Date: {projectDetails[0].startDate}
          </Text>
          <Text style={styles.detail}>
            End Date: {projectDetails[0].endDate}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                confirmDelete(projectDetails[0]._id);
              }}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ConfirmationModal
            visible={deleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onConfirm={() => {
              confirmDelete(projectDetails[0]._id);
              setDeleteModalVisible(false);
              console.log(deleteModalVisible);
            }}
            message="Are you sure you want to delete this project?"
          />
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
    flexDirection: "row",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});
