import { useState } from "react";
import axios from "axios";
import "./AuthPageStyles.css";

const ResgisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo-text">Price Tracker</h1>
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
