import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        GigFlow
      </Link>

      {/* Actions */}
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <Link
              to="/create-gig"
              className="border px-3 py-1 rounded"
            >
              Post Gig
            </Link>

            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1">
              Login
            </Link>
            <Link to="/register" className="px-3 py-1">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
