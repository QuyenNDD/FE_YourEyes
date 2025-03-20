import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuBar from "../components/MenuBar";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getToken = () => localStorage.getItem("token");

        const fetchUsers = async () => {
            try {
                const token = getToken();
                if (!token) {
                    setError("Người dùng chưa đăng nhập.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:8080/api/user/getAll", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Lọc người dùng có vai trò là USER
                const filteredUsers = response.data.filter(user => user.role === "USER");
                setUsers(filteredUsers);
            } catch (err) {
                const errorMessage = err.response ? err.response.data.message : "Không thể tải danh sách người dùng!";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <MenuBar />
            <article>
                <div className="tablee">
                    <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ và Tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    );
};

export default UserList;
