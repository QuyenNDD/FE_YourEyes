// src/ProductSearch.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../components/Product';

const ProductSearch = () => {
    const [name, setName] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(0);

    const handleSearch = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true); // Bắt đầu tải

        try {
            const response = await fetch(`http://localhost:8080/api/products/search?name=${encodeURIComponent(name)}&page=0&size=10`);
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi tìm kiếm.');
            }
            const data = await response.json();
            setResults(data.content);
            setProductCount(data.totalElements)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Kết thúc tải
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <div className="containerr">
                <h1>Tìm kiếm sản phẩm</h1>
                <div className="form-tiemkiem">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên sản phẩm"
                            required
                        />
                        <button type="submit" className="login__button">Tìm kiếm</button>
                    </form>
                </div>

                <div className="timkiem-cout-sanpham">
                    <span>Tìm thấy (</span>
                    <span id="product-count">{productCount}</span>
                    <span> sản phẩm</span>
                    <span>)</span>
                </div>
                {loading && <p>Đang tải sản phẩm...</p>}
                {error && (
                    <div>
                        <p style={{ color: 'red' }}>Có lỗi xảy ra khi lấy dữ liệu: {error}</p>
                        <button onClick={() => window.location.reload()}>Thử lại</button>
                    </div>
                )}

                <div className='product-buy-1-content-product' id="results">
                    {results.length > 0 ? (
                        results.map((product) => (
                            <ProductItem
                                key={product.id}
                                imageUrl={product.imageUrl} // Đảm bảo thuộc tính này tồn tại
                                name={product.name}
                                price={product.price}
                                date={product.date}
                                onClick={() => handleProductClick(product.id)} // Thêm sự kiện click
                            />
                        ))
                    ) : (
                        !loading && <p>Không tìm thấy sản phẩm nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;
