import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const quantityInputRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
                const storedQuantity = localStorage.getItem(`quantity_${id}`) || 1;
                setQuantity(parseInt(storedQuantity));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (quantityInputRef.current) {
            quantityInputRef.current.value = quantity;
        }
        localStorage.setItem(`quantity_${id}`, quantity);
    }, [quantity, id]);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleQuantityChange = (event) => {
        let value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        try {
            
            const response = await fetch('http://localhost:8080/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Thêm token vào header
                },
                body: JSON.stringify({
                    productId: id, // ID sản phẩm
                    quantity: quantity, // Số lượng sản phẩm
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
    
            const data = await response.json();
            alert(data.message); // Thông báo thành công
        } catch (err) {
            console.log(err);
            alert('Có lỗi xảy ra: ' + err.message);
        }
    };

    if (loading) {
        return <p>Đang tải thông tin sản phẩm...</p>;
    }

    if (error) {
        return <p>Có lỗi xảy ra khi lấy dữ liệu: {error.message}</p>;
    }

    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }


    return (
        <section className="Item">
            <div className="containerr">
                <div className="Item-pages">
                    <div className="Item-img">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="Item-content">
                        <div className="Item-content-text">
                            <h4>{product.name}</h4>
                            <p>{product.price}<sup>đ</sup></p>
                        </div>
                        <div className="Item-content-button-add">
                            <div className="input-group">
                                <button className="btn btn-outline-secondary" type="button" onClick={handleDecrease}>-</button>
                                <input
                                    type="number"
                                    className="form-control text-center"
                                    ref={quantityInputRef}
                                    value={quantity}
                                    min="1"
                                    onChange={handleQuantityChange}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={handleIncrease}>+</button>
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-outline-primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-primary">Mua ngay</button>
                            </div>
                        </div>
                        <div className="Item-content-description">
                            <div className="Item-content-description-header">
                                <p>MÔ TẢ SẢN PHẨM</p>
                            </div>
                            <div className="Item-content-description-title">
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
