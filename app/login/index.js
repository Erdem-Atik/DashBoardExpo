import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser, getValidateToken } from "../../api/auth";
import Loader from "../../components/Loader";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially true to validate token
  const { login, loadToken } = useAuth();

  // Validate token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await loadToken(); // Ensure loadToken is defined in context
        if (token) {
          const isValid = await getValidateToken(token);
          if (isValid) {
            return; // Navigate or handle if already authenticated
          }
        }
      } catch (err) {
        console.error("Token validation error:", err);
      } finally {
        setIsLoading(false); // Stop showing loader
      }
    };

    checkToken();
  }, [loadToken]);

  // Handle login
  const handleLogin = async () => {
    setIsLoading(true); // Show loader during login
    try {
      const { token } = await loginUser(username, password); // Fetch token from API
      login(token, username); // Save token and navigate
    } catch (err) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setIsLoading(false); // Hide loader after login
    }
  };

  // Show Loader if `isLoading` is true
  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    paddingTop: 100,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    width: "30%",
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  input: {
    height: 40,
    width: "30%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
});

export default LoginScreen;
