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
    <TopOfferBar>
      <StyledCarousel autoplay dots={false}>
        <p style={{ color: "black" }}>
          {offer.offer_details?.[0].map((data) => {
            {
              data.offer_text;
            }
          })}
        </p>
        {/* <div>
          <span style={{ color: "white" }}>
            Use code
            <span style={{ color: "red", fontWeight: "bold" }}>
              MEGAFEST
            </span>{" "}
            to Get up to 75% off + Additional 10% off with bank offers
          </span>
        </div>
        <div>
          <span style={{ color: "white" }}>
            Special Offer! Free Shipping on All Orders Above $500
          </span>
        </div>
        <div>
          <span style={{ color: "white" }}>
            {" "}
            9+ Restopedic Furniture Stores across India.{" "}
          </span>{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            Come, Visit Us!
          </span>
        </div> */}
      </StyledCarousel>
    </TopOfferBar>
  );
};

export default Navbar;
