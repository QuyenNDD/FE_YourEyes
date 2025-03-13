import React from 'react';

const ProductSale = ({ imageUrl, name, price, date, onClick }) => {
  return (
    <div className="slider-product-1-content-item" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <div className="slider-product-1-content-items-text">
        <li><p>San Sale 3/3</p></li>
        <li>{name}</li>
        <li>{price} <sup>đ</sup></li>
        {/* <li>{oldPrice} <sup>đ</sup></li> */}
      </div>
    </div>
  );
};
export default ProductSale;
