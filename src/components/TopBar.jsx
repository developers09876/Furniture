import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import axios from "axios";

const TopOfferBar = styled.div`
  // background-color: black;
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
  console.log("offer", offer);
  console.log(
    "offer_text",
    offer.offer_details?.[0].map((data) => {
      return data.offer_text;
    })
  );
  console.log(
    "precentage",
    offer.map((data) => {
      return data.offer;
    })
  );
  const fetchOffer = () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}admin/getoffer`)
      .then((res) => {
        setOffer(res.data);
        console.log("res", res.data);
      })
      .catch((error) => {
        console.error("Error Fetching Offer", error);
      });
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  return (
    <>
      <TopOfferBar>
        <StyledCarousel autoplay dots={false}>
          {offer[0]?.offer_Details?.map((data) => (
            <div>{data.offer_text}</div>
          ))}
        </StyledCarousel>
      </TopOfferBar>
    </>
  );
};

export default Navbar;
