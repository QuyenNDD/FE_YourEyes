import React from 'react';

const ProductItemCart = ({ imageUrl, name, price, onClick, onRemove, quantity }) => {
    return (
        <div className="product-buy-1-content-product-item">
            <div onClick={onClick}>
                <img src={imageUrl} alt="#" />
                <div className="product-cart-1-content-product-item-text">
                    <li><p>San sale 3/3</p></li>
                    <li>{name}</li>
                    <li>Số lượng: {quantity}</li>
                    <li>{price} <sup>đ</sup></li>
                </div>
            </div>
            <div className="remove-product">
                <button
                    className="btn btn-primary" onClick={onRemove}>
                    Xóa
                </button>
            </div>
        </div>
    );
};
export default ProductItemCart;
