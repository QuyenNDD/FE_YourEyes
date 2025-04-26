import React, { useState, useEffect } from 'react';
import ProductList from '../components/DanhSachSanPham';

const Sanpham = () => {
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const pageSize = 10; // Số sản phẩm tải mỗi lần
    const categories = [
        { id: 1, name: 'Dior' },
        { id: 2, name: 'Chopard' },
        { id: 3, name: 'Cartier' },
    ];

    const fetchProducts = async (pageNumber, category = null, reset = false) => {
        setLoading(true);
        setError(null);

        try {
            const categoryFilter = category ? `&categoryId=${category}` : '';
            const response = await fetch(
                `http://localhost:8080/api/products/getAll?page=${pageNumber}&size=${pageSize}${categoryFilter}`
            );

            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }

            const data = await response.json();

            if (Array.isArray(data.content)) {
                const filteredProducts = category
                    ? data.content.filter((product) => product.categoryId?.id === category)
                    : data.content;

                setProducts((prevProducts) =>
                    reset ? filteredProducts : [...prevProducts, ...filteredProducts]
                );

                setHasMore(!data.last);
                setProductCount(data.totalElements);
            } else {
                throw new Error('Dữ liệu không hợp lệ');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchProducts(0, selectedCategory, true); // Tải dữ liệu lần đầu
    }, [selectedCategory]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setProducts([]); // Reset sản phẩm hiện tại
        setPage(0); // Reset trang
        fetchProducts(0, categoryId, true); // Gọi API với danh mục mới
    };


    const handleShowAllProducts = () => {
        setSelectedCategory(null);
        setProducts([]);
        setPage(0);
    };

    const loadMoreProducts = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage, selectedCategory); // Tải thêm sản phẩm
    };

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
                                className={`btn btn-outline-secondary ${selectedCategory === category.id ? 'active' : ''}`}
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
            <ProductList products={products} />
            {hasMore && (
                <div className="load-more-container">
                    <button
                        className="btn btn-primary load-more-button"
                        onClick={loadMoreProducts}
                        disabled={loading}
                    >
                        {loading ? 'Đang tải...' : 'Tải thêm'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sanpham;