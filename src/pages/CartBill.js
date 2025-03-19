import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartBill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialTotalPrice = location.state?.totalprice || 0; // Nhận tổng số tiền từ state
    const [discountCodes, setDiscountCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [finalTotal, setFinalTotal] = useState(initialTotalPrice);
    const [placingOrder, setPlacingOrder] = useState(false); // Trạng thái xử lý đặt hàng

    useEffect(() => {
        const fetchDiscountCodes = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/discount/available");
                if (!response.ok) {
                    throw new Error("Lỗi khi gọi API mã giảm giá");
                }
                const data = await response.json();
                setDiscountCodes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountCodes();
    }, []);

    const handleSelectChange = (e) => {
        const selectedCode = e.target.value;
        setSelectedDiscount(selectedCode);

        const discount = discountCodes.find((d) => d.code === selectedCode);
        if (discount) {
            setDiscountPercentage(discount.discountPercentage);
            const discountAmount = (initialTotalPrice * discount.discountPercentage) / 100;
            setFinalTotal(initialTotalPrice - discountAmount);
        } else {
            setDiscountPercentage(0);
            setFinalTotal(initialTotalPrice);
        }
    };

    const handlePlaceOrder = async () => {
        setPlacingOrder(true); // Bắt đầu xử lý
        try {
            const response = await fetch("http://localhost:8080/api/order/place", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ discountCode: selectedDiscount }),
            });

            if (!response.ok) {
                throw new Error("Lỗi khi đặt hàng. Vui lòng thử lại.");
            }

            const data = await response.json();
            alert("Đơn hàng đã được đặt thành công!");
            navigate("/SanPham", { state: { order: data } }); // Điều hướng đến trang xác nhận
        } catch (err) {
            alert(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
        } finally {
            setPlacingOrder(false); // Kết thúc xử lý
        }
    };

    if (loading) {
        return <p>Đang tải danh sách mã giảm giá...</p>;
    }

    if (error) {
        return <p>Có lỗi xảy ra: {error}</p>;
    }

    return (
        <div className="containerrr">
            <div className="Bill-container">
                <div className="Billheader">
                    <h1>ĐƠN HÀNG</h1>
                </div>
                <div className="Bill-Content">
                    <h2>Chọn mã giảm giá:</h2>
                    {discountCodes.length > 0 ? (
                        <select
                            value={selectedDiscount}
                            onChange={handleSelectChange}
                            className="border p-2 rounded"
                        >
                            <option value="">-- Chọn mã giảm giá --</option>
                            {discountCodes.map((discount) => (
                                <option key={discount.code} value={discount.code}>
                                    {discount.code} - {discount.description} ({discount.discountPercentage}%)
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>Không có mã giảm giá hiện tại</p>
                    )}
                    {selectedDiscount && (
                        <p className="mt-4">
                            Mã giảm giá đã chọn: <strong>{selectedDiscount}</strong>
                            <br />
                            Giảm giá: {discountPercentage}%
                        </p>
                    )}
                    <p style={{ fontWeight: "bold" }}>Tổng tiền ban đầu: {initialTotalPrice.toLocaleString("vi-VN")} VND</p>
                    <p style={{ fontWeight: "bold" }}>
                        Tổng tiền sau giảm giá: {finalTotal.toLocaleString("vi-VN")} VND
                    </p>
                </div>
                <div className="Bill-Button">
                    <button
                        className="btn btn-dark"
                        onClick={handlePlaceOrder}
                        disabled={placingOrder} // Vô hiệu hóa trong khi xử lý
                    >
                        {placingOrder ? "Đang xử lý..." : "Xác nhận đặt hàng"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartBill;
