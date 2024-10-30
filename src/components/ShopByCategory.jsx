import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import img1 from "../assets/sofa.jpg";
import img2 from "../assets/chair.jpg";
import img3 from "../assets/bed.jpg";
import img4 from "../assets/chair.jpg";

import "../Css-Pages/HomeCard.css";

function ShopByCategory() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { category } = location.state || {};

  // useEffect(() => {
  //   if (category) {
  //     console.log("Category:", category);
  //   }
  // }, []);

  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const datas = [
    {
      image: img1,
      title: "Matteress",
      id: "1",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      category: "Matteress",
    },
    {
      image: img2,
      title: "Sofa",
      id: "2",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      category: "Sofa",
    },
    {
      image: img3,
      title: "Beds",
      id: "3",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      category: "Beds",
    },
    {
      image: img4,
      title: "Pillow",
      id: "4",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      category: "Pillow",
    },
    {
      image: img4,
      title: "Table",
      id: "5",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      category: "Table",
    },
    {
      image: img4,
      title: "Dinner",
      id: "6",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      category: "Dinner",
    },
  ];

  return (
    <Container className="mt-5">
      <h4 style={{ textAlign: "center", fontSize: "32px" }}>
        Shop By Categories
        <center>
          <div
            style={
              {
                // backgroundColor: `var(--button-hover)`,
                // padding: "1px 1px 3px 3px",
                // width: "25%",
              }
            }
          ></div>
        </center>
      </h4>

      <div className="slider-container container">
        <Slider {...settings}>
          {datas.map((data, index) => (
            <div key={index}>
              <Row className="mt-3">
                <Col sm={6} md={12}>
                  <Card
                    className="card-container"
                    style={{
                      padding: "10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    cover={
                      <img
                        src={data.image}
                        alt={data.title}
                        style={{ height: "31vh", borderRadius: "10px" }}
                      />
                    }
                    onClick={() =>
                      navigate(`/products`, {
                        state: { category: data.category },
                      })
                    }
                  >
                    <h6 style={{ textAlign: "center" }}>{data.title}</h6>
                  </Card>
                </Col>
              </Row>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
}

export default ShopByCategory;
