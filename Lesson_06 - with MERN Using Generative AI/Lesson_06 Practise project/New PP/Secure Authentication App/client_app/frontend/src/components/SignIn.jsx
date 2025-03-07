// src/components/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/signin", { username, password });
      localStorage.setItem("token", response.data.token); // Save the JWT token
      localStorage.setItem("username", username); // Save the username
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignIn} className="auth-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
