import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetailPage.css";

import Narvbar from "./components/Navbar";

const product = {
  name: "Asus PRIME GeForce RTX 5060 Ti 16 GB Video Card",
  query: "Asus PRIME GeForce RTX 5060 Ti 16 GB Video Card",
  price: "619.99",
  img: "https://m.media-amazon.com/images/I/81aN+w8d4GL._AC_SL1500_.jpg",
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail-page">
      <Narvbar />
      <div className="product-name-container">
        <h1>{product.name}</h1>
      </div>
      <div className="content">
        <div className="left-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="right-container">
          <div className="prices-container">
            <table>
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Availability</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {product.stores.map((store) => (
                  <tr>
                    <td>{store.storeName}</td>
                    <td>Available</td>
                    <td>{store.price}</td>
                    <td className="buy-button">
                      <a
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy Now
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
