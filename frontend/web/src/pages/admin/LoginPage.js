import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await login(email, password);
      const isAdmin = res.user.isAdmin;

      if (isAdmin) {
        setUser({
          token: res.token,
          isAdmin: res.user.isAdmin,
          email: res.user.email,
          firstName: res.user.name.first,
          lastName: res.user.name.last,
          trackedProducts: res.user.trackedProducts,
        });
        navigate("/admin");
      } else {
        setErrorMsg("You are not authorized to access this page.");
      }
    } catch (error) {
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#bebebe] font-sans">
      <form onSubmit={handleSubmit} className="bg-sky-800 shadow-md rounded-md p-[20px] max-w-[500px] w-full">
        <h2 className="text-3xl font-semibold mb-5 text-white">Login as admin</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 font-semibold mb-4">{errorMsg}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
