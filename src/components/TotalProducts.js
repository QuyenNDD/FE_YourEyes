import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalProducts } from '../redux/slices/productsSlice';

const TotalProducts = () => {
  const dispatch = useDispatch();
  const totalProducts = useSelector((state) => state.products.totalProducts);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTotalProducts());
    }
  }, [status, dispatch]);

  return (
    <div>
        {totalProducts}
    </div>
  );
};

export default TotalProducts;
