import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      if (res.data.message === "User registered successfully!") {
      // Redirect to categories page
      navigate("/login");  
    }

      alert("Account created successfully!");
    } catch (err) {
      alert("Failed to register");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="text-center">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
