import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = memo(() => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="site-navbar sticky top-0 z-50 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-xl font-semibold cursor-pointer">
            {/* <a
              className="text-xl font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            > */}
              mesho
            {/* </a> */}
          </div>

          {/* Right side: auth buttons / profile */}
          <div className="flex items-center space-x-3">
            {!user && (
              <div className="flex items-center">
                <button
                  className="btn px-4 py-1 rounded-md text-sm font-medium"
                  onClick={() => navigate("/")}
                >
                  Login
                </button>

                <button
                  className="btn px-4 py-1 rounded-md text-sm font-medium"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}

            {user && (
              <div className="flex items-center space-x-3">
                <style>{`
                  .site-navbar .btn, .site-navbar button {
                    background-color: #ffffffff !important;
                    color: #000000ff !important;
                    border-color: transparent !important;
                  }

                  /* Keep readable text for light/warning variants if they appear */
                  .site-navbar .btn.btn-light,
                  .site-navbar .btn.btn-warning {
                    color: #000000 !important;
                  }
                `}</style>

                <span className="text-sm font-medium">👤 {user.name}</span>

                <button
                  className="btn px-3 py-1 rounded-md text-sm font-medium"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
