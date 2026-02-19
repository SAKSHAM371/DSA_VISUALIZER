import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 IMPORTANT: Replace with your Render backend URL
 const API_BASE_URL = "https://dsa-visualizer-jaye.onrender.com";



  const handleRegister = async () => {
    if (!name || !email || !password) { 
      setError("Please fill all fields."); 
      return; 
    }
    setLoading(true); 
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setError("");
        setName(""); 
        setEmail(""); 
        setPassword("");
        setIsRegister(false);
        alert("Registered successfully! Please log in.");
      } else {
        setError(data.msg || "Registration failed.");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) { 
      setError("Enter email and password."); 
      return; 
    }
    setLoading(true); 
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError(data.msg || "Invalid email or password.");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") isRegister ? handleRegister() : handleLogin();
  };

  return (
    <div className="login-page">

      <div className="login-bg-bars" aria-hidden="true">
        {[60, 40, 80, 30, 70, 50, 90, 45, 65, 35, 75, 55].map((h, i) => (
          <div key={i} className="bg-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>

      <div className="login-box">
        <div className="login-logo">
          <span className="login-logo-icon">⬛</span>
          <span className="login-logo-text">DSA<span>Viz</span></span>
        </div>

        <h2 className="login-heading">{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p className="login-sub">
          {isRegister ? "Join and start visualizing algorithms" : "Sign in to continue"}
        </p>

        <div className="login-form">
          {isRegister && (
            <div className="field-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKey}
                className="login-input"
              />
            </div>
          )}

          <div className="field-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              className="login-input"
            />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
              className="login-input"
            />
          </div>

          {error && <div className="login-error">⚠ {error}</div>}

          <button
            className="login-submit"
            onClick={isRegister ? handleRegister : handleLogin}
            disabled={loading}
          >
            {loading ? "Please wait…" : isRegister ? "Create Account" : "Sign In →"}
          </button>
        </div>

        <p className="login-switch">
          {isRegister ? "Already have an account?" : "New here?"}
          <span onClick={() => { setIsRegister(!isRegister); setError(""); }}>
            {isRegister ? " Sign in" : " Create account"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
