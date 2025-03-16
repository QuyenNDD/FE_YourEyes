import React, { useState, useEffect } from 'react';
import ProductList from '../components/DanhSachSanPham';

const Sanpham = () => {
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, name: 'Dior' },
        { id: 2, name: 'Chopard' },
        { id: 3, name: 'Cartier' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Hiển thị trạng thái đang tải
            try {
                const response = await fetch('http://localhost:8080/api/products/getAll');
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();

                // Lưu danh sách sản phẩm vào state
                if (Array.isArray(data.content)) {
                    setProducts(data.content);
                    // setProductCount(data.totalElements) // Dữ liệu sản phẩm
                } else {
                    throw new Error('Dữ liệu không hợp lệ');
                }
            } catch (error) {
                setError(error); // Lưu lỗi
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        fetchProducts(); // Gọi hàm
    }, []);
    const filteredProducts = selectedCategory
        ? products.filter(product => product.categoryId?.id === selectedCategory)
        : products;

    useEffect(() => {
        if (selectedCategory) {
            setProductCount(filteredProducts.length); // Đếm số lượng sản phẩm đã lọc
        } else {
            setProductCount(products.length); // Hiển thị tổng số nếu không lọc
        }
    }, [filteredProducts, selectedCategory]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleShowAllProducts = () => {
        setSelectedCategory(null);
    };

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p>Có lỗi xảy ra khi lấy dữ liệu: {error.message}</p>;
    }

    return (
        <div className="containerr">
            <div className="Product-cartergory">
                <h2>Tất cả sản phẩm</h2>
                <div className="product-button">
                    <li>
                        <button
                            className={`btn btn-outline-secondary ${selectedCategory === null ? 'active' : ''}`}
                            type="button"
                            onClick={handleShowAllProducts}
                        >
                            Hiển Thị Tất Cả
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                className={`btn btn-outline-secondary ${selectedCategory === category.id ? 'active' : ''
                                    }`}
                                type="button"
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </div>
            </div>
            <div className="Product-button">
                <div className="cout-sanpham">
                    <li>
                        <span>(</span>
                        <span id="product-count">{productCount}</span>
                        <span> sản phẩm</span>
                        <span>)</span>
                    </li>
                </div>
            </div>
            <ProductList products={filteredProducts} />
        </div>
    );
};

export default Sanpham;
