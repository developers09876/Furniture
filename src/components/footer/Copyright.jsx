import { styled } from "styled-components";
import Logo1 from "../../assets/Restopedic-logo.png";

const Copieright = () => {
  const StyledCopieright = styled.section`
    border-top: 1px solid #ddd;
  `;

  return (
    <StyledCopieright className="text-center p-3">
      <a className="text-reset fw-bold text-decoration-none ms-1">
        © &nbsp;{new Date().getFullYear()} &nbsp;NAPCY All Rights Reserved
        &nbsp;|
      </a>
      <a style={{ justifyContent: "center" }}>
        &nbsp;{" "}
        <img
          className="mb-2"
          src={Logo1}
          alt="Restropedic"
          style={{ fontSize: "26px", width: "150px" }}
        />
        registered trademarks owner by Restopedic Mattresses co.
      </a>
    </StyledCopieright>
  );
};

export default Copieright;
