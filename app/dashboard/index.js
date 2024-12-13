import React, { useContext } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { AppContext } from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("my-key", value);
  } catch (e) {
    // saving error
  }
};

export default function Dashboard() {
  const { user } = useContext(AppContext);
  console.log(user?.token || "No Token Available");

  if (Platform.OS === "web") {
    console.log("Web Platform");
    async function save(key, value) {
      console.log(key, value);
      localStorage.setItem(key, value);
    }
    save("token", user?.token || "No Token Available");
    async function getValueFor(key) {
      let result = localStorage.getItem(key);
      if (result) {
        console.log(key);
        alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        alert("No values stored under that key.");
      }
    }
  } else {
    async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
    }
    save("token", user?.token || "No Token Available");

    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        alert("No values stored under that key.");
      }
    }

    console.log("Mobile Platform");
  }

  // getValueFor("token");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username || "Guest"}!</Text>
      <Text>Your token: {user?.token || "No Token Available"}</Text>

      {/* Display other user-related data */}
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
    marginBottom: 16,
  },
});
