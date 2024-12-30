import React, { memo } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import PropTypes from "prop-types";

// Calculate number of columns based on screen width
const { width } = Dimensions.get("window");
const numColumns = 2; // You can adjust this number for more or fewer columns
const itemMargin = 10;
const itemWidth = (width - (numColumns + 1) * itemMargin) / numColumns;

const ProjectList = memo(
  ({
    projects,
    onNavigateToProject,
    onFetchSpecProject,
    onUpdateProject,
    onDeleteProject,
  }) => {
    const handleProjectPress = React.useCallback(
      (projectId) => {
        onNavigateToProject(projectId);
        onFetchSpecProject(projectId);
      },
      [onNavigateToProject, onFetchSpecProject]
    );
    const deleteSelectedProject = React.useCallback(
      (projectId) => {
        onDeleteProject(projectId);
      },
      [onDeleteProject]
    );
    const updateSelectedProject = React.useCallback(
      (projectId) => {
        onUpdateProject(projectId);
      },
      [onUpdateProject]
    );

    const renderItem = React.useCallback(
      ({ item: project }) => (
        <View style={styles.projectContent}>
          <Text style={styles.projectName} numberOfLines={1}>
            {project.name}
          </Text>
          <Text style={styles.projectId} numberOfLines={1}>
            ID: {project._id}
          </Text>
          <Text style={styles.projectDescription} numberOfLines={2}>
            {project.description}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText} numberOfLines={1}>
              Start: {project.startDate}
            </Text>
            <Text style={styles.dateText} numberOfLines={1}>
              End: {project.endDate}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.projectItem}
            onPress={() => handleProjectPress(project._id)}
          >
            <Text>SELECT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.projectItem}
            onPress={() => updateSelectedProject(project._id)}
          >
            <Text>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.projectItem}
            onPress={() => deleteSelectedProject(project._id)}
          >
            <Text>DELETE</Text>
          </TouchableOpacity>
        </View>
      ),
      [handleProjectPress]
    );

    const keyExtractor = React.useCallback((item) => item._id.toString(), []);

    const ListEmptyComponent = React.useCallback(
      () => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No projects to display.</Text>
        </View>
      ),
      []
    );

    return (
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        style={styles.projectList}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    );
  }
);

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  onNavigateToProject: PropTypes.func.isRequired,
  onFetchSpecProject: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  projectList: {
    flex: 1,
  },
  contentContainer: {
    padding: itemMargin,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  projectItem: {
    width: itemWidth,
    marginBottom: itemMargin,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  projectContent: {
    padding: 12,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#2c3e50",
  },
  projectId: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 6,
  },
  projectDescription: {
    fontSize: 14,
    color: "#34495e",
    marginBottom: 8,
  },
  dateContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
    paddingTop: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#95a5a6",
    marginBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
});

export default ProjectList;
