import { Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const AuthRoutes = [
  <>
    <Route path="/auth/login" element={<LoginPage />} />,
    <Route path="/auth/register" element={<RegisterPage />} />
  </>,
];

export default AuthRoutes;
