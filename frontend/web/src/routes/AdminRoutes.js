import { Routes, Route } from "react-router-dom";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Dashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/ProductList";
import AdminAccess from "../middleware/AdminAccess";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminAccess>
            <HomeAdmin />
          </AdminAccess>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminAccess>
            <Dashboard />
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
    </Routes>
  );
};

export default AdminRoutes;
