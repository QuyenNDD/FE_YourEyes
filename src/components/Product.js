import React from 'react';

const ProductItem = ({ image, title, price, oldPrice, discount, date }) => {
  return (
    <div className="product-buy-1-content-product-item">
      <img src={image} alt={title} />
      <div className="product-buy-1-content-product-item-text">
        <li><p>{date}</p></li>
        <li>{title}</li>
        <li>{price} <sup>đ</sup></li>
        <li>{oldPrice} <sup>đ</sup></li>
      </div>
    </div>
  );
};
export default ProductItem;
