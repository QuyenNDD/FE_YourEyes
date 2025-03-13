import styled from "styled-components";

const FooterContainer = styled.footer`
`;

const Footer = () => {
  return (
    <FooterContainer>
      <section className='footerr'>
        <div className="containerr">
          <div className="ft-logo">
            <h2><a href="">StyleHub</a></h2>
          </div>
          <div className="ft-title">

            Một thương hiệu nỗ lực truyền cảm hứng và thúc đẩy văn hóa sáng tạo phát triển.

          </div>
          <div className="ft-desc">

            Chúng tôi tiếp cận công việc của mình với tâm lý rằng mỗi sản phẩm được tạo ra đều là một trải nghiệm học hỏi để cải thiện kỹ năng của chúng tôi. Chúng tôi là những người thực hành và cung cấp văn hóa sáng tạo và được truyền cảm hứng từ các hình thức khác nhau từ nghệ thuật, thiết kế, thời trang, âm nhạc, phim ảnh, ẩm thực, v.v.

          </div>
          <div className="ft-socical">
            <ul>
              <li><a href=""><i class="fa-solid fa-cloud"></i></a></li>
              <li><a href=""><i class="fa-solid fa-thumbs-up"></i></a></li>
              <li><a href=""><i class="fa-solid fa-comments"></i></a></li>
            </ul>
          </div>
        </div>
      </section>
      <section className='last-slide'>
        <ul>
          <li><a href="">Tìm kiếm</a></li>
          <li><a href="">Giới thiệu</a></li>
          <li><a href="">Chính sách đổi trả</a></li>
          <li><a href="">Chính sách bảo mật</a></li>
          <li><a href="">Điều khoản dịch vụ</a></li>
          <li><a href="">Liên hệ</a></li>
        </ul>
      </section>
    </FooterContainer>
  );
};

export default Footer;