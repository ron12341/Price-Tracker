import { Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ProductsPage from "../pages/public/ProductsPage";
import ProductDetailPage from "../pages/public/ProductDetailPage";
import SuggestProductPage from "../pages/public/SuggestProductPage";

const PublicRoutes = [
  <Route path="/" element={<HomePage />} key="home" />,
  <Route path="/products" element={<ProductsPage />} key="products" />,
  <Route
    path="/products/:id"
    element={<ProductDetailPage />}
    key="product-detail"
  />,
  <Route path="/suggest-product" element={<SuggestProductPage />} />,
];

export default PublicRoutes;
