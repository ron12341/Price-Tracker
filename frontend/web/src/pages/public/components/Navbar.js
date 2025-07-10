import "./Navbar.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <p>Price Tracker</p>
      </div>
      <div className="navbar-right">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
