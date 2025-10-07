import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/logout", {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">BookLibrary</Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/addbook" className="text-gray-700 hover:text-blue-600">Add Book</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
