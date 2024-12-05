import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Bilss() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bills</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOutContainer: {
    marginTop: 1, // Adds spacing to separate from other buttons
    width: '80%', // Makes the button stretch a bit horizontally
    alignSelf: 'center', // Centers the button properly
  },
});

  