import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      localStorage.setItem("token", res.data.token);
      if(res.data.message==="Login successful"){
        //save user after login
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        navigate("/category");
      }
      alert("Login successful");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-outer min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="login-card rounded-lg p-6 shadow-md">
          <h3 className="text-center text-2xl font-semibold mb-6 text-black">Login</h3>

          <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full py-2 rounded-md text-white font-medium login-btn"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex gap-1">
          <p className="text-sm text-gray-600">Bitch no account?</p>
          <a
            className="text-indigo-600 hover:underline cursor-pointer text-sm"
            
            onClick={()=> navigate("/register")}
          >
            Create one
          </a>
          </div>
        </div>
      </div>

      <style>{`
        .login-outer {
          background-color: #7b2bdcff;
        }
        .login-card {
          background-color: #ffffff;
          color: #0b1220;
        }
        .login-btn {
          background-color: #7b2bdcff !important;
        }
        .login-btn:hover {
          filter: brightness(0.95);
        }
      `}</style>
    </div>
  );
}
