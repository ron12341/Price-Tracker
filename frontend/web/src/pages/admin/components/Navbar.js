import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <p>Price Tracker</p>
      </div>
      <div className="navbar-right">
        <p>Welcom, Admin</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
