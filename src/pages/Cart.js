import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import ProductItemCart from '../components/ProductItemCart';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState({ loading: true, error: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setStatus({ loading: false, error: "Vui lòng đăng nhập để xem giỏ hàng!" });
                return;
            }

            try {
                setStatus({ loading: true, error: "" });
                const { data } = await axios.get("http://localhost:8080/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(data.cart);
                setTotalPrice(data.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
            } catch {
                setStatus({ loading: false, error: "Không thể tải giỏ hàng. Vui lòng thử lại." });
            } finally {
                setStatus((prev) => ({ ...prev, loading: false }));
            }
        };

        fetchCartItems();
    }, []);
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    const handleRemoveItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            localStorage.removeItem(`quantity_${productId}`);
            const updatedItems = cartItems.filter((item) => item.product.id !== productId);
            setCartItems(updatedItems);
            setTotalPrice(updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
        } catch {
            alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
        }
    };

    if (status.loading) return <p>Đang tải dữ liệu...</p>;
    if (status.error) return <p className="text-red-500">{status.error}</p>;

    return (
        <section className="Cart-pages">
            <div className="containerr">
                <div className="cart-header">
                    <h4 style={{ fontWeight: 'bold' }}>Giỏ hàng của bạn</h4>
                    <a href="/Sanpham">Tiếp tục mua sắm</a>
                </div>

                <div className="cart-product">
                    <div className="product-buy-1-content-product">
                        {cartItems.length === 0 ? (
                            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                        ) : (
                            cartItems.map((item) => (
                                <ProductItemCart
                                    key={item.id}
                                    imageUrl={item.product.imageUrl}
                                    name={item.product.name}
                                    price={item.product.price}
                                    quantity={item.quantity}
                                    onClick={() => handleProductClick(item.product.id)}
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
                        <span>{totalPrice.toLocaleString()}<sup>đ</sup></span>
                    </p>
                    <button className="btn btn-dark ">Đặt hàng</button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
