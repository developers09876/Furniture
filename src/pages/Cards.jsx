import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space } from 'antd';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/Happy_Customers.png";
import image2 from "../assets/Free_shipping.png";
import image3 from "../assets/Free_installation.png";
import image4 from "../assets/Best_warranty.png";
import image5 from "../assets/Wakefit.png";
import image6 from "../assets/Mega_sale.png";
import image7 from "../assets/RBLBank-logo.png";
import image8 from "../assets/idfc-logo.png";
import '../Css-Pages/HomeCard.css';
import { Container } from 'react-bootstrap';

const { Text } = Typography;


const SaleContainer = styled.div`
  border: 1px solid#93aabf4d;
  border-radius: 10px;
  padding: 16px;
  display: flex;
//   justify-content: space-around;
  background-color: white;
//   height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;


const SaleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
    width:300vh;
`;


const SaleRight = styled.div`
 text-align: right;
  display: flex;
  align-items: center;
  gap: 8px;
`;


const TimerText = styled(Text)`
  font-size: 22px;
  color: #ff4d4f;
  font-weight: bold;
`;


const SaleEndsIn = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const FeaturesContainer = styled.div`
  border: 1px solid #93aabf4d;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;


const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const FeatureItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
};

const calculateTimeLeft = () => {
    let now = new Date();
    let eventTime = new Date(now.getTime() + 1000 * 60 * 60 * 5);
    let timeLeft = eventTime - now;

    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    return {
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
};

const Sale = () => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='container'>
            <Row gutter={[16, 16]} >

                <Col xs={24} md={24} lg={12}>
                    <SaleContainer>
                        <SaleLeft>
                            <img src={image6} alt="Mega Festive Sale" style={{
                                width: '80px',
                                //  height: 'auto' 
                            }} />
                            <div style={{ marginLeft: '50px' }}>
                                <SaleEndsIn>
                                    <Space direction="vertical" size={0}>
                                        <Text strong style={{ fontSize: '18px' }}>Sale Ends In</Text>
                                        <TimerText>{`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}</TimerText>
                                        <Space size="small">
                                            <Text>Days</Text>
                                            <Text>Hrs</Text>
                                            <Text>Mins</Text>
                                        </Space>
                                    </Space>
                                </SaleEndsIn>
                            </div>
                        </SaleLeft>
                        <SaleRight>

                            <div style={{ fontSize: '60px', padding: "0 10px", color: '#93aabf4d', fontWeight: "100" }}>|</div>
                            <div className="slider" style={{ width: '90%', height: '100px', padding: "0" }}>
                                <Slider {...settings}>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: "row-reverse", alignItems: "center", padding: '0 10px' }}>
                                            <Text style={{ fontSize: '18px', padding: "10px", color: 'green', fontWeight: 'bold' }}>up to 10%</Text>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: "row-reverse", alignItems: "center", padding: '0 10px' }}>
                                            <Text style={{ fontSize: '18px', padding: "10px", color: 'green', fontWeight: 'bold' }}>up to 10%</Text>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </SaleRight>
                    </SaleContainer>
                </Col>


                <Col xs={24} md={24} lg={12}>
                    <FeaturesContainer>
                        <IconWrapper>
                            <FeatureItem>
                                <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#AC5FC1', width: '110px', fontFamily: 'Cursive, sans-serif' }}>
                                    Why Restopedic?
                                </Text>
                            </FeatureItem>
                            <FeatureItem>
                                <img src={image1} alt="25 Lakhs+ Customers" style={{ width: '40px' }} />
                                <Text style={{ fontSize: '12px', color: '#666' }}>25 Lakhs+ Customers</Text>
                            </FeatureItem>
                            <FeatureItem>
                                <img src={image2} alt="Free Shipping" style={{ width: '40px' }} />
                                <Text style={{ fontSize: '12px', color: '#666' }}>Free Shipping</Text>
                            </FeatureItem>
                            <FeatureItem>
                                <img src={image3} alt="Free Installation" style={{ width: '40px' }} />
                                <Text style={{ fontSize: '12px', color: '#666' }}>Free Installation</Text>
                            </FeatureItem>
                            <FeatureItem>
                                <img src={image4} alt="Best Warranty" style={{ width: '40px' }} />
                                <Text style={{ fontSize: '12px', color: '#666' }}>Best Warranty</Text>
                            </FeatureItem>
                        </IconWrapper>
                    </FeaturesContainer>

                </Col>
            </Row>
        </div>
    );
};

export default Sale;
