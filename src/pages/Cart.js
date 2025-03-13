
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductItemCart from '../components/ProductItemCart';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await axios.get("http://localhost:8080/api/cart", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const items = response.data.cart;
                setCartItems(items);
                calculateTotalPrice(items);
            } catch (err) {
                setError("Không thể tải giỏ hàng. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        setTotalPrice(total);
    };
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    const handleRemoveItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/remove/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Cập nhật danh sách giỏ hàng sau khi xóa
            const updatedItems = cartItems.filter((item) => item.product.id !== productId);
            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
        } catch (err) {
            alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
        }
    };
    return (
        <section className="Cart-pages">
            <div className="containerr">
                <div className="cart-header">
                    <h4 style={{ fontWeight: 'bold' }}>Giỏ hàng của bạn</h4>
                    <a href="/Sanpham">Tiếp tục mua sắm</a>
                </div>

                <div className="cart-product">
                    <div className="product-buy-1-content-product">
                        {loading ? (
                            <p>Đang tải dữ liệu...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : cartItems.length === 0 ? (
                            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                        ) : (
                            cartItems.map((item) => (
                                <ProductItemCart
                                    key={item.id}
                                    imageUrl={item.product.imageUrl}
                                    name={item.product.name}
                                    price={item.product.price}
                                    date={item.product.date}
                                    quantity={item.quantity}
                                    onClick={() => handleProductClick(item.id)}
                                    onRemove={() => handleRemoveItem(item.product.id)}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="cart-infor">
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Thông tin đơn hàng</p>
                    <p style={{ fontWeight: 'bold' }}>
                        <span>Tổng tiền: </span>
                        <span>{totalPrice.toLocaleString()}</span>
                        <span><sup>đ</sup></span>
                    </p>
                    <div className="mt-10">
                        <button className="btn btn-primary">Thanh toán</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
