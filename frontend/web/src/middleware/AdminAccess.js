import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminAccess = ({ children }) => {
  const { user, setUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && (!user || !user.isAdmin)) {
      setUser(null);
      navigate("/admin/login", { replace: true });
    }
  }, [user, isAuthLoading, setUser, navigate]);

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return children;
};

export default AdminAccess;
