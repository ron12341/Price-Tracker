import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import HomeAdmin from "./pages/admin/HomeAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
