import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const residents = [
  { id: "client1", resName: "AHMET Apt", resNumber: 15 },
  { id: "client2", resName: "KÖŞK Apt", resNumber: 20 },
  { id: "client3", resName: "ZİNNUR Apt.", resNumber: 30 },
];

export default function Client1() {
  const router = useRouter();
  const { client } = useLocalSearchParams(); // Get the 'client' parameter

  const res = residents.find((res) => res.id === client);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{client || "Not Provided"} Informations:</Text>
      <Text style={styles.subtitle}>Client: {client || "Not Provided"}</Text>
      <Text style={styles.subtitle}>Resident Name: {res.resName}</Text>
      <Text style={styles.subtitle}>Resident Number:{res.resNumber}</Text>
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
