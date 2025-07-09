import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";
import "./AuthPageStyles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token, isAdmin } = await login(email, password);
      setUser({ token, isAdmin });

      if (from.startsWith("/admin")) {
        if (isAdmin) {
          navigate("/admin");
        } else {
          alert("You are not authorized to access this page.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const goToRegister = () => navigate("/auth/register");

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo-text">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-links">
          <button className="link-button" onClick={goToRegister}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
