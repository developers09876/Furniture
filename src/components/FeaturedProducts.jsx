import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import { Link } from "react-router-dom";
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

import ScrollReveal from "scrollreveal";

const FeaturedProducts = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    
  };

  const [featuredProducts, setFeaturedProducts] = useState([
    {
      image: img1,
      title: "SOFA",
      id: "1",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      offer: "50",
    },
    {
      image: img2,
      title: "chair",
      id: "3",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      offer: "50",
    },
    {
      image: img3,
      title: "Bed",
      id: "4",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      offer: "80",
    },
    {
      image: img2,
      title: "Bed4",
      id: "2",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      offer: "20",
    },
    {
      image: img3,
      title: "5Bed",
      id: "5",
      price: "55000",
      discountPrice: "54000",
      description: "Comfortable Sofa",
      offer: "520",
    },
  ]);

// ScrollReveal animation
  
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


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/products?featured=true"); // get the featured products only
  //       setFeaturedProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

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
          {featuredProducts.length > 0 ? (
            <>
              <div className="row">
                <Slider {...settings}>
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-lg-3 col-md-3 col-sm-12"
                    >
                      
                      <ProductCard
                        image={product.image}
                        title={product.title}
                        id={product.id}
                        description={product.description}
                        price={product.price}
                        discountPrice={product.discountPrice}
                        offer={product.offer}
                      />
                      <br/>
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
                  <Button handleClick={() => null}>All Products</Button>
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
