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
    <div className="register-outer min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="register-card rounded-lg p-6 shadow-md">
          <h3 className="text-center text-2xl font-semibold mb-6 text-black">Register</h3>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              className="block w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-black placeholder-gray-500"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="block w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-black placeholder-gray-500"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="block w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-black placeholder-gray-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-medium register-btn"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .register-outer {
          background-color: #7b2bdcff;
        }

        .register-card {
          background-color: #ffffff;
          color: #0b1220;
        }

        .register-btn {
          background-color: #7b2bdcff !important;
        }
        .register-btn:hover {
          filter: brightness(0.95);
        }
      `}</style>
    </div>
  );
}
