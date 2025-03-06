import React from 'react';
import ProductSale from './ProductSale';

const ShowProductSale = () => {
    const products = [
        { image: 'image8.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
        { image: 'image8.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
        { image: 'image8.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' },
        { image: 'image8.webp', title: 'Iphone 12 Pro', price: '30.000.000', oldPrice: '15.000.000', date: 'Giá ngay 3/3' }
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
            <section className='slider-product-1'>
                <div className="containerr">
                    <div className='slider-product-1-content'>
                        <div className="slider-product-1-content-title">
                            <h2>Sản phẩm sale mỗi ngày</h2>
                        </div>
                        <div className="slider-product-1-content-items">
                            {products.map((product, index) => (
                                <ProductSale
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

    export default ShowProductSale;
