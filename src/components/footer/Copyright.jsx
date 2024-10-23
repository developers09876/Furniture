import { styled } from "styled-components";

const Copieright = () => {
  const StyledCopieright = styled.section`
    border-top: 1px solid #ddd;
  `;

  return (
    <StyledCopieright className="text-center p-3">
      <a
        className="text-reset fw-bold text-decoration-none ms-1"
        href="https://github.com/Moslihbadr"
        rel="noreferrer"
        target="_blank"
      >
        © &nbsp;{new Date().getFullYear()} &nbsp;Napzy All Rights Reserved
        &nbsp;|
      </a>
      <a style={{ justifyContent: "center" }}>
        &nbsp; Napzy name and logo are registered trademarks owner by Restopedic
        Mattresses co.
      </a>
    </StyledCopieright>
  );
};

export default Copieright;
