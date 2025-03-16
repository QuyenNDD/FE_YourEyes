import React from 'react';

const ProductItem = ({ imageUrl, name, price, onClick }) => {
  const formatPrice = (price) => {
    if (typeof price !== 'number') return '';
    return price.toLocaleString('vi-VN');
  };
  return (
    <div className="product-buy-1-content-product-item" onClick={onClick}>
      <img src={imageUrl} alt="#" />
      <div className="product-buy-1-content-product-item-text">
        <li>{name}</li>
        <li>{formatPrice(price)} VND</li>
      </div>
    </div>
  );
};
export default ProductItem;
