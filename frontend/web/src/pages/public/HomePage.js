import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Navbar from "./components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Price Tracker
        </h1>

        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Track product prices easily and never miss a good deal.
        </p>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition"
          onClick={() => navigate("/products")}
        >
          Get Started
        </button>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Price Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
