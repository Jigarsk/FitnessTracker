import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get display name (username)
      const username = userCredential.user.displayName || "User";
      localStorage.setItem("username", username);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <p style={styles.text}>
          Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f7f7f7"
  },
  card: {
    width: 350,
    padding: 24,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center" as React.CSSProperties["textAlign"],
    marginBottom: 24
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 16
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    marginTop: 12,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    background: "#1565c0",
  },
  text: {
    marginTop: 12,
    textAlign: "center" as React.CSSProperties["textAlign"],
    fontSize: 14,
    color: "#555"
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
  }
};
