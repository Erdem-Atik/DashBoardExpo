import { Slot, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import BrandHeader from "../components/Brandheader";

import { useEffect } from "react";

export default mainlayout = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login screen on app start
    router.replace("/login"); // Change to '/auth' if you prefer
  }, []);

  return (
    <View style={styles.container}>
      <BrandHeader />
      <View style={styles.content}>
        <Slot />
      </View>
      <Footer />
    </View>
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
