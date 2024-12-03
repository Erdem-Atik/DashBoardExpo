import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLIENTS</Text>
      <Button
        title="Client 1 Screen"
        onPress={() => router.push('/dashboard/client1')}
      />
      <Button
        title="Client 2 Screen"
        onPress={() => router.push('/dashboard/client2')}
      />
      <View style={styles.signOutContainer}>

      </View>
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
    marginTop: 30, // Adds spacing to separate from other buttons
    width: '80%', // Makes the button stretch a bit horizontally
    alignSelf: 'center', // Centers the button properly
  },
});