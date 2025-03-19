import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', category: '', image_url: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 10; // Number of items per page
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts(page);
        fetchCategories();
    }, [page]);

    const fetchProducts = async (currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/products/getAll?page=${currentPage}&size=${pageSize}`);
            if (response.data.content) {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data);
        } catch (err) {
            console.error('Lỗi khi lấy danh mục:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            imageUrl: formData.image_url,
        };

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            if (isEditing) {
                await axios.put(`http://localhost:8080/api/products/update/${formData.id}`, payload, config);
            } else {
                await axios.post('http://localhost:8080/api/products/add', payload, config);
            }

            fetchProducts(page);
            resetForm();
        } catch (err) {
            setError(err);
        }
    };

    const handleEdit = (product) => {
        setFormData({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image_url: product.imageUrl,
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:8080/api/products/delete/${id}`, config);
            fetchProducts(page);
        } catch (err) {
            setError(err);
        }
    };

    const resetForm = () => {
        setFormData({ id: '', name: '', description: '', price: '', category: '', image_url: '' });
        setIsEditing(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <nav>
                <ul className='navigation'>
                    <li><a className='active' href='/Admin'>HOME</a></li>
                    <li><a href="/CartList">QUẢN LÝ KHO</a></li>
                    <li><a href="/UserList">QUẢN LÝ TÀI KHOẢN</a></li>
                    <li><a href="/StockImport">NHẬP HÀNG</a></li>
                    <li><a href="">DOANH THU</a></li>
                    <li><a href="/DiscountList">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
                </ul>
            </nav>
            <article>
                <h1>Danh sách sản phẩm</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={formData.id} />
                    <input type="text" name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="description" placeholder="Mô tả" value={formData.description} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Giá" value={formData.price} onChange={handleChange} required />
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <input type="text" name="image_url" placeholder="URL hình ảnh" value={formData.image_url} onChange={handleChange} required />
                    <button type="submit" className="login__button">{isEditing ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
                    <button type="button" className="login__button" onClick={resetForm}>Hủy</button>
                </form>
                <div className="tablee">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Danh mục</th>
                                <th>Số lượng</th>
                                <th>URL hình ảnh</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryId?.name}</td>
                                    <td>{product.stock}</td>
                                    <td><img src={product.imageUrl} alt={product.name} width="50" /></td>
                                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(product)}>Sửa</button>
                                        <button onClick={() => handleDelete(product.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button onClick={() => handlePageChange(0)} disabled={page === 0}>«</button>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>‹</button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i)} className={page === i ? 'active' : ''}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>›</button>
                    <button onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1}>»</button>
                </div>
            </article>
        </div>
    );
}

export default CartList;
