import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await api.post("/login", { email, password });

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.jwt);

      const hasProfile = await api.get(`/login/${response.data.id}/check`);
      setIsAuth(true);

      if (hasProfile.data) {
        navigate(`/profiles/${response.data.id}`);
      } else {
        navigate(`/profiles`);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;