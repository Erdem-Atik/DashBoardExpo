import React, { useContext, useEffect } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import { createProject, getProjects } from "../../api/projects";

const GetCookie = () => {
  alert(Cookies.get("my-key"));
};

export default function Dashboard() {
  const { user } = useContext(AppContext);

  console.log(user?.token || "No Token Available");

  useEffect(() => {
    if (Platform.OS === "web") {
      console.log("Web Platform");

      if (user?.token) {
        const newProject = {
          name: "instance-1",
          description: "erdem 1.1.1",
          startDate: "2024-01-01",
          endDate: "2024-12-31",
        };

        const createResult = createProject(user.token, newProject);
        console.log("Proje oluşturma sonucu:", createResult);

        const projects = getProjects(user.token);
        console.log("Proje listesi:", projects);
      } else return;
    }
  }, [user?.token]);

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
