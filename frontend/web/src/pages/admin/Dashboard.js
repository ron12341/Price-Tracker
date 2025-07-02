import { useEffect, useState } from "react";
import axios from "axios";

import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <h2> Product Dashboard </h2>
      <table className="product-table">
        <thead>
          <tr>
            <th> Product </th>
            <th> Stores </th>
            <th> Actions </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.query}>
              <td> {product.name} </td>
              <td>
                {product.stores.map((store) => (
                  <div key={store.storeName} className="store-info">
                    <p> Store Name: {store.storeName} </p>
                    <p> Price: {store.price} </p>
                    <p> URL: {store.url} </p>
                  </div>
                ))}
              </td>
              <td>
                <button> Trigger Scrape </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
