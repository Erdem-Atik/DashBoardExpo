import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Client1() {
  const router = useRouter();
  const { client } = useLocalSearchParams(); // Get the 'client' parameter

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{client || "Not Provided"} Informations:</Text>
      <Text style={styles.subtitle}>Client: {client || "Not Provided"}</Text>
      <Text style={styles.subtitle}>Resident Name: {res.name}</Text>
      <Text style={styles.subtitle}>Resident Address: {res.address}</Text>
      <Text style={styles.subtitle}>Resident Number:{res.flats}</Text>
      <Button title="Go Back" onPress={() => router.push("/dashboard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
  },
});
