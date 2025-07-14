import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./HomeAdmin.css";

const HomeAdmin = () => {
  const products = [
    { name: "Product 1", item: "Product 1" },
    { name: "Product 2", item: "Product 2" },
    { name: "Product 3", item: "Product 3" },
  ];

  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/admin/products", { state: { items: products } });
  };

  return (
    <div>
      <div className="home-container">
        <Navbar />

        <div className="content">
          <h1>Site Administration</h1>

          <table>
            <thead>
              <tr>
                <th>Collections</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td onClick={goToProducts}>
                  <p>Products</p>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Users</p>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
