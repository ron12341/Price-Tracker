import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [lowestPriceStore, setLowestPriceStore] = useState(product.stores[0]);

  const findLowestPrice = () => {
    let lowestPriceStore = product.stores[0];
    for (let i = 1; i < product.stores.length; i++) {
      if (product.stores[i].price < lowestPriceStore.price) {
        lowestPriceStore = product.stores[i];
      }
    }
    return lowestPriceStore;
  };

  useEffect(() => {
    setLowestPriceStore(findLowestPrice());
  }, []);

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <p className="product-name">{product.query}</p>
      </Link>
      <div className="price-container">
        <p>
          <span className="price-symbol">$</span>
          {lowestPriceStore.price}
        </p>
        <p className="store-name">{lowestPriceStore.storeName}</p>
      </div>
    </div>
  );
};

export default ProductCard;
