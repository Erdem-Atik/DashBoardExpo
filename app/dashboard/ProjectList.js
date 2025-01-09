import React, { useState } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ConfirmationModal from "../../components/ConfirmationModal";
import ResultModal from "../../components/ResultModal";

export default function ProjectList({
  projects,
  onNavigateToProject,
  onFetchSpecProject,
  onDeleteProject,
  onUpdateProject,
}) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [delConfirmModal, setDelConfirmModal] = useState(false);
  const [upConfirmModal, setUpConfirmModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const Item = ({ item }) => (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.projectItem}>
          <Text style={styles.projectName}> PROJECT NAME: {item.name}</Text>
          <Text style={styles.projectId}>ID: {item._id}</Text>
          <Text style={styles.projectDescription}>
            DESCRIPTION: {item.description}
          </Text>
          <Text style={styles.projectDates}>
            DATES: {item.startDate} - {item.endDate}
          </Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => {
              onFetchSpecProject(item._id);
              onNavigateToProject(item._id);
            }}
          >
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );

  return (
    <>
      <FlatList
        data={projects}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    borderRadius: 5,
  },
  projectItem: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "flex-start", // Align contents to the left
  },
  projectName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5, // Add spacing between elements
    textAlign: "left", // Ensure text is aligned to the left
  },
  projectId: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
    textAlign: "left",
  },
  projectDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    textAlign: "left",
  },
  projectDates: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
    textAlign: "left",
  },
  selectButton: {
    backgroundColor: "#008000",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "stretch", // Make the button stretch across the container
  },
  selectButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "stretch", // Make the button stretch across the container
  },
  updateButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "stretch", // Make the button stretch across the container
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
