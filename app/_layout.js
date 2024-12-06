import { Slot, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import BrandHeader from "../components/Brandheader";
import { AppProvider } from "../context/AppContext";

import { useEffect } from "react";

export default mainlayout = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login screen on app start
    router.replace("/login"); // Change to '/auth' if you prefer
  }, []);

  return (
    <AppProvider>
      <View style={styles.container}>
        <BrandHeader />
        <View style={styles.content}>
          <Slot />
        </View>
        <Footer />
      </View>
    </AppProvider>
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
