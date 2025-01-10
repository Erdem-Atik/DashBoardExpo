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

  const handleDelete = async (projectId) => {
    try {
      setLoading(true);
      const response = await deleteProject(projectId);
      if (response.success) {
        setDeleteModalVisible(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (projectId) => {
    try {
      setLoading(true);
      const response = await updateProject(projectId);
      if (response.success) {
        setUpdateModalVisible(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
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
              style={styles.updateButton}
              onPress={() => {
                setUpdateModalVisible(true);
              }}
            >
              <Text style={styles.deleteButtonText}>UPDATE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setDeleteModalVisible(true);
              }}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ConfirmationModal
            visible={deleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onConfirm={() => {
              handleDelete(projectDetails[0]._id);
              setDelConfirmModal(true);
            }}
            message="Are you sure you want to delete this project?"
          />
          <ConfirmationModal
            visible={updateModalVisible}
            onClose={() => setUpdateModalVisible(false)}
            onConfirm={() => {
              handleUpdate(projectDetails[0]._id);
              setUpConfirmModal(true);
            }}
            message="Are you sure you want to delete this project?"
          />
          <ResultModal
            visible={delConfirmModal}
            onClose={() => {
              setDelConfirmModal(false);
              router.push("/dashboard");
            }}
            message="Project deleted successfully!"
          />
          <ResultModal
            visible={upConfirmModal}
            onClose={() => setUpConfirmModal(false)}
            message="Project updated successfully!"
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
