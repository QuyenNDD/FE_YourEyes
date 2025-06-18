import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import axios from "axios";

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/order/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Có lỗi xảy ra khi tải đơn hàng.");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:8080/api/order/${orderId}/status`,
                null,
                {
                    params: { newStatus },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            alert("Cập nhật trạng thái thành công!");
        } catch (err) {
            alert("Cập nhật trạng thái thất bại: " + (err.response?.data?.message || "Lỗi không xác định."));
        }
    };

    if (loading) return <p>Đang tải danh sách đơn hàng...</p>;
    if (error) return <p className="error">Lỗi: {error}</p>;

    return (
        <div>
            <MenuBar />
            <article>
                <h2 className="text-lg font-bold mb-4">Danh sách đơn hàng</h2>
                {orders.length === 0 ? (
                    <p>Không có đơn hàng nào.</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Khách hàng</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">SDT</th>
                                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                                <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
                                <th className="border border-gray-300 px-4 py-2">Thay đổi trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{order.user.fullname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.user.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.user.address}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.finalPrice.toLocaleString()} VND</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {order.status === "PENDING" && (
                                            <>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                                                >
                                                    Xác nhận
                                                </button>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "CANCELED")}
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        )}
                                        {order.status === "CONFIRMED" && (
                                            <>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "SHIPPING")}
                                                >
                                                    Giao hàng
                                                </button>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "CANCELED")}
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        )}
                                        {order.status === "SHIPPING" && (
                                            <>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                                                >
                                                    Giao hàng hoàn tất
                                                </button>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "RETURNED")}
                                                >
                                                    Hoàn trả
                                                </button>
                                                <button
                                                    className="button-css"
                                                    onClick={() => updateOrderStatus(order.id, "CANCELED")}
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        )}
                                        <>
                                            {order.status === "RETURNED" && (
                                                <span className="status-returned">Hoàn trả</span>
                                            )}
                                            {order.status === "COMPLETED" && (
                                                <span className="status-completed">Đã giao hàng thành công</span>
                                            )}
                                            {order.status === "CANCELED" && (
                                                <span className="status-canceled">Đơn hàng đã hủy</span>
                                            )}
                                        </>
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
