import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';


const TopOfferBar = styled.div`
  background-color: var( --heading-clr) !important;
  text-align: center;
  color: white;
  font-size: 14px;
  height:40px;
  margin:0;
  `;

const StyledCarousel = styled(Carousel)`
  .slick-dots li button {
    background: white;
  }
`;

const TopBar = () => (
    <TopOfferBar>
        <StyledCarousel autoplay dots={false}>
            <div >
                Use code <span style={{ color: 'white' }}>MEGAFEST</span> to Get up to 75% off + Additional 10% off with bank offers
            </div>
            <div>Special Offer! Free Shipping on All Orders Above $500</div>
            <div>92+ Restopedic Furniture Stores across India. <span style={{ color: 'white' }}>Come, Visit Us!</span></div>
        </StyledCarousel>
    </TopOfferBar>
);

const Navbar = () => {
    return (
        <>
            <TopBar />
        </>
    );
};

export default Navbar;
