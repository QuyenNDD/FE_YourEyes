import React, { useState, useEffect } from 'react';
import ProductList from '../components/DanhSachSanPham';

const Sanpham = () => {
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const pageSize = 10;
    const categories = [
        { id: 1, name: 'Dior' },
        { id: 2, name: 'Gucci' },
        { id: 3, name: 'Cartier' },
    ];
    const priceRanges = [
        { label: 'Tất cả', min: null, max: null },
        { label: 'Dưới 100k', min: 0, max: 100000 },
        { label: '100k - 500k', min: 100000, max: 500000 },
        { label: 'Trên 500k', min: 500000, max: null },
    ];

    const fetchProducts = async (pageNumber, category = null, priceRange = null, reset = false) => {
        setLoading(true);
        setError(null);

        try {
            const categoryFilter = category ? `&categoryId=${category}` : '';
            const priceFilter =
                priceRange && priceRange.min !== null
                    ? `&minPrice=${priceRange.min}${priceRange.max !== null ? `&maxPrice=${priceRange.max}` : ''}`
                    : '';
            const response = await fetch(
                `http://localhost:8080/api/products/filter?page=${pageNumber}&size=${pageSize}${categoryFilter}${priceFilter}`
            );

            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setProducts((prevProducts) =>
                    reset ? data : [...prevProducts, ...data]
                );
                setHasMore(data.length === pageSize);
                setProductCount(data.length);
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
        fetchProducts(0, selectedCategory, selectedPriceRange ? JSON.parse(selectedPriceRange) : null, true);
    }, [selectedCategory, selectedPriceRange]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(0);
    };

    const handlePriceRangeChange = (event) => {
        setSelectedPriceRange(event.target.value);
        setPage(0);
    };

    const handleShowAllProducts = () => {
        setSelectedCategory(null);
        setSelectedPriceRange('');
        setPage(0);
    };

    const loadMoreProducts = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage, selectedCategory, selectedPriceRange ? JSON.parse(selectedPriceRange) : null);
    };

    if (error) {
        return <p>Có lỗi xảy ra khi lấy dữ liệu: {error.message}</p>;
    }

    return (
        <div className="containerr">
            <div className="Product-cartergory">
                <h2>Tất cả sản phẩm</h2>
                <div className="product-button">
                    <button
                        className={`btn btn-outline-secondary ${selectedCategory === null ? 'active' : ''}`}
                        onClick={handleShowAllProducts}
                    >
                        Hiển Thị Tất Cả
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`btn btn-outline-secondary ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="price-filter">
                    <select
                        value={selectedPriceRange}
                        onChange={handlePriceRangeChange}
                        className="form-select"
                    >
                        {priceRanges.map((range, index) => (
                            <option key={index} value={JSON.stringify(range)}>
                                {range.label}
                            </option>
                        ))}
                    </select>
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
