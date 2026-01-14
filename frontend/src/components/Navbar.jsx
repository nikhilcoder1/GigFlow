import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/api/auth/logout"); // backend will clear cookie
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link to="/" className="text-xl font-bold">
        GigFlow
      </Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/create-gig" className="border px-3 py-1">
              Post Gig
            </Link>
            <button onClick={logout} className="bg-black text-white px-3 py-1">
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
