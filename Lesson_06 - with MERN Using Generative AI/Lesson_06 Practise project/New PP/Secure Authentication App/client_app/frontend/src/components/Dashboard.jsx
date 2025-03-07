// src/components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Get the username and token from localStorage
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    // Clear JWT token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Redirect to SignIn page
    navigate("/signin");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <p>Welcome, {username}!</p>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
