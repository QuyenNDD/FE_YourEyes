import React, { useState, useEffect } from "react";

const CartBill = ({ totalprice }) => {
    const [discountCodes, setDiscountCodes] = useState([]); // Lưu danh sách mã giảm giá
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hàm gọi API lấy danh sách mã giảm giá
        const fetchDiscountCodes = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/discounts/getAll"); // Thay URL bằng API của bạn
                if (!response.ok) {
                    throw new Error("Lỗi khi gọi API mã giảm giá");
                }
                const data = await response.json();
                setDiscountCodes(data); // Giả sử API trả về danh sách mã giảm giá
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountCodes();
    }, []);

    if (loading) {
        return <p>Đang tải danh sách mã giảm giá...</p>;
    }

    if (error) {
        return <p>Có lỗi xảy ra: {error}</p>;
    }

    return (
        <div className="containerrr">
            <div className="Billheader">
                <h1>ĐƠN HÀNG</h1>
            </div>
            <div className="Bill-Content">
                <p>Tổng tiền: {totalprice.toLocaleString("vi-VN")} VND</p>
                <h2>Danh sách mã giảm giá:</h2>
                {discountCodes.length > 0 ? (
                    <ul>
                        {discountCodes.map((discount) => (
                            <li key={discount.id}>
                                <strong>{discount.code}</strong>: {discount.description} (Hết hạn: {discount.expiryDate})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có mã giảm giá hiện tại</p>
                )}
            </div>
            <div className="Bill-Button">
                <button className="btn btn-dark">Đặt hàng</button>
            </div>
        </div>
    );
};

export default CartBill;
