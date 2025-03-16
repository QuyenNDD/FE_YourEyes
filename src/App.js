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
import UserList from "./components/UserList";
import DiscountList from "./components/DiscountList";
import CartBill from "./components/CartBill";
import Blog from "./pages/Blog";

function AppContent() {
  const location = useLocation();

  // Danh sách các đường dẫn cần ẩn Header/Footer
  const hideHeaderPaths = ["/Admin", "/CartList", "/UserList", "/DiscountList"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="app-content">
        <Routes>
          {/* Trang cho tất cả người dùng */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Sanpham" element={<Sanpham />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/ProductSearch" element={<ProductSearch />} />
          <Route path="/ShowProduct" element={<ShowProduct />} />
          <Route path="/Product/:id" element={<ProductDetail />} />

          {/* Trang dành riêng cho ADMIN */}
          <Route
            path="/Admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CartList"
            element={
              <ProtectedRoute adminOnly={true}>
                <CartList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserList"
            element={
              <ProtectedRoute adminOnly={true}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DiscountList"
            element={
              <ProtectedRoute adminOnly={true}>
                <DiscountList />
              </ProtectedRoute>
            }
          />

          {/* Trang không tìm thấy */}
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
