import React from 'react';

const ProductSale = ({ image, title, price, oldPrice, discount, date }) => {
  return (
    <div className="slider-product-1-content-item">
      <img src={image} alt={title} />
      <div className="slider-product-1-content-items-text">
        <li><p>{date}</p></li>
        <li>{title}</li>
        <li>{price} <sup>đ</sup></li>
        <li>{oldPrice} <sup>đ</sup></li>
      </div>
    </div>
  );
};
export default ProductSale;
