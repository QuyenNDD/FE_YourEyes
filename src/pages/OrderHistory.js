import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
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

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/order/history/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedOrderDetails(response.data);
    } catch (err) {
      setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

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
                <li key={order.orderId} className="order-item">
                  <div className="order-info">
                    <p>
                      <strong>Mã đơn hàng:</strong> {order.orderId}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong> {order.finalPrice.toLocaleString()} VNĐ
                    </p>
                    <button class="btn btn-dark" onClick={() => fetchOrderDetails(order.orderId)}>Xem chi tiết</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Bạn chưa có đơn hàng nào.</p>
          )}
        </div>

        <div className="containerr">
          {selectedOrderDetails && (
            <div className="order-details">
              <h3>Chi tiết đơn hàng</h3>
              <p>
                <strong>Mã đơn hàng:</strong> {selectedOrderDetails.orderId}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedOrderDetails.status}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {selectedOrderDetails.finalPrice.toLocaleString()} VNĐ
              </p>
              <h4>Sản phẩm trong đơn hàng:</h4>
              <ul>
                {selectedOrderDetails.products.map((product) => (
                  <li key={product.productId}>
                    <p>
                      <strong>Tên sản phẩm:</strong> {product.productName}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Giá:</strong> {product.price.toLocaleString()} VNĐ
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
