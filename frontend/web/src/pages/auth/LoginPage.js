import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";
import Navbar from "./components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token, isAdmin } = await login(email, password);
      setUser({ token, isAdmin });

      console.log(redirectTo);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 font-sans text-gray-800">
        {/* Login Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-[600px] w-full text-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="relative text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base"
                required
              />
            </div>
            {/* Password Field */}
            <div className="relative text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base"
                required
              />
            </div>
            {/* Error message */}
            {errorMsg && (
              <div className="text-red-500 text-sm mb-4 text-left">
                {errorMsg}
              </div>
            )}{" "}
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-800 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Don't have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
