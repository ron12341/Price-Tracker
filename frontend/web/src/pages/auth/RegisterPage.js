import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import Navbar from "./components/Navbar";

const ResgisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState({
    first: "",
    last: "",
  });
  const [errorMsgs, setErrorMsgs] = useState({});

  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters long.";
    }
    if (!password.match(/[0-9]/)) {
      errors.number = "Password must contain at least one number.";
    }
    if (!password.match(/[a-z]/)) {
      errors.lowercase = "Password must contain at least one lowercase letter.";
    }
    if (!password.match(/[A-Z]/)) {
      errors.uppercase = "Password must contain at least one uppercase letter.";
    }
    if (!password.match(/[@$!%*?&]/)) {
      errors.special = "Password must contain at least one special character.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password);

    if (Object.keys(errors).length > 0) {
      setErrorMsgs(errors);
      return;
    }

    try {
      await register(email, password, name);
      navigate("/auth/login");
    } catch (error) {
      setErrorMsgs({
        error: "Error registering user. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content*/}
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 font-sans text-gray-800">
        {/* Register Form*/}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-[600px] w-full text-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Register</h1>

          <form onSubmit={handleSubmit}>
            {/* Email Field*/}
            <div className="relative text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base"
                required
              />
            </div>

            {/* Name Field */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={name.first}
                  onChange={(e) => setName({ ...name, first: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base"
                  required
                />
              </div>

              <div className="relative text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={name.last}
                  onChange={(e) => setName({ ...name, last: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base"
                  required
                />
              </div>
            </div>

            {/* Password Field*/}
            <div className="relative mb-2 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
                <span className="ml-1 relative group cursor-pointer">
                  <span className="text-blue-500 font-bold">?</span>
                  <div className="absolute left-4 top-6 z-10 w-64 p-3 bg-white border border-gray-300 rounded-lg shadow-md text-xs text-gray-700 hidden group-hover:block">
                    Password must:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Be at least 8 characters</li>
                      <li>Include at least one number</li>
                      <li>Include at least one lowercase letter</li>
                      <li>Include at least one uppercase letter</li>
                      <li>Include at least one special character</li>
                    </ul>
                  </div>
                </span>
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

            {/* Password Validation Messages */}
            {Object.keys(errorMsgs).length > 0 && (
              <div className="text-red-500 text-base mb-4 text-left">
                {Object.values(errorMsgs).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-800 transition-colors"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResgisterPage;
