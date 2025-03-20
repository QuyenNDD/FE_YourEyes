import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';

const DiscountList = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newDiscount, setNewDiscount] = useState({
        code: '',
        description: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
    });
    const [showForm, setShowForm] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/discount/available', {
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
            const discountPayload = {
                code: newDiscount.code,
                description: newDiscount.description,
                discountPercentage: parseFloat(newDiscount.discountPercentage),
                startDate: new Date(newDiscount.startDate).toISOString().split("T")[0], // Format as yyyy-mm-dd
                endDate: new Date(newDiscount.endDate).toISOString().split("T")[0], // Format as yyyy-mm-dd
            };
    
            await axios.post(
                'http://localhost:8080/api/discount/add',
                discountPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            setNewDiscount({
                code: '',
                description: '',
                discountPercentage: '',
                startDate: '',
                endDate: '',
            });
    
            const response = await axios.get('http://localhost:8080/api/discount/available', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDiscounts(response.data);
    
            setShowForm(false);
        } catch (err) {
            setError('Failed to add discount.');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div>
            <MenuBar />
            <article>
                <h1 className="text-2xl font-bold mb-4">Danh sách mã giảm giá</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {showForm ? 'Cancel' : 'Add Discount'}
                </button>
                {showForm && (
                    <form onSubmit={handleAddDiscount} className="mb-4">
                        <h2 className="text-lg font-bold">Add New Discount</h2>
                        <input
                            type="text"
                            placeholder="Code"
                            value={newDiscount.code}
                            onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                            className="border p-2 mr-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newDiscount.description}
                            onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
                            className="border p-2 mr-2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Discount Percentage"
                            value={newDiscount.discountPercentage}
                            onChange={(e) => setNewDiscount({ ...newDiscount, discountPercentage: e.target.value })}
                            className="border p-2 mr-2"
                            required
                        />
                        <input
                            type="date"
                            value={newDiscount.startDate}
                            onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
                            className="border p-2 mr-2"
                            required
                        />
                        <input
                            type="date"
                            value={newDiscount.endDate}
                            onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
                            className="border p-2 mr-2"
                            required
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            Add
                        </button>
                    </form>
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
