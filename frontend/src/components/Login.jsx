import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      navigate("/"); // go to home
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="container mt-5 "  style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary">
          Register here
        </Link>
      </p>
    </div>
    </div>
  );
}
