import React, { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || null;
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
    }
  }, [isLoggedIn, currentUser]);

  const login = (username, password) => {
    // Static credentials for validation
    const validUsername = "admin";
    const validPassword = "coffee123";

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
