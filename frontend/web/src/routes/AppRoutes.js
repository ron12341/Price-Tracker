import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import ProductsPage from "../pages/public/ProductsPage";
import ProductDetailPage from "../pages/public/ProductDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomeAdmin from "../pages/admin/HomeAdmin";
import ProductList from "../pages/admin/ProductList";
import AdminAccess from "../middleware/AdminAccess";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      {/* Auth routes */}
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="auth/register" element={<RegisterPage />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminAccess>
            <HomeAdmin />
          </AdminAccess>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminAccess>
            <ProductList />
          </AdminAccess>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div>404 NOT FOUND</div>} />
    </Routes>
  );
};

export default AppRoutes;
