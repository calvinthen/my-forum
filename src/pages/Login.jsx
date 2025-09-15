import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import "./Login.css"; // create this for styles

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

    // ✅ Save user info in localStorage
    localStorage.setItem("user", JSON.stringify({ username: data.username }));

    // ✅ Use data.username, not data.user.username
    setMessage(`✅ Welcome ${data.username}!`);
  } catch (err) {
    setMessage(`❌ ${err.message}`);
  }
};

  return (
    <DefaultLayout hideWelcome>
      <div className="login-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </DefaultLayout>
  );
};

export default Login;
