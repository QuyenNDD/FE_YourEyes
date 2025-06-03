import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Bạn chưa đăng nhập!");

        const response = await axios.get("http://localhost:8080/api/order/history", {
          headers: { Authorization: `Bearer ${token}` },
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
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/order/history/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedOrderDetails(response.data);
      setIsModalOpen(true); // Mở modal
    } catch (err) {
      setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails(null);
  };

  const filterOrders = () =>
    selectedStatus === "ALL"
      ? orderHistory
      : orderHistory.filter((order) => order.status === selectedStatus);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="OrderHistory-pages">
      <div className="containerr">
        {/* Thanh danh mục trạng thái */}
        <div>
          <h2 style={{ fontWeight: "bold" }}>Lịch sử mua hàng</h2>
        </div>

        <div className="status-bar">
          {["ALL", "PENDING", "PROCESSING", "DELIVERED", "CANCELLED"].map((status) => (
            <button
              key={status}
              className={`status-button ${selectedStatus === status ? "active" : ""}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status === "ALL" ? "Tất cả" : status}
            </button>
          ))}
        </div>

        {/* Danh sách đơn hàng */}
        <div className="order-history-list">
          {filterOrders().length > 0 ? (
            <ul>
              {filterOrders().map((order) => (
                <li key={order.orderId} className="order-item">
                  <div className="order-info">
                    <p>
                      <strong>Mã đơn hàng:</strong> {order.orderId}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Tổng tiền thanh toán:</strong> {order.finalPrice.toLocaleString()} VNĐ
                    </p>
                    <button
                      className="btn btn-dark"
                      onClick={() => fetchOrderDetails(order.orderId)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có đơn hàng nào ở trạng thái này.</p>
          )}
        </div>
      </div>

      {/* Modal chi tiết đơn hàng */}
      {isModalOpen && selectedOrderDetails && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Ngăn việc đóng modal khi click vào nội dung
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h3>Chi tiết đơn hàng</h3>
            <p>
              <strong>Mã đơn hàng:</strong> {selectedOrderDetails.orderId}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrderDetails.status}
            </p>
            <p>
              <strong>Tổng tiền thanh toán:</strong> {selectedOrderDetails.finalPrice.toLocaleString()} VNĐ
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
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
