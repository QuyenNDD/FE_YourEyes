import React from 'react';
import ProductItem from './Product';

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

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('/api/products/getAll'); // Thay đổi URL này thành API thực tế của bạn
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) {
  //   return <p>Đang tải sản phẩm...</p>;
  // }

  // if (error) {
  //   return <p>Có lỗi xảy ra khi lấy dữ liệu: {error.message}</p>;
  // }
  return (
    <section className='product-buy-1'>
      <div className="containerr">
        <div className="product-buy-1-content">
          <div className="product-buy-1-content-title">
            <h2>SẢN PHẨM NỔI BẬT NHẤT</h2>
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
