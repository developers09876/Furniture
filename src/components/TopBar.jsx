import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import axios from "axios";

const TopOfferBar = styled.div`
  background-color: black;
  text-align: center;
  font-size: 14px;
  height: 40px;
  margin: 0;
  padding: 10px;
`;

const StyledCarousel = styled(Carousel)`
  .slick-dots li button {
    background: white;
  }
`;

const Navbar = () => {
  const [offer, setOffer] = useState([]);

  const fetchOffer = () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}admin/getoffer`)
      .then((res) => {
        setOffer(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  const textcolor = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "red",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
    transition: "color 0.3s ease",
  };

  const nontextcolor = {
    fontSize: "19px",
    fontWeight: "500",
    color: "white",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
    letterSpacing: "0.5px",
    transition: "color 0.3s ease",
  };

  return (
    <>
      <TopOfferBar>
        <StyledCarousel autoplay dots={false}>
          {offer[0]?.offer_Details?.map((data, index) => {
            const words = data.offer_text.split(" ");
            return (
              <div
                key={index}
                style={{
                  fontSize: "16px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{
                      ...(word.includes("~") ? textcolor : nontextcolor),
                      margin: "0 3px",
                    }}
                  >
                    {word.replace("~", "")}
                  </span>
                ))}
              </div>
            );
          })}
        </StyledCarousel>
      </TopOfferBar>
    </>
  );
};

export default Navbar;
