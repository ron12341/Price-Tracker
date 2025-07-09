import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetailPage.css";

import Narvbar from "./components/Navbar";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formatted;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        console.log(response);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

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
          <p>Last Scraped at: {formatDate(product.scrapedAt)}</p>
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
                  <tr key={store.storeName}>
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
