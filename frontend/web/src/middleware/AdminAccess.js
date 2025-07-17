import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminAccess = ({ children }) => {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      setUser(null);
      navigate("/admin/login", { replace: true });
    }
  }, [user, loading, setUser, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return children;
};

export default AdminAccess;
