import { useEffect,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatsFetch } from "../redux/slices/catSlice";
import { useNavigate } from "react-router-dom";

export default function Home() { 
  const cats = useSelector((state) => state.cats.cats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);
  console.log(cats);


  const handleAuth = () => {
    if (isAuthenticated) {
      localStorage.removeItem("authenticated"); // Xóa trạng thái đăng nhập
      setIsAuthenticated(false);
    } else {
      navigate("/login"); // Chuyển đến trang đăng nhập
    }
  };

  return (
    <div>
    {Array.isArray(cats) ? (
      cats.map((cat, index) => <p key={index}>{cat.name}</p>)
    ) : (
      <p>{JSON.stringify(cats)}</p> 
    )}

    {/* Hiển thị nút tương ứng với trạng thái đăng nhập */}
    <button onClick={handleAuth}>
        {isAuthenticated ? "Đăng xuất" : "Đăng nhập"}
      </button>
  </div>
  );
}