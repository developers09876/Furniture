import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Button from "../components/Button";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import Breadcrumb from "../components/Breadcrumb";
import img1 from "../assets/sofa.jpg";
import img2 from "../assets/chair.jpg";
import img3 from "../assets/bed.jpg";
import { Col, Row } from "react-bootstrap";
import { Tabs } from "antd";
import { Card } from "antd";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { Modal } from 'antd';

const card_help = {
  width: "100%",
  backgroundColor: "var(--bgColor)",
};


const SingleProductPage = () => {
  const { productID } = useParams();
  console.log("productID", productID);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState([
    {
      images: [img1, img2, img3],
      title: "SOFA",
      id: "1",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      LongDesc:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
      offer: "50",
      quantity_stock: "5",
    },
    {
      images: [img1, img2, img3],
      title: "chair",
      id: "3",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Chair",
      LongDesc:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
      offer: "50",
      quantity_stock: "5",
    },
    {
      images: [img1, img2, img3],
      title: "Bed",
      id: "4",
      price: "5000",
      discountPrice: "4000",
      description: "Comfortable Sofa",
      LongDesc:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
      offer: "80",
      quantity_stock: "5",
    },
    {
      images: [img1, img2, img3],
      title: "Bed4",
      id: "2",
      price: "5000",
      discountPrice: "4000",
      LongDesc:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
      description: "Comfortable Sofa",
      offer: "20",
      quantity_stock: "5",
    },
    {
      images: [img1, img2, img3],
      title: "5Bed",
      id: "5",
      price: "55000",
      discountPrice: "54000",
      description: "Comfortable Sofa",
      LongDesc:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
      offer: "520",
      quantity_stock: "5",
    },
  ]);


  console.log("product", product);
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    alert("trifgger")
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();


  useEffect(() => {
    // alert("triggered");
    const filteredData = products.filter((e) => {
      return e.id === productID; // Make sure to return the comparison result
    });
    console.log("filteredData", filteredData);
    setProduct(filteredData[0]);
    if (filteredData.length > 0) {
      setSelectedImage(filteredData[0].images[0]); // Set the first image as the default
    }
  }, [productID, products]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  console.log("initalprodiict", products);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/products/${productID}`);
  //       setProduct(response.data);
  //     } catch (error) {
  //       console.error('Error fetching product details:', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [productID]);
  useEffect(() => {
    setSubTotal(quantity * product?.price);
  }, [quantity, product]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  console.log(productID);

  if (!product) {
    return <Spinner />;
  }

  const {
    id,
    images,
    title,
    price,
    discountPrice,
    description,
    category,
    LongDesc,
    quantity_stock,
  } = product;

  return (
    <Wrapper className="container section-center page">
      <Breadcrumb />
      <Link to="/products" className="text-muted text-decoration-none">
        <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Back to products
      </Link>
      <div className="product-center row">
        <div className="col-md-2">
          <div className="image-album mb-2">
            {images.map((img, index) => (
              <img
                style={{ cursor: "pointer" }}
                key={index}
                src={img}
                alt={title}
                width="100%"
                onClick={() => handleImageClick(img)}
                className={`album-thumbnail ${
                  img === selectedImage ? "active" : ""
                } mb-2`}
              />
            ))}
          </div>
        </div>
        <div className="col-md-5 col-sm-12 mb-3">
          <img src={selectedImage} alt={title} className="product-image" />
        </div>
        {/* <div className="col-md-6 mb-3">
         
          <img src={image} alt={title} className='product-image' />
        </div> */}
        <div className="col-md-5 col-sm-12 content">
          <h1>{title}</h1>
          <h5 className="price me-2 d-inline">₹{price}</h5>
          {discountPrice && <h6 className="old-price d-inline">₹{discountPrice} </h6>}
          <p className="desc my-3">{description}</p>
          <div className="info">
            <p>
              <span>Category : </span>
              {category}
            </p>
            <p>
              <span>Descrpition : </span>
              {LongDesc}
            </p>
            <p>
              <span>Available : </span>
              {quantity_stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className="quantity-toggle">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              disabled={quantity_stock <= quantity}
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
          {isAuthenticated ? (
            <div className="buttons">
              {quantity_stock > 0 && (
                <Button
                  handleClick={() =>
                    addToCart({
                      id,
                      images,
                      title,
                      price,
                      quantity_stock,
                      quantity,
                      subTotal,
                    })
                  }
                >
                  Add to Cart
                </Button>
              )}
              <Button
                handleClick={() => addToWishlist({ id, image, title, price })}
              >
                <FontAwesomeIcon icon={faHeart} />
              </Button>
            </div>
          ) : (
            <Button className="my-4" handleClick={() => navigate("/login")}>
              login
            </Button>
          )}
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <center>
          <h2>Specifications</h2>
        </center>

        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: <b>Product Details</b>,
              key: "1",
              children: (
                <div>
                  <Row>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/01_material_feel_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Feel: </p>{" "}
                          </div>
                          <div>
                            <p>Medium Firm</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/06_material_type_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Material: </p>{" "}
                          </div>
                          <div>
                            <p>
                              ShapeSense™ Ortho Memory Foam Responsive Support
                              Foam High Density Foam Base Wakefit’s TruDensity™
                              technology ensures that every layer has 100% Pure
                              Foam which won’t sag or lose its shape over time
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/04_cover_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Cover Material:</p>{" "}
                          </div>
                          <div>
                            <p>AeroTex Knit Fabric (Space Grey)</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/07_usability.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Usability:</p>{" "}
                          </div>
                          <div>
                            <p>
                              Recommended to use with the memory foam side
                              facing up, but can be used on either side.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/05_cover_type_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Cover Type: </p>{" "}
                          </div>
                          <div>
                            <p>Removable zippered external cover</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        {/* <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/05_cover_type_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Usability:</p>{" "}
                          </div>
                          <div>
                            <p>
                              Recommended to use with the memory foam side
                              facing up, but can be used on either side.
                            </p>
                          </div>
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              label: <b>Product Dimensions</b>,
              key: "2",
              children: (
                <div>
                  <Row>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/thickness.jpg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Thickness:</p>{" "}
                          </div>
                          <div>
                            <p>
                              If even one of the sleepers weighs over 80kg, then
                              you require a mattress thickness of 8 inches
                              (20.32 cm) If both sleepers weigh less than 80 kg
                              and one of the sleepers weighs between 60-80 kg,
                              then you require a mattress thickness of 6 inches
                              (15.24 cm) If both sleepers weigh less than 60 kg,
                              then you require a mattress thickness of 5 inches
                              (12.7 cm)
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row></Row>
                    </Col>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/thickness.jpg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Dimensions:</p>{" "}
                          </div>
                          <div>
                            <p>
                              72x36x6 inch | 1.83m x 91cm x 15cm (Single) All
                              roll packed mattresses may take upto 72 hours to
                              regain their original size with +/- 15mm deviation
                              in length, width & height
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              label: <b> Product Policies</b>,
              key: "3",
              children: (
                <div>
                  <Row>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/02_warranty.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Warranty:</p>{" "}
                          </div>
                          <div>
                            <p>10 years manufacturer warranty</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/badges/100-percent-refund.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>100 days trial</p>{" "}
                          </div>
                          <div>
                            <p>Risk free returns.</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/03_shipping_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Shipping:</p>{" "}
                          </div>
                          <div>
                            <p>Direct from Factory/Warehouse</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={2}>
                          {/* <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/07_usability.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Usability:</p>{" "}
                          </div>
                          <div>
                            <p>
                              Recommended to use with the memory foam side
                              facing up, but can be used on either side.
                            </p>
                          </div> */}
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12} md={4}>
                      <Row>
                        <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/08_offers.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Available Offers: </p>{" "}
                          </div>
                          <div>
                            <p>0% (No Cost) EMI</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        {/* <Col sm={12} md={2}>
                          <img
                            src="https://wakefitdev.gumlet.io/img/latest/icons/05_cover_type_ortho.svg"
                            alt="touch"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Col>
                        <Col sm={12} md={10}>
                          <div>
                            {" "}
                            <p>Mattress Usability:</p>{" "}
                          </div>
                          <div>
                            <p>
                              Recommended to use with the memory foam side
                              facing up, but can be used on either side.
                            </p>
                          </div>
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div>
        <center>
          <h3>Need Help In Buying?</h3>
        </center>
        <div>
        <Row className="need-help-card mb-5">
  <Col sm={12} md={4}>
    <Card style={card_help} className="d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={9} style={{marginTop: "3%"}}>
          <b>Search Another Product</b>
        </Col>
        <Col md={3}>
          <img
            src="https://wakefitdev.gumlet.io/consumer-react/pdp/help-in-buy/help-mattress-logo.svg"
            alt=""
          />
        </Col>
      </Row>
    </Card>
  </Col>
  <Col  md={4}>
    <Card style={card_help} className="d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={9} style={{marginTop: "9%"}}>
          <b>
            <p>Contact Us</p>
          </b>
        </Col>
        <Col md={3}>
          <img
            src="https://wakefitdev.gumlet.io/consumer-react/pdp/help-in-buy/help-live-shop-logo.svg"
            alt="contact-us"
          />
        </Col>
      </Row>
    </Card>
  </Col>
  <Col  md={4}>
    <Card style={card_help} className="d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={9} style={{marginTop: "9%"}}>
          <b>
            <p>Chat With Us</p>
          </b>
        </Col>
        <Col md={3}>
          <img
            src="https://wakefitdev.gumlet.io/consumer-react/pdp/help-in-buy/help-chat-logo.svg"
            alt="Chat-with-us"
          />
        </Col>
      </Row>
    </Card>
  </Col>
</Row>

        </div>
        <div >
      
     
      
     
        </div>
      </div>
      <button type="primary" onClick={()=>showModal()}>
        Open Modal 
      </button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
       
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    margin-top: 2rem;
  }

  .product-image {
    max-width: 100%;
    height: auto;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.radius};
  }

  .content {
    h2 {
      color: ${(props) => props.theme.mainColor};
    }

    .price {
      color: ${(props) => props.theme.mainColor};
      font-size: 1.3rem;
    }

    .old-price {
      color: ${(props) => props.theme.textColor};
      text-decoration: line-through;
      font-size: 0.9rem;
    }

    .desc {
      line-height: 1.8;
      color: ${(props) => props.theme.textColor};
    }

    .info {
      text-transform: capitalize;
      span {
        font-weight: 700;
        color: ${(props) => props.theme.textColor};
      }
    }

    .buttons {
      margin-top: 1rem;
      button {
        margin-right: 1rem;
      }
    }
    .quantity-toggle {
      display: flex;
      align-items: center;

      button {
        padding: 0.5rem 1rem;
        margin: 0 0.25rem;
        font-size: 1rem;
        cursor: pointer;
        background-color: ${(props) => props.theme.mainColor};
        color: #fff;
        border: none;
        border-radius: 4px;
        outline: none;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      span {
        margin: 0 0.5rem;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
`;

export default SingleProductPage;
