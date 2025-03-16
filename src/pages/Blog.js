import React from "react";
const Blog = () => {
    return (
        <section className="Blog">
            <div className="menubar">
                <div className="containerr">
                    <ul>
                        <li><a href="/Home">Trang chủ</a></li>
                        <li>Blog</li>
                    </ul>
                </div>
            </div>
            <div className="containerr">
                <div className="Introduction">
                    <div className="Introduction_text">
                        <div className="Introduction_text_title">
                            <h1>Tại Sao Mắt Kính Lại Quan Trọng Trong Cuộc Sống Hiện Đại?</h1>
                            <br /> <p>Trong nhịp sống hiện đại, mắt kính đã trở thành một phần không thể thiếu đối với nhiều người.
                                Từ những đôi mắt kính có độ cận, viễn, loạn đến mắt kính thời trang, tất cả đều góp phần bảo vệ và tăng cường chất lượng cuộc sống.</p>
                            <br /> <h2>1. Bảo Vệ Sức Khỏe Đôi Mắt</h2>
                            <br /> <p>Mắt là một trong những giác quan quan trọng nhất,
                                nhưng lại rất nhạy cảm và dễ bị tác động bởi các yếu tố bên ngoài như tia UV, bụi bẩn,
                                hay ánh sáng xanh từ màn hình. Mắt kính chính là lớp lá chắn hiệu quả,
                                giúp giảm nguy cơ gây hại cho đôi mắt của bạn.</p>
                            <section id="features">
                                <ul>
                                    <li><span style={{fontWeight:"bold"}}>Mắt kính chống tia UV:</span> Giúp bảo vệ từ các tác nhân gây hại như đục thệ tinh thể hay thoái hóa hoàng điểm.</li>
                                    <li><span style={{fontWeight:"bold"}}>Mắt kính chống ánh sáng xanh:</span> Giảm mệt mỏi mắt khi làm việc với màn hình máy tính hoặc điện thoại trong thời gian dài.</li>
                                </ul>
                            </section>
                            <br /> <h2>2. Cải Thiện Tầm Nhìn</h2>
                            <br /> <p>Những người có vấn đề về tầm nhìn như cận thị, viễn thị hoặc loạn thị sẽ không thể sinh hoạt bình thường nếu không có mắt kính.
                                Nhờ có đôi mắt kính phù hợp, họ có thể nhìn rõ và tận hưởng cuộc sống đầy màu sắc.</p>
                            <section id="features">
                                <ul>
                                    <li><span style={{fontWeight:"bold"}}>Mắt kính đềm:</span> Giúp điều chỉnh độ khúc xạ.</li>
                                    <li><span style={{fontWeight:"bold"}}>Mắt kính hai tròng:</span> Phù hợp cho người có vấn đề cả cận và viễn.</li>
                                    <li><span style={{fontWeight:"bold"}}>Mắt kính thông minh:</span> Tích hợp công nghệ thời thượng như chức năng hiển thị thông tin hoặc bảo vệ mắt tự động.</li>
                                </ul>
                            </section>
                            <br /><h2>3. Thể Hiện Phong Cách Và Cá Tính</h2>
                            <br /> <p>Ngoài vai trò bảo vệ đôi mắt, mắt kính còn là phụ kiện thời trang quản bá vị trí cá nhân.
                                Tại các sàn diễn thời trang hay trong cuộc sống thường ngày, mắt kính đã trở thành tuyệt tác góp phần tô điểm phong cách.</p>
                            <section id="features">
                                <ul>
                                    <li><span style={{fontWeight:"bold"}}>Thiết kế độc đáo:</span> Tạo điểm nhấn cho gương mặt.</li>
                                    <li><span style={{fontWeight:"bold"}}>Đa dạng chất liệu:</span> Từ kim loại, nhựa đến gỗ, mỗi chất liệu đều mang đến các đặc trưng riêng.</li>
                                    <li><span style={{fontWeight:"bold"}}>Phù hợp với xu hướng:</span> Mắt kính thời trang thay đổi linh hoạt với xu hướng mỗi mùa.</li>
                                </ul>
                            </section>
                            <br /><h2>4. Vai Trò Của Mắt Kính Trong Tấm Nhìn Lâu Dài</h2>
                            <br /><p>Trong tương lai, mắt kính sẽ tiếp tục đống vai trò quán trọng trong cuộc sống.
                                Sự kết hợp giữa công nghệ và thời trang sẽ mang đến những sản phẩm đột phá như mắt kính thông minh, có khả năng tương tác thông tin hay theo dõi sức khỏe.</p>
                            <br /><h6>Mắt kính không chỉ là vật dụng hữu ích mà còn là cách thể hiện cá nhân.
                                Hãy chọn cho mình đôi mắt kính phù hợp để vừa bảo vệ sức khỏe, vừa tự tin khẳng định phong cách riêng của bạn!</h6>
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
                            <img src="Blog_img.avif" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
export default Blog;