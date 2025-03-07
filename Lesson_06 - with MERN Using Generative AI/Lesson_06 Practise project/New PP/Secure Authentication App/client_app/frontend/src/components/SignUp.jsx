// src/components/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await api.post("/signup", { username, password, role });
      navigate("/signin"); // Redirect to SignIn after successful signup
    } catch (err) {
      setError("Error creating user, please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp} className="auth-form">
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
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
