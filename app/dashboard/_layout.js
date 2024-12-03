import { Slot, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ClientLayout() {
  const router = useRouter();

  const handleSignOut = () => {
    router.replace('/login'); // Navigate to login screen and prevent back navigation
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text 
        style={styles.title}
        onPress={() => router.push("/dashboard")}
        >WELCOME To The DASHBOARD</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
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
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'lavender',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signOutButton: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 5, // Add some space between the icon and text
  },
});