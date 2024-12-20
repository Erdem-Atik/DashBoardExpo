import { Slot, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import BrandHeader from "../components/Brandheader";
import { AuthProvider } from "../context/AuthContext";
import { useEffect } from "react";

const Mainlayout = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login screen on app start
    router.replace("/login"); // Change to '/auth' if you prefer
  }, []);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <BrandHeader />
        <View style={styles.content}>
          <Slot />
        </View>
        <Footer />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Mainlayout;
