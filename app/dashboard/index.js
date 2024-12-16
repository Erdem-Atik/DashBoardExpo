import React, { useContext, useEffect } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { AppContext } from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cookies from "js-cookie";

const GetCookie = () => {
  alert(Cookies.get("my-key"));
};

export default function Dashboard() {
  const { user } = useContext(AppContext);
  // const [token, setToken] = useState("");
  // const [error, setError] = useState(null);

  console.log(user?.token || "No Token Available");

  useEffect(() => {
    if (Platform.OS === "web") {
      console.log("Web Platform");
      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem("my-key", jsonValue);
          Cookies.set("my-key", value);
        } catch (e) {
          // saving error
        }
      };
      if (user?.token) storeData(user.token); // save tg
      else return;
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
  }, [user?.token]);

  // getValueFor("token");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username || "Guest"}!</Text>
      {/* <Text>Your token: {user?.token || "No Token Available"}</Text> */}
      <button onClick={GetCookie}>Get Cookie</button>

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
