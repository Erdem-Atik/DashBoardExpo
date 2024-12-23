import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ClientDashboard() {
  const { client } = useLocalSearchParams(); // Extract dynamic route parameter
  console.log(client);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Dashboard</Text>
      <Text style={styles.subtitle}>Client ID: {client}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
});
