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
    navigate("/login");
  };

  return (
    <div
      className="navbar navbar-expand-lg bg-body-tertiary navbar bg-primary"
      data-bs-theme="light"
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          Navbar
        </a>

        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        </button> */}


          {/* ---------------------------- USER PROFILE SECTION ---------------------------- */}
          {!user && (
            <div>
              <button
                className="btn btn-light me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-warning"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          )}

          {user && (
            <div className="d-flex align-items-center">
              <span className="me-3 text-black fw-bold">
                👤 {user.name}
              </span>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    
  );
});

export default Navbar;
