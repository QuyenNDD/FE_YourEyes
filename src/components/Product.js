import React from 'react';

const ProductItem = ({ imageUrl, name, price, onClick }) => {
  return (
    <div className="product-buy-1-content-product-item" onClick={onClick}>
      <img src={imageUrl} alt="#" />
      <div className="product-buy-1-content-product-item-text">
        <li><p>San sale 3/3</p></li>
        <li>{name}</li>
        <li>{price} <sup>đ</sup></li>
      </div>
    </div>
  );
};
export default ProductItem;
