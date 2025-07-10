import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminAccess = ({ children }) => {
  const { user, setUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    alert(
      "You are not authorized to access this page. Please log in as an admin."
    );
    setUser(null);
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AdminAccess;
