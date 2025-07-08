import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PublicRoutes />
        <AuthRoutes />
        <AdminRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
