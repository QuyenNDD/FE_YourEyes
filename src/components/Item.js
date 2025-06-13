import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const productId = id;
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const quantityInputRef = useRef(null);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");// trạng thái lưu comment
    const [reviews, setReviews] = useState([]); // Thêm trạng thái lưu nhận xét

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const formatPrice = (price) => {
        if (typeof price !== 'number') return '';
        return price.toLocaleString('vi-VN');
    };
    useEffect(() => {
        if (quantityInputRef.current) {
            quantityInputRef.current.value = quantity;
        }
        localStorage.setItem(`quantity_${id}`, quantity);
        fetchReviews();
        fetchProduct();
    }, [quantity, id]);



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
            setTotalPrice(parseInt(data.price * quantity));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (event) => {
        let value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    //Tải danh sách nhân xét
    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/reviews/product/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data); // Cập nhật nhận xét vào state
        } catch (err) {
            console.error(err);
        }
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

    console.log("Product:", product);
    console.log("Quantity:", quantity);
    console.log("Updated Total Price:", product?.price * quantity);

    const handlePlace = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert("Bạn cần đăng nhập để thực hiện đặt hàng!");
            return;
        }
    
        try {
            // 1. Thêm sản phẩm vào giỏ hàng
            const addToCartRes = await fetch('http://localhost:8080/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity,
                }),
            });
    
            if (!addToCartRes.ok) {
                const errorData = await addToCartRes.json();
                throw new Error(errorData.message || "Không thể thêm sản phẩm vào giỏ hàng.");
            }
    
            // 2. Lấy toàn bộ giỏ hàng để lấy cartItem theo product ID
            const cartRes = await fetch('http://localhost:8080/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const cartData = await cartRes.json();
    
            const selectedItem = cartData.cart.find(item => item.product.id.toString() === id);
    
            if (!selectedItem) {
                throw new Error("Không tìm thấy sản phẩm vừa thêm trong giỏ hàng.");
            }
    
            // 3. Tính tổng tiền
            const total = selectedItem.product.price * selectedItem.quantity;
    
            // 4. Điều hướng đến CartBill
            navigate("/CartBill", {
                state: {
                    cartItems: [selectedItem],
                    totalprice: total,
                },
            });
    
        } catch (err) {
            console.error("Lỗi khi xử lý đặt hàng:", err);
            alert(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (rating < 1 || rating > 5) {
            setError("Rating must be between 1 and 5.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/reviews/add",
                {
                    productId,
                    rating,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setRating(0);
            setComment("");
            fetchReviews();
        } catch (error) {
            setError(
                error.response?.data?.message || "An error occurred. Please try again."
            );
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
                    <div className="Item-pages-Img">
                        <div className="Item-img">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                    </div>
                    <div className="Item-content">
                        <div className="Item-content-text">
                            <h4>{product.name}</h4>
                            <p>{reviews.length} đánh giá</p>
                            <p>Giá: {formatPrice(product.price)} VND</p>
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
                                <button className="btn btn-outline-primary" onClick={handlePlace}>Đặt hàng</button>
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

                <div className="Review-pages">
                    <div className="Review-pages-container">
                        <div className="Review-header">
                            <p style={{ fontSize: "15px" }}>ĐÁNH GIÁ SẢN PHẨM</p>
                        </div>
                        <div className="Review-rating-pages">
                            <div className="Review-rating">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="rating" className="block text-sm font-medium mb-2">
                                            Rating (1-5):
                                        </label>
                                        <input
                                            type="number"
                                            id="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            min="1"
                                            max="5"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="block text-sm font-medium mb-2">
                                            Nhận xét:
                                        </label>
                                        <textarea
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows="3"
                                            style={{ width: "920px" }}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-500 "
                                    >
                                        Gửi
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="Review-content-pages">
                            {/* dùng để show tất cả nhận xét */}
                            <div className="Review-content">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review.id} className="review-item">
                                            <p><strong>{review.userFullName}</strong></p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                            <p>Rating : {review.rating}/5</p>
                                            <p>{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Chưa có nhận xét nào cho sản phẩm này.</p>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
