import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', stock: '', category_id: '', image_url: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products/getAll');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (Array.isArray(data.content)) {
                setProducts(data.content);
            } else {
                throw new Error('Dữ liệu không phải là một mảng');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/products/update/${formData.id}`, formData);
            } else {
                await axios.post('http://localhost:8080/api/products/add', formData);
            }
            fetchProducts();
            resetForm();
        } catch (err) {
            setError(err);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/delete/${id}`);
            fetchProducts();
        } catch (err) {
            setError(err);
        }
    };

    const resetForm = () => {
        setFormData({ id: '', name: '', description: '', price: '', stock: '', category_id: '', image_url: '' });
        setIsEditing(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <nav>
                <ul className='navigation'>
                    <li><a className='active'>HOME</a></li>
                    <li><a href="/CartList">QUẢN LÝ KHO</a></li>
                    <li><a href="">QUẢN LÝ TÀI KHOẢN</a></li>
                    <li><a href="">NHẬP HÀNG</a></li>
                    <li><a href="">DOANH THU</a></li>
                    <li><a href="">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
                </ul>
            </nav>
            <article>
                <h1>Danh sách sản phẩm</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={formData.id} />
                    <input type="text" name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="description" placeholder="Mô tả" value={formData.description} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Giá" value={formData.price} onChange={handleChange} required />
                    <input type="number" name="stock" placeholder="Tồn kho" value={formData.stock} onChange={handleChange} required />
                    <input type="text" name="category_id" placeholder="Danh mục ID" value={formData.category_id} onChange={handleChange} required />
                    <input type="text" name="image_url" placeholder="URL hình ảnh" value={formData.image_url} onChange={handleChange} required />
                    <button type="submit">{isEditing ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
                    <button type="button" onClick={resetForm}>Hủy</button>
                </form>
                <div className="tablee">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Tồn kho</th>
                                <th>Danh mục ID</th>
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
                                    <td>{product.stock}</td>
                                    <td>{product.category_id}</td>
                                    <td><img src={product.image_url} alt={product.name} width="50" /></td>
                                    <td>{new Date(product.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(product)}>Sửa</button>
                                        <button onClick={() => handleDelete(product.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    );
}

export default CartList;
