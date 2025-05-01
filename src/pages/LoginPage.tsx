import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', response.token);
        // Redirect to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };
  

  const handleSignupRedirect = () => {
    navigate("/signup");  // Redirect to signup page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      {error && <p className="error">{error}</p>}

      {/* Signup Redirect Button */}
      <div className="signup-redirect">
        <button onClick={handleSignupRedirect} className="text-blue-600">
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
