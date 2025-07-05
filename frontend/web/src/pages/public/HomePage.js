import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Navbar from "./components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />

      <div className="content">
        <h2>Home</h2>
        <button onClick={() => navigate("/products")}>Go to products</button>
      </div>
    </div>
  );
};

export default HomePage;
