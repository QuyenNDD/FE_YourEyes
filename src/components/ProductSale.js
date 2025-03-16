import React from 'react';

const ProductSale = ({ imageUrl, name, price, onClick }) => {
  const formatPrice = (price) => {
    if (typeof price !== 'number') return '';
    return price.toLocaleString('vi-VN');
  };
  return (
    <div className="slider-product-1-content-item" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <div className="slider-product-1-content-items-text">
        <li>{name}</li>
        <li>{formatPrice(price)} VND</li>
      </div>
    </div>
  );
};
export default ProductSale;
