import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {}

    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link to="/" className="text-xl font-bold">
        GigFlow
      </Link>

      <div className="flex gap-4">
        {loggedIn ? (
          <>
            <Link to="/create-gig" className="border px-3 py-1">
              Post Gig
            </Link>
            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;