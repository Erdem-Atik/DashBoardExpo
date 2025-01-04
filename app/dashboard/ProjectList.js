import React, { useState } from "react";
import {
  Modal,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function ProjectList({
  projects,
  onNavigateToProject,
  onFetchSpecProject,
  onDeleteProject,
  onUpdateProject,
}) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const ConfirmationModal = ({ visible, onClose, onConfirm, message }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              setSelectedProjectId(item._id);
              setUpdateModalVisible(true);
            }}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setSelectedProjectId(item._id);
              setDeleteModalVisible(true);
            }}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
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

      <ConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={() => {
          onDeleteProject(selectedProjectId);
          setDeleteModalVisible(false);
        }}
        message="Are you sure you want to delete this project?"
      />

      <ConfirmationModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        onConfirm={() => {
          onUpdateProject(selectedProjectId);
          setUpdateModalVisible(false);
        }}
        message="Are you sure you want to update this project?"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 5,
  },
  projectItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    maxWidth: "48%",
    alignItems: "flex-start", // Align contents to the left
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5, // Add spacing between elements
    textAlign: "left", // Ensure text is aligned to the left
  },
  projectId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
    textAlign: "left",
  },
  projectDescription: {
    fontSize: 14,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  confirmButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
