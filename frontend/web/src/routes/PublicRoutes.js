import { Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ProductsPage from "../pages/public/ProductsPage";
import ProductDetailPage from "../pages/public/ProductDetailPage";
import SuggestProductPage from "../pages/public/SuggestProductPage";
import MyProductSuggestionsPage from "../pages/public/MyProductSuggestionsPage";
import EditSuggestedProductPage from "../pages/public/EditSuggestedProductPage";

const PublicRoutes = [
  <Route path="/" element={<HomePage />} key="home" />,
  <Route path="/products" element={<ProductsPage />} key="products" />,
  <Route path="/products/:id" element={<ProductDetailPage />} key="product-detail" />,
  <Route path="/suggest-product" element={<SuggestProductPage />} />,
  <Route path="/my-suggestions" element={<MyProductSuggestionsPage />} />,
  <Route path="/my-suggestions/:id/edit" element={<EditSuggestedProductPage />} />,
];

export default PublicRoutes;
