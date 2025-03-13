import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from "./components/Footer";
import Sanpham from "./pages/Sanpham";
import ProductDetail from "./components/Item";
import ShowProduct from "./components/ShowProduct";
import ProductSearch from "./pages/ProductSearch";
import Cart from "./pages/Cart";
import CartList from "./components/CartList";



function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/Admin", "/CartList"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Sanpham" element={<Sanpham />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/CartList" element={<CartList/>} />
          <Route path="/ProductSearch" element={<ProductSearch/>} />
          <Route path="/ShowProduct" element={<ShowProduct />} />
          <Route path="/Product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

