import React, { useState, useEffect } from 'react';
import ShowProduct from "../components/ShowProduct";

const Sanpham = () => {
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Danh sách các danh mục
    const categories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
    ];

    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/getAll');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProductCount(data.totalElements);
            } catch (error) {
                console.error('Error fetching product count:', error);
            }
        };

        fetchProductCount();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = selectedCategory 
                    ? `http://localhost:8080/api/products?categoryId=${selectedCategory}` 
                    : 'http://localhost:8080/api/products/getAll'; // Lấy tất cả sản phẩm
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setProducts(data.products); // Giả sử dữ liệu sản phẩm nằm trong trường `products`
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]); // Chạy lại khi selectedCategory thay đổi

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleShowAllProducts = () => {
        setSelectedCategory(null); // Đặt lại để hiển thị tất cả sản phẩm
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
                        <button className="btn btn-outline-secondary" type="button" onClick={handleShowAllProducts}>
                            Hiển Thị Tất Cả
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button className="btn btn-outline-secondary" type="button" onClick={() => handleCategoryChange(category.id)}>
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
            <ShowProduct products={products} />
        </div>
    );
};

export default Sanpham;
