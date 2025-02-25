import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from "./pages/Footer";


function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="app-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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

