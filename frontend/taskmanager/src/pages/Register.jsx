import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MANAGER");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!agreed) {
      alert("You must agree to the terms");
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", {
        name,
        email,
        role,
        password,
      });

      navigate("/login"); // Redirect after successful registration
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="MANAGER">MANAGER</option>
            <option value="ASSIGNEE">ASSIGNEE</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            style={{ marginRight: "8px" }}
          />
          <label>I have read and agree to the terms</label>
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

