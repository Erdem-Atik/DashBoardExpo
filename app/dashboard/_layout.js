import { Slot, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function ClientLayout() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title} onPress={() => router.push("/dashboard")}>
          WELCOME TO THE DASHBOARD
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await logout();
          }}
          style={styles.signOutButton}
        >
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Slot for Nested Routes */}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    padding: 20,
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "lavender",
  },
  title: {
    fontSize: 24,
    paddingLeft: 50,
    fontWeight: "bold",
  },
  signOutButton: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center",
  },
  signOutText: {
    fontSize: 16,
    color: "red",
    marginLeft: 5, // Add some space between the icon and text
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF", // or your brand color
  },
  tagline: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  footer: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    color: "#666666",
    fontSize: 12,
  },
});
