import React from 'react';
import ProductItem from '../components/Product';

const ShowProduct = () => {
  const products = [
    { image: 'image6.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image7.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image6.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image7.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image6.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image7.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image6.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image7.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image6.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image7.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image6.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
    { image: 'image7.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' }
  ];
  return (
    <section className='product-buy-1'>
      <div className="containerr">
        <div className="product-buy-1-content">
          <div className="product-buy-1-content-title">
            <h2>SẢN PHẨM NỔI BẬT NHẤT</h2>
            <ul>
              <li><a href="">SAM SUNG</a></li>
              <li><a href="">IPHONE</a></li>
              <li><a href="">OPPO</a></li>
              <li><a href="">Xem tất cả</a></li>
            </ul>
          </div>
          <div className="product-buy-1-content-product">
            {products.map((product, index) => (
              <ProductItem 
                key={index} 
                image={product.image} 
                title={product.title} 
                price={product.price} 
                oldPrice={product.oldPrice} 
                discount={product.discount} 
                date={product.date} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowProduct;
