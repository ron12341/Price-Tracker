import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
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
    <div>
      <h1>Products</h1>
      {products && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.query}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <h2> Empty </h2>
      )}
    </div>
  );
};

export default Products;
