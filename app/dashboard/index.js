import { View, Text, Button, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { user, buildings } = useContext(AppContext);
  const router = useRouter();
  const buttonList = buildings.map((building) => (
    <Button
      key={building.id}
      title={building.name}
      onPress={() => router.push(`/dashboard/client1`)}
    />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RESIDENTS</Text>
      <li>{buttonList}</li>

      <View style={styles.signOutContainer}></View>
    </View>
  );
}

{
  /* <Button
title="Ahmet apt 1 Screen"
onPress={() => router.push("/dashboard/client1")}
/> */
}

{
  /* <Button
key={building.id}
title={building.name}
onPress={() => router.push(`/dashboard/${building.id}`)}
/> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  signOutContainer: {
    marginTop: 30, // Adds spacing to separate from other buttons
    width: "80%", // Makes the button stretch a bit horizontally
    alignSelf: "center", // Centers the button properly
  },
});
