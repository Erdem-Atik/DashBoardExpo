import React, { createContext, useState } from "react";
import { login as loginRequest } from "../api/auth"; // Import the login function

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const [user, setUser] = useState({
  //   username: "manager1",
  //   password: "password123",
  //   loggedIn: false,
  // });

  const [user, setUser] = useState(null); // User data
  const [error, setError] = useState(null); // Error handling (optional)

  //   user: "aqa.com"
  //   password:"pass"

  const login = async (username, password) => {
    try {
      const userData = await loginRequest(username, password);
      console.log(userData);
      setUser(userData); // Save user data
      setError(null); // Clear errors
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <AppContext.Provider value={{ user, login, error }}>
      {children}
    </AppContext.Provider>
  );
};
