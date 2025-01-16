import { Slot, Stack, useRouter } from "expo-router";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useState } from "react";

export default function ClientLayout() {
  const router = useRouter();
  const { logout } = useAuth();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    paddingVertical: 25, // Equal top and bottom padding
    paddingHorizontal: 25, // Equal left and right padding
    backgroundColor: "#ecf4f4",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    borderRadius: 25,
    paddingVertical: 10, // Equal top and bottom padding
    paddingHorizontal: 10, // Equal left and right padding
    marginVertical: 0, // Equal top and bottom margin
    marginHorizontal: 10, // Equal left and right margin
    width: "100%",
    height: "100%",
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
