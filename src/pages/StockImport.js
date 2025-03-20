import React, { useState, useEffect } from "react";
import axios from 'axios';
import MenuBar from "../components/MenuBar";

const StockImport = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        productName: "",
        quantity: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const pageSize = 10;

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/products/getAll?page=${currentPage}&size=${pageSize}`);
            if (response.data.content) {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Lấy token từ localStorage (hoặc sessionStorage)

        if (!token) {
            setError("Bạn cần đăng nhập để thực hiện chức năng này.");
            return;
        }

        try {
            const payload = {
                productName: formData.productName,
                quantity: parseInt(formData.quantity, 10), // Chuyển đổi quantity sang số
            };

            const response = await fetch("http://localhost:8080/api/stock-imports/import", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Thêm token vào Authorization header
                },
                body: JSON.stringify(payload),
            });
            console.log(payload)

            if (response.ok) {
                const result = await response.text();

                setMessage(result);
                setError("");
                setFormData({
                    productName: "",
                    quantity: "",
                });
                fetchProducts(page);
            } else {
                const errorMessage = await response.text();
                setMessage("");
                setError(errorMessage);
            }
        } catch (err) {
            setMessage("");
            setError("Lỗi hệ thống: Không thể kết nối đến server.");
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    

    return (
        <div>
            {/* Navigation */}
            <MenuBar />

            {/* Stock Import Form */}
            <article>
                <h2 >Nhập Hàng</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Tên Sản Phẩm
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Nhập tên sản phẩm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Số Lượng
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Nhập số lượng"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="login__button"
                    >
                        Nhập Hàng
                    </button>
                </form>
                <div className="tablee">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Danh mục</th>
                                <th>Số lượng</th>
                                <th>URL hình ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryId?.name}</td>
                                    <td>{product.stock}</td>
                                    <td><img src={product.imageUrl} alt={product.name} width="50" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button onClick={() => handlePageChange(0)} disabled={page === 0}>«</button>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>‹</button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i)} className={page === i ? 'active' : ''}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>›</button>
                    <button onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1}>»</button>
                </div>

                {/* Message Section */}
                {message && (
                    <p className="mt-4 text-green-600 font-medium">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-600 font-medium">{error}</p>
                )}
            </article>
        </div>
    );
};

export default StockImport;
