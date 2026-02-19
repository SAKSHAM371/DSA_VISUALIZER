import React, { useState } from "react";

const Register = ({ setIsLoggedIn }) => {
  // 🔥 IMPORTANT: Put your Render backend URL here
 const API_BASE_URL = "https://dsa-visualizer-jaye.onrender.com";



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Register button clicked");
    console.log("Form Data:", formData);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (res.ok) {
        setMessage("✅ Registered Successfully!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(data.msg || "Registration Failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      setMessage("❌ Cannot connect to server. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
