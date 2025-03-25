import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTotalOrders } from '../redux/slices/orderSlice';

const TotalOrders = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    const token = localStorage.getItem("token"); // Lấy token từ storage hoặc context

    useEffect(() => {
        dispatch(fetchTotalOrders(token)); // Gọi API với năm 2025 và token
    }, [dispatch, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            {orders.length}
        </div>
    );
};

export default TotalOrders;
