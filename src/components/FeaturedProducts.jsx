import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import img1 from "../assets/sofa.jpg";
import img2 from "../assets/chair.jpg";
import img3 from "../assets/bed.jpg";
import img4 from "../assets/chair.jpg";
import "../Css-Pages/WallBackground.css";
import { Row, Col, Container } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DashboardContext } from "../context/DashboardContext";
import ScrollReveal from "scrollreveal";

const FeaturedProducts = () => {
  const navigate = useNavigate()
  const { users, orders, products, fetchData } = useContext(DashboardContext);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

  };

  // const [featuredProducts, setFeaturedProducts] = useState(products);
  useEffect(() => {
    ScrollReveal().reveal(".hero-description", {
      distance: "200px",
      origin: "left",
      opacity: 0,
      duration: 900,
      easing: "ease-in-out",
      beforeReveal: (domEl) => {
        domEl.style.opacity = 1;
      },
    });
  }, []);

  useEffect(() => {
    ScrollReveal().reveal(".hero-images", {
      distance: "200px",
      origin: "right",
      opacity: 0,
      duration: 900,
      easing: "ease-in-out",
      beforeReveal: (domEl) => {
        domEl.style.opacity = 1;
      },
    });
  }, []);

  // useEffect(()=>{
  //   setFeaturedProducts(products)
  // },[products])
  return (
    <>
      <div className="container text-center">
        <h1 className="my-4">
          Featured Products
          <center>

            <div
              style={{
                backgroundColor: `var(--button-hover)`,
                padding: "1px 1px 3px 3px",
                width: "25%",
              }}
            ></div>
          </center>
        </h1>
        <>
          {products.length > 0 ? (
            <>
              <div className="row">
                <Slider {...settings}>
                  {products.map((product) => (
                    <div
                      key={product.productId}
                      className="col-lg-3 col-md-3 col-sm-12"
                    >

                      <ProductCard
                        image={product.images}
                        title={product.title}
                        id={product.productId}
                        description={product.description}
                        price={product.price}
                        discountPrice={product.discountPrice}
                        offer={product.offer}
                      />
                      <br />
                    </div>
                  ))}
                </Slider>
              </div>
              <div >
                <Link
                  // to={"/products"}
                  className="link-underline link-underline-opacity-0 mb-5"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Button handleClick={() => navigate("/products")}>All Products</Button>
                </Link>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </>
      </div>

      <div style={{ padding: "20px" }}>
        <Container>
          <Row>
            <Col sm={12} md={4} className="hero-description">
              <div className="modern-image-card">
                <img className="modern-image"
                  alt="chair"
                  src="https://images.pexels.com/photos/5806958/pexels-photo-5806958.jpeg?auto=compress&cs=tinysrgb&w=600"

                />
              </div>
            </Col>
            <Col className="modern-image-card hero-images" sm={12} md={8} >
              <div className="chair-cnt">
                <h2>Chair Collection!</h2>
                <p>Launch Offer 15% Off!</p>
                <Button type="primary">View Collections</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <div style={{ padding: "20px" }}>
          <Container>
            <Row>
              <Col className="modern-image-card hero-description" sm={12} md={8}>
                <div className="chair-cnt">
                  <h2>ALL Collection!</h2>
                  <p>New Session Stock</p>
                  <Button type="primary">View Collections</Button>
                </div>
              </Col>

              <Col xs={12} md={4} className="hero-images">
                <div className="modern-image-card">
                  <img
                    alt="chair"
                    src="https://images.pexels.com/photos/930390/pexels-photo-930390.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="modern-image"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
// const Wrapper = styled.main`
//   .container {
//   }
// `;
export default FeaturedProducts;
