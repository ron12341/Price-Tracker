import { Link } from "react-router-dom";

import "./ProductCard.css";

// const product = {
//   name: "Asus PRIME GeForce RTX 5060 Ti 16 GB Video Card",
//   query: "Asus PRIME GeForce RTX 5060 Ti 16 GB Video Card",
//   price: "619.99",
//   img: "https://m.media-amazon.com/images/I/81aN+w8d4GL._AC_SL1500_.jpg",
// };

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.query}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
