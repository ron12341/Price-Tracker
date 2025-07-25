import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      {PublicRoutes}

      {/* Auth */}
      {AuthRoutes}

      {/* Admin */}
      {AdminRoutes}

      {/* 404 */}
      <Route path="*" element={<div>404 NOT FOUND</div>} />
    </Routes>
  );
};

export default AppRoutes;
