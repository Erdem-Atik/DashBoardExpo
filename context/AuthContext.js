import React, { createContext, useState, useContext } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const login = async (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    Cookies.set("my-key", newToken);
    router.push("/mainPage"); // Navigate to the dashboard
  };

  const logout = async () => {
    setToken(null);
    Cookies.remove("my-key");
    router.push("/login"); // Navigate to the login screen
  };

  const loadToken = async () => {
    const savedToken = Cookies.get("my-key");
    if (savedToken) {
      setToken(savedToken);
      router.replace("/mainPage"); // Navigate to the dashboard if a token exists
    }
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, loadToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log("AuthContext value:", context); // Debug
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
