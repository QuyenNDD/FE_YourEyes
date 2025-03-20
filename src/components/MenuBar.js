const MenuBar = () => {
    return (

        <nav>
            <li className="Admin-return"><a href="/Home"><i class="fa-solid fa-house" style={{ color: "#ffffff" }}></i></a></li>
            <ul className='navigation'>
                <li><a className='active' href="">HOME</a></li>
                <li><a href="/CartList">QUẢN LÝ KHO</a></li>
                <li><a href="/UserList">QUẢN LÝ TÀI KHOẢN</a></li>
                <li><a href="/StockImport">NHẬP HÀNG</a></li>
                <li><a href="">DOANH THU</a></li>
                <li><a href="/DiscountList">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
                <li><a href="/OrderStatus">QUẢN LÝ ĐƠN HÀNG</a></li>
            </ul>
        </nav>

    );
};
export default MenuBar;