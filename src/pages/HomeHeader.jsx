import { Carousel } from "antd";
import { styled } from "styled-components";

import "../CSS-Pages/HomeCard.css";
import { NavLink } from "react-router-dom";
const contentStyle = {
  width: "100%",
  height: "470px",
  color: "#fff",
  lineHeight: "3000px",
  textAlign: "center",
};

const Wrapper = styled.section`
  @media (max-width: 320px) {
    margin-top: 700px;
  }
`;
const HomeHeader = () => (
  <Wrapper className="homeCarousel">
    <Carousel autoplay>
      <div>
        <img
          style={contentStyle}
          src="https://en.talentispa.com/wp-content/uploads/2024/01/5foto-home-Ever-w.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg"
          alt="fur-pic"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://png.pngtree.com/background/20230614/original/pngtree-traditional-outdoor-patio-furniture-set-picture-image_3519919.jpg"
          alt="fur-pic"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://en.talentispa.com/wp-content/uploads/2024/01/5foto-home-Ever-w.jpg"
          alt="fur-pic"
        />
      </div>
    </Carousel>
  </Wrapper>
);
export default HomeHeader;
