import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  console.log(orderHistory);
  console.log(selectedOrderDetails)


  const togglePriceDetails = () => {
    setShowPriceDetails(!showPriceDetails);
  };


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

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="error">{error}</div>;

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
            <p>Bạn chưa có đơn hàng nào.</p>
          )}
        </div>
      </div>

      {/* Modal */}
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
              <strong>Tổng tiền thanh toán:</strong> {selectedOrderDetails?.finalPrice?.toLocaleString()} VNĐ
              <button
                className="toggle-details-button"
                onClick={togglePriceDetails}
                style={{
                  marginLeft: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPriceDetails ? "▲" : "▼"}
              </button>
            </p>
            {showPriceDetails && (
              <>
                <p>
                  <strong>Tổng tiền:</strong> {selectedOrderDetails?.totalPrice?.toLocaleString()} VNĐ
                </p>
                <p>
                  <strong>Ưu đãi sau khi áp mã:</strong>{" "}
                  {selectedOrderDetails?.totalPrice - selectedOrderDetails?.finalPrice === 0
                    ? "Chưa áp dụng"
                    : `- ${(selectedOrderDetails?.totalPrice - selectedOrderDetails?.finalPrice).toLocaleString()} VNĐ`}
                </p>
              </>
            )}

            <h4>Sản phẩm trong đơn hàng:</h4>
            <ul>
              {selectedOrderDetails.products.map((product) => (
                <li key={product.productId}>
                  <p>
                    <strong>Tên sản phẩm:</strong> {product.productName}
                  </p>
                  <img src={product.imageUrl} alt="" style={{width:"60px"}}/>
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
