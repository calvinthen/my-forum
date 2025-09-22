import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setMessage("❌ Password must be at least 6 characters long and include both letters and numbers.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register");

      setMessage("✅ Registered successfully! You can now login.");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <DefaultLayout hideWelcome={true}>
      <div className="register-wrapper">
        <form className="register-form" onSubmit={handleRegister}>
          <h2 className="register-title">Create Account</h2>  {/* 🔹 moved inside */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
          {message && <p className="register-message">{message}</p>}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Register;