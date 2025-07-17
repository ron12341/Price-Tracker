import { Route } from "react-router-dom";
import LoginPage from "../pages/admin/LoginPage";
import HomeAdmin from "../pages/admin/HomeAdmin";
import ProductList from "../pages/admin/ProductList";
import ProductSuggestionList from "../pages/admin/ProductSuggestionList";
import AdminAccess from "../middleware/AdminAccess";

const AdminRoutes = [
  <Route path="/admin/login" element={<LoginPage />} />,

  <Route
    path="/admin"
    element={
      <AdminAccess>
        <HomeAdmin />
      </AdminAccess>
    }
  />,
  <Route
    path="/admin/products"
    element={
      <AdminAccess>
        <ProductList />
      </AdminAccess>
    }
  />,
  <Route
    path="/admin/product-suggestions"
    element={
      <AdminAccess>
        <ProductSuggestionList />
      </AdminAccess>
    }
  />,
];

export default AdminRoutes;
