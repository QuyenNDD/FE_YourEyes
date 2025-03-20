import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Bạn chưa đăng nhập!");
        }

        const response = await axios.get("http://localhost:8080/api/order/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrderHistory(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Không thể tải lịch sử mua hàng. Vui lòng thử lại sau!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="OrderHistory-pages">
      <div className="containerr">
        <div className="cart-header">
          <h2 style={{ fontWeight: "bold" }}>Lịch sử mua hàng</h2>
        </div>
        <div className="order-history-list">
          {orderHistory.length > 0 ? (
            <ul>
              {orderHistory.map((order) => (
                <li key={order.id} className="order-item">
                  <div className="order-info">
                    <p>
                      <strong>Mã đơn hàng:</strong> {order.orderId}
                    </p>
                    <p>
                      <strong>Ngày đặt hàng:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong> {order.finalPrice.toLocaleString()} VNĐ
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Bạn chưa có đơn hàng nào.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
