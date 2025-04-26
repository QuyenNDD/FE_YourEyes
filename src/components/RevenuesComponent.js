import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRevenuesByYear } from '../redux/slices/revenuesSlice';

const RevenuesComponent = () => {
    const dispatch = useDispatch();
    const { revenues, loading, error } = useSelector((state) => state.revenues);

    const token = localStorage.getItem("token"); // Lấy token từ storage hoặc context

    useEffect(() => {
        dispatch(fetchRevenuesByYear(2025, token)); // Gọi API với năm 2025 và token
    }, [dispatch, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log(revenues);
    const formatPrice = (price) => {
        if (typeof price !== 'number') return '';
        return price.toLocaleString('vi-VN');
    };

    // Lấy doanh thu mới nhất
    const latestRevenue = revenues.length > 0 ? revenues[revenues.length-1] : null;

    return (
        <div>
            {latestRevenue ? (
                <div>
                    {formatPrice(latestRevenue.totalRenenue)} <span>VND</span>
                </div>
            ) : (
                <div>Không có dữ liệu doanh thu.</div>
            )}
        </div>
    );
};

export default RevenuesComponent;
