import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiscountList = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newDiscount, setNewDiscount] = useState({
        code: '',
        description: '',
        discountPercentage: '',
        start_date: '',
        end_date: '',
    });
    const [showForm, setShowForm] = useState(false);

    // Replace this with your actual token retrieval logic
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/discount/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiscounts(response.data);
            } catch (err) {
                setError('Failed to fetch discounts.');
            } finally {
                setLoading(false);
            }
        };

        fetchDiscounts();
    }, [token]);

    const handleAddDiscount = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/discount/add', newDiscount, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            // Đặt lại các trường trong form
            setNewDiscount({
                code: '',
                description: '',
                discountPercentage: '',
                start_date: '',
                end_date: '',
            });
            const response = await axios.get('http://localhost:8080/api/discount/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDiscounts(response.data);

            // Ẩn form sau khi gửi thành công
            setShowForm(false);
        } catch (err) {
            setError('Failed to add discount.');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div>
            <nav>
                <ul className='navigation'>
                    <li><a className='active' href="/Home">HOME</a></li>
                    <li><a href="/CartList">QUẢN LÝ KHO</a></li>
                    <li><a href="/UserList">QUẢN LÝ TÀI KHOẢN</a></li>
                    <li><a href="/DiscountList">NHẬP HÀNG</a></li>
                    <li><a href="">DOANH THU</a></li>
                    <li><a href="">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
                </ul>
            </nav>
            <article>
                <h1 className="text-2xl font-bold mb-4">Danh sách mã giảm giá</h1>
                <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-blue-500 bg-black text-white px-4 py-2 rounded">
                    {showForm ? 'Cancel' : 'Add Discount'}
                </button>
                {showForm && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">Add New Discount</h2>
                        <input
                            type="text"
                            placeholder="Code"
                            value={newDiscount.code}
                            onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                            className="border p-2 mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newDiscount.description}
                            onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
                            className="border p-2 mr-2"
                        />
                        <input
                            type="number"
                            placeholder="Discount Percentage"
                            value={newDiscount.discountPercentage}
                            onChange={(e) => setNewDiscount({ ...newDiscount, discountPercentage: e.target.value })}
                            className="border p-2 mr-2"
                        />
                        <input
                            type="date"
                            value={newDiscount.start_date}
                            onChange={(e) => setNewDiscount({ ...newDiscount, start_date: e.target.value })}
                            className="border p-2 mr-2"
                        />
                        <input
                            type="date"
                            value={newDiscount.end_date}
                            onChange={(e) => setNewDiscount({ ...newDiscount, end_date: e.target.value })}
                            className="border p-2 mr-2"
                        />
                        <button onClick={handleAddDiscount} className="bg-green-500 bg-black text-white px-4 py-2 rounded">
                            Add
                        </button>
                    </div>
                )}
                <div className="tablee">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>Code</th>
                                <th>Description</th>
                                <th>Discount Percentage</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount) => (
                                <tr key={discount.id}>
                                    <td>{discount.code}</td>
                                    <td>{discount.description}</td>
                                    <td>{discount.discountPercentage}%</td>
                                    <td>{new Date(discount.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(discount.endDate).toLocaleDateString()}</td>
                                    <td>{new Date(discount.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    );
};

export default DiscountList;
