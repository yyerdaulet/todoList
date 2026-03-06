// src/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("No token provided");
      return;
    }

    api
      .get(`/register/verify?token=${token}`)
      .then((res) => {
        setStatus(res.data);

        // redirect to login after 2s if successful
        if (res.data === "email verified successfully!") {
          setTimeout(() => navigate("/login"), 2000);
        }
      })
      .catch((err) => {
        if (err.response) setStatus(err.response.data);
        else setStatus("Network error");
      });
  }, [searchParams, navigate]);

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Email Verification</h2>
      <p>{status}</p>
    </div>
  );
}