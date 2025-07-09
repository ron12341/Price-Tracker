import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPageStyles.css";
import { register } from "../../services/authService";

const ResgisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      navigate("/auth/login");
    } catch (error) {
      alert(error.response.data.error);
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo-text">Register</h1>
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
            Register
          </button>
        </form>
        <div className="auth-links">
          <button className="link-button" onClick={() => alert("Login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResgisterPage;
