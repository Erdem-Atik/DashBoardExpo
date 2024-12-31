import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  View,
} from "react-native";

export default function ProjectList({
  projects,
  onNavigateToProject,
  onFetchSpecProject,
  onDeleteProject,
  onUpdateProject,
}) {
  const Item = ({ item }) => (
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
        style={styles.updateButton}
        onPress={() => {
          onFetchSpecProject(item._id);
          onNavigateToProject(item._id);
        }}
      >
        <Text style={styles.updateButtonText}>Select</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => onUpdateProject(item._id)}
      >
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteProject(item._id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={projects}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2} // Display items in a grid with 2 columns
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
