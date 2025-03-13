const About = () => {
    return (
        <section className="Gioitheu">
            <div className="menubar">
                <div className="containerr">
                    <ul>
                        <li><a href="/Home">Trang chủ</a></li>
                        <li>Giới thiệu</li>
                    </ul>
                </div>
            </div>
            <div className="containerr">
                <div className="Introduction">
                    <div className="Introduction_text">
                        <div className="Introduction_text_title">
                            <h2>Giới thiệu</h2>
                            <p>Chào mừng đến với "Ánh Nhìn Hoàn Hảo" - Nơi bạn tìm thấy chiếc kính hoàn hảo! <br /> <br />

                                <h4>Chúng tôi là ai?</h4> <br />

                                "Ánh Nhìn Hoàn Hảo" ra đời từ niềm đam mê mang đến cho mọi người những chiếc kính không chỉ đẹp về thẩm mỹ mà còn tốt cho sức khỏe đôi mắt.
                                Chúng tôi hiểu rằng, một chiếc kính phù hợp không chỉ giúp bạn nhìn rõ hơn mà còn thể hiện phong cách và cá tính riêng.
                                Hành trình của chúng tôi bắt đầu từ việc tìm kiếm những thương hiệu mắt kính uy tín, chất lượng, và những thiết kế độc đáo, thời trang nhất.
                                <br /> <h4>Chúng tôi cam kết?</h4>
                                <br /> Ánh Nhìn Hoàn Hảo" cam kết mang đến cho khách hàng những sản phẩm mắt kính chính hãng, chất lượng cao, với đa dạng mẫu mã và kiểu dáng.
                                Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu, với dịch vụ tư vấn chuyên nghiệp, đo mắt miễn phí, và chính sách bảo hành, đổi trả linh hoạt.
                                Chúng tôi mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời và giúp khách hàng tìm được chiếc kính hoàn hảo nhất.
                                <section id="features">
                                    <h4>Tính Năng Nổi Bật</h4>
                                    <ul>
                                        <li>Chống tia UV 100%</li>
                                        <li>Trọng lượng nhẹ, thoải mái khi đeo</li>
                                        <li>Thiết kế thời trang, phù hợp với mọi lứa tuổi</li>
                                        <li>Kính chống mờ và chống trầy xước</li>
                                        <li>Có nhiều màu sắc và kiểu dáng khác nhau</li>
                                    </ul>
                                </section>
                            </p>
                        </div>
                    </div>
                    <div className="Introduction_page">
                        <div className="Introduction_page_title">
                            <div className="Introduction_page_tile_content">
                                <ul>
                                    <li>Danh mục pages</li>
                                    <li><a href="/Home">Trang chủ</a></li>
                                    <li><a href="/Sanpham">Sản phẩm</a></li>
                                    <li><a href="Blog">Blog</a></li>
                                    <li><a href="/About">Giới thiệu</a></li>
                                    <li><a href="/Contact">Liên hệ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="Introduction_page_image">
                            <img src="page_banner.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default About;