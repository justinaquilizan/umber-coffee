import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
import "../styles/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Please enter your username");
      toast.error("Please enter your username");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Please enter your password");
      toast.error("Please enter your password");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        toast.success("Login successful!");
        // Login handled by AuthContext, redirection in useEffect
      } else {
        setLoginError("Invalid username or password");
        toast.error("Invalid username or password");
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to access your dashboard</p>
        </div>

        <form id="loginForm" className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
                setLoginError("");
              }}
              required
            />
            {usernameError && (
              <div className="error-message">{usernameError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setLoginError("");
              }}
              required
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            {loginError && <div className="error-message">{loginError}</div>}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <a
              href="#"
              className="forgot-password"
              onClick={() =>
                toast.info(
                  "Password reset functionality would be implemented here."
                )
              }>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>Demo Account</span>
        </div>

        <div className="demo-credentials">
          <h3>Use these credentials to login:</h3>
          <p>
            <strong>Username:</strong> admin
          </p>
          <p>
            <strong>Password:</strong> coffee123
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
