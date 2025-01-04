import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { getSpecProjects, searchProjects } from "../../api/projects";

const SearchBar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (text) => {
    setSearchQuery(text);

    try {
      if (text.trim() === "") {
        // If search is empty, fetch all projects
        const allProjects = await searchProjects();
        onSearchResults(allProjects);
        return;
      }

      // Try to search by ID first
      const projectById = await getSpecProjects(text);

      // If we found a project by ID, return it
      if (projectById && projectById.length > 0) {
        onSearchResults(projectById);
        return;
      }

      // If no project found by ID, get all projects and filter by name
      const allProjects = await searchProjects();
      const filteredProjects = allProjects.filter((project) =>
        project.name.toLowerCase().includes(text.toLowerCase())
      );

      onSearchResults(filteredProjects);
    } catch (error) {
      console.error("Search error:", error);
      // Handle error appropriately
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by project ID or name..."
        value={searchQuery}
        onChangeText={handleSearch}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
  },
});

export default SearchBar;
