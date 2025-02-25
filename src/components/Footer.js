import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px 0;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 Your Eyes. All Rights Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;