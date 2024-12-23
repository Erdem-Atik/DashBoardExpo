import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState, useEffect, use } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser, getValidateToken } from "../../api/auth";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, loadToken } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await loadToken(); // Ensure loadToken is defined in context
        if (token) {
          const isValid = await getValidateToken(token);
          if (isValid) {
            return; // Already routed in loadToken
          }
        }
      } catch (err) {
        console.error("Token validation error:", err);
      }
    };

    checkToken();
  }, [loadToken]);

  const handleLogin = async () => {
    try {
      const { token } = await loginUser(username, password); // Fetch token from API
      login(token, username); // Save token and navigate
    } catch (err) {
      setError(err.message || "Invalid login credentials");
    }
  };

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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
});

export default LoginScreen;
