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
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 16, borderBottom: "1px solid #ccc" }}>
      <Link to="/">GigFlow</Link>
      <div style={{ display: "flex", gap: 12 }}>
        {loggedIn ? (
          <>
            <Link to="/create-gig">Post Gig</Link>
            <button onClick={logout}>Logout</button>
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