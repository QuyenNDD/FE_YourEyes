import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import axios from "axios";

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    useEffect(() => {
        fetchOrders();
    }, []); // Chỉ gọi một lần khi component được render

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/order/all", {
                headers: {
                    Authorization: `Bearer ${token}`, // Gửi token trong header
                },
            });
            setOrders(response.data); // Gán dữ liệu đơn hàng từ API
            setLoading(false); // Tắt trạng thái loading
        } catch (err) {
            console.error("Lỗi khi lấy danh sách order:", err);
            setError(err); // Gán lỗi để hiển thị
            setLoading(false); // Tắt trạng thái loading
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/order/${orderId}/status`,
                null,
                {
                    params: { newStatus },
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header
                    },
                }
            );
            // Cập nhật danh sách đơn hàng sau khi thay đổi
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            alert("Cập nhật trạng thái thành công!");
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", err);
            alert("Cập nhật trạng thái thất bại.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <MenuBar />
            <article>
                <h2>DANH SÁCH ĐƠN HÀNG</h2>
                {orders.length === 0 ? (
                    <p>Không có đơn hàng nào.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Khách hàng</th>
                                <th>Email</th>
                                <th>SDT</th>
                                <th>Địa chỉ</th>
                                <th>Trạng thái</th>
                                <th>Tổng tiền</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user.fullname}</td>
                                    <td>{order.user.email}</td>
                                    <td>{order.user.phone}</td>
                                    <td>{order.user.address}</td>
                                    <td>{order.status}</td>
                                    <td>{order.finalPrice.toLocaleString()} VND</td>
                                    <td>
                                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td>
                                        {/* Nút để cập nhật trạng thái */}
                                        <button
                                            onClick={() => updateOrderStatus(order.id, "PENDING")}
                                        >
                                            Dang đặt hàng
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(order.id, "PROCESSING")}
                                        >
                                            Đang xử lý
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                                        >
                                            Giao hàng
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                                        >
                                            Đã Giao
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(order.id, "CANCELED")}
                                        >
                                            Hủy
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </article>
        </div>
    );
};

export default OrderStatus;
