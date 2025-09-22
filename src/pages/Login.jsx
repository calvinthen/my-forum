import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("user", JSON.stringify({ username: data.username }));
      navigate("/"); // redirect home
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <DefaultLayout hideWelcome>
      <div className="login-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2> {/* 🔹 moved inside card */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Login;