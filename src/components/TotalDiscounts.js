import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableDiscounts } from '../redux/slices/discountsSlice';

const TotalDiscounts = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux Store
  const { discounts, loading, error } = useSelector((state) => state.discounts);

  // Gọi API khi component được mount
  useEffect(() => {
    dispatch(fetchAvailableDiscounts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {discounts.length}
    </div>
  );
};

export default TotalDiscounts;
