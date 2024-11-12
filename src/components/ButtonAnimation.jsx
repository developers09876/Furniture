import React from "react";
import styled from "styled-components";

const StyledButton = styled.a`
  position: relative;
  margin: auto;
  padding: 19px 22px;
  transition: all 0.2s ease;
  text-decoration: none;
  //   color: inherit;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 28px;
    background: #a68fbb;
    width: 56px;
    height: 56px;
    transition: all 0.3s ease;
  }

  span {
    position: relative;
    font-size: 16px;
    line-height: 18px;
    font-weight: 900;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    vertical-align: middle;
  }

  svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #111;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  &:hover:before {
    width: 100%;
    background: #722a8ec9;
  }

  &:hover svg {
    transform: translateX(0);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  display: grid;
  font-family: Avenir, sans-serif;
  color: #111;
`;

function ButtonAnimation() {
  return (
    <ButtonContainer>
      <StyledButton href="#">
        <span>Buy</span>
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </StyledButton>
    </ButtonContainer>
  );
}

export default ButtonAnimation;
