import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

export default function App() {
  return (
  //   <Router>
  //   <Routes>
  //     <Route path="/login" element={<Login />} />
  //     <Route
  //       path="/"
  //       element={
  //         <ProtectedRoute> 
  //           {/* Kiểm tra xem đăng nhập chưa. nếu đăng nhập rồi thì chuyển tới trang Home */}
  //           {/* Thường set token vào localStorage. rồi vào trang ProtectedRoute Kiểm tra */}
  //           {/* Đây t đang để set mặc định là true */}
  //           <Home />
  //         </ProtectedRoute>
  //       }
  //     />
  //     <Route path="/register" element={<Register />} />
  //     <Route path="*" element={<NotFound />} />
  //   </Routes>
  // </Router>

  <Router>
  <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</Router>
  )
}

