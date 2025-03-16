import React from 'react';

const ProductItemCart = ({ imageUrl, name, price, onClick, onRemove, quantity }) => {
    const formatPrice = (price) => {
        if (typeof price !== 'number') return '';
        return price.toLocaleString('vi-VN');
    };
    return (
        <div className="product-buy-1-content-product-item">
            <div onClick={onClick}>
                <img src={imageUrl} alt="#" />
                <div className="product-cart-1-content-product-item-text">
                    <li>{name}</li>
                    <li>Số lượng: {quantity}</li>
                    <li>Giá: {formatPrice(price)} VND</li>
                </div>
            </div>
            <div className="remove-product">
                <button
                    className="btn btn-primary" onClick={onRemove}>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};
export default ProductItemCart;
