import { Link } from "react-router-dom";
import api from "../services/api";

const Navbar = () => {
  const logout = async () => {
    try { await api.post("/api/auth/logout"); } catch {}
    window.location.href = "/login";
  };

  return (
    <nav style={{display:"flex",justifyContent:"space-between",padding:16,borderBottom:"1px solid #ddd"}}>
      <Link to="/">GigFlow</Link>
      <div style={{display:"flex",gap:12}}>
        <Link to="/create-gig">Post Gig</Link>
        <button onClick={logout}>Logout</button>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;