import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Col, Container, Row } from "react-bootstrap";
import img1 from "../assets/sofa.jpg";
import img2 from "../assets/chair.jpg";
import img3 from "../assets/bed.jpg";
import img4 from "../assets/chair.jpg";

import { Card } from "antd";

function ShopByCategory() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const datas = [
    {
      image: img1,
      title: "Bed Room",
      id: "1",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
    },
    {
      image: img2,
      title: "Living",
      id: "2",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
    },
    {
      image: img3,
      title: "Kitchen",
      id: "3",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
    },
    {
      image: img4,
      title: "Dining",
      id: "4",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
    },
    {
      image: img4,
      title: "Study",
      id: "5",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
    },
    {
      image: img4,
      title: "Kids",
      id: "6",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
    },
  ];

  return (
    <Container className="mt-5">
        <h2 style={{textAlign:"center"}}>Shop By Categories

        <center>
           
           <div
             style={{
               backgroundColor: `var(--button-hover)`,
               padding: "1px 1px 3px 3px",
               width: "25%",
             }}
           ></div>
         </center>
        </h2>
        
      <div className="slider-container">
        <Slider {...settings}>
          {datas.map((data, index) => (
            <div key={index}>
                <Row className="mt-3">
                    <Col sm={12} md={12}>
              <Card
                style={{
              padding:"10px",
              border:"none"
                }}
                cover={
                  <img
                    src={data.image}
                    alt="chair"
                    style={{ height: "31vh" , borderRadius:"10px"}}
                  />
                }
              >
                <h6 style={{textAlign:"center"}}>
                  {data.title}
                  {/* // description={data.price} */}
                  </h6>
              </Card>
              </Col> </Row>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
}

export default ShopByCategory;
