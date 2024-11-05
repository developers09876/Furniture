import { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import Button from "../components/Button";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import Breadcrumb from "../components/Breadcrumb";
import img1 from "../assets/sofa.jpg";
import img2 from "../assets/chair.jpg";
import img3 from "../assets/bed.jpg";
import Amenity from "../assets/Amenity.png";
// import threeSixtyDegree from "../assets/360degere.jpg";
import threeSixtyDegreeAnimation from "../assets/360_Animation.gif";
import Amenity_ET from "../assets/Amenity_ET.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Leisure from "../assets/Leisure.png";
import Luxe from "../assets/Luxe.png";
import Posture from "../assets/Posture.png";
import { Col, Container, Row } from "react-bootstrap";
import { Tabs } from "antd";
import { Card } from "antd";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Radio } from "antd";
import { ImYoutube } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
const { Group: RadioGroup, Button: RadioButton } = Radio;
import "../Css-Pages/HomeCard.css";
// import "../Css-Pages/WallBackground.css";

const SingleProductPage = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const { productID } = useParams();
  const [product, setProduct] = useState([]);
  if (
    product &&
    Array.isArray(product.specification) &&
    product.specification.length > 0
  ) {
  } else {
    console.log("Specification is not available");
  }
  const [selectedImage, setSelectedImage] = useState(null);
  // const [images, setImages] = useState([img1, img2, img3, Amenity, Amenity_ET]);
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const [showPic, setShowPic] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const [unit, setUnit] = useState("in");
  const [categorz, setCategory] = useState("Single");
  const [selectedDimension, setSelectedDimension] = useState('78" x 30"');
  const [thickness, setThickness] = useState('6"');
  const [customLength, setCustomLength] = useState("");
  const [customBreadth, setCustomBreadth] = useState("");
  const [hover, setHover] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MY_API}products/getOne/${productID}`
        );
        setProduct(response.data);
        setImages(response.data.images);

        setSelectedImage(response.data.images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    // Ensure productID is passed here
    fetchProduct();
  }, [productID]);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    resetFilters();
  };
  const handleShowPic = () => setShowPic(true);
  const handleClosePic = () => {
    setShowPic(false);
    resetFilters();
  };

  const handleShowVideo = () => setVideoVisible(true);
  const handleCloseVideo = () => setVideoVisible(false); // Hide video
  // const resetFilters = () => {
  //   // setCategory("");
  //   setUnit("in");
  //   setSelectedDimension("");
  //   setCustomLength("");
  //   setCustomBreadth("");
  //   setThickness("");
  // };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    // setSelectedDimension("");
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    // setSelectedDimension("");
  };

  const moveAr = () => {
    navigate("/ortholatex");
    window.location.reload(); // This will refresh the page after navigation
  };

  const handleDimensionChange = (value) => {
    setSelectedDimension(value);
  };

  const handleThicknessChange = (value) => {
    setThickness(value);
  };

  const handleCustomSizeChange = (e, type) => {
    if (type === "length") {
      setCustomLength(e.target.value);
    } else {
      setCustomBreadth(e.target.value);
    }
  };

  const handleConfirmVariant = () => {
    setShow(false);
    console.log(
      "choose1",
      categorz,
      selectedDimension,
      thickness,
      customLength,
      customBreadth
    );

    const selectedSize =
      categorz === "Custom Size"
        ? `${customLength} x ${customBreadth}`
        : selectedDimension;
    console.log("Selected Size:", selectedSize);
    // handleClose();
  };

  const dimensions = {
    Single: {
      in: ['72" x 36"', '75" x 42"', '78" x 30"', '80" x 35"', '84" x 36"'],
      ft: ["6' x 3'", "6.5' x 3.5'", "7' x 2.5'", "8' x 3'", "8.5' x 3.5'"],
      cm: [
        "183 x 91 cm",
        "190 x 107 cm",
        "198 x 76 cm",
        "203 x 89 cm",
        "213 x 91 cm",
      ],
    },
    Diwan: {
      in: ['70" x 34"', '72" x 30"', '75" x 35"', '78" x 36"'],
      ft: ["5.8' x 2.8'", "6' x 2.5'", "6.2' x 2.9'", "6.5' x 3'"],
      cm: ["178 x 86 cm", "183 x 76 cm", "190 x 89 cm", "198 x 91 cm"],
    },
    Queen: {
      in: ['75" x 60"', '78" x 60"', '80" x 62"', '84" x 64"'],
      ft: ["6.5' x 5'", "6.8' x 5'", "7' x 5.2'", "7.2' x 5.4'"],
      cm: ["190 x 152 cm", "198 x 152 cm", "203 x 157 cm", "213 x 162 cm"],
    },
    King: {
      in: ['80" x 76"', '84" x 72"', '88" x 80"', '90" x 82"'],
      ft: ["6.8' x 6.3'", "7' x 6'", "7.4' x 6.5'", "7.5' x 6.8'"],
      cm: ["203 x 193 cm", "213 x 183 cm", "224 x 203 cm", "229 x 208 cm"],
    },
    "Custom Size": {
      in: [],
      ft: [],
      cm: [],
    },
  };

  const thicknessOptions = {
    in: ['5"', '6"', '8"', '10"'],
    ft: ["0.5'", "0.6'", "0.8'", "0.10'"],
    cm: ["12.7 cm", "15.2 cm", "20.3 cm", "25.4 cm"],
  };

  const openMOdelPic = {
    width: "100%",
    height: "100%",
  };

  const selectedStyle = {
    color: "white",
    backgroundColor: "#7fafcb",
    border: "none",
  };

  const unselectedStyle = {
    color: "#7fafcb",
    backgroundColor: "transparent",
    border: "1px solid #7fafcb",
  };

  const buttonStyle = {
    backgroundColor: hover ? "#7fafcb" : "white",
    color: hover ? "white" : "#7fafcb",
    border: " 1px solid #7fafcb",
  };

  const speCont = styled.main`
    .p {
      color: blue;
    }
  `;

  const card_help = {
    width: "100%",
    backgroundColor: "var(--bgColor)",
  };

  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("addToWishlist", addToWishlist);
  const navigate = useNavigate();
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    setSubTotal(quantity * product?.price);
  }, [quantity, product]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!product) {
    return <Spinner />;
  }

  const {
    productId,
    // images,
    title,
    price,
    discountPrice,
    description,
    category,
    LongDesc,
    path_view,
    quantity_stock,
  } = product;

  // const addToWishlist = async (item) => {
  //   console.log("itemwhislist", item);
  //   try {
  //     if (isAuthenticated) {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_MY_API}user/createWhishlist`,
  //         {
  //           id: userID,
  //           cartItem: {
  //             productId: item.productId,
  //             images: item.images,
  //             title: item.title,
  //             price: item.price,
  //             quantity_stock: item.quantity_stock,
  //             quantity: item.quantity,
  //             subTotal: item.subTotal,
  //             unit: item.unit,
  //             category: item.category,
  //             selectedDimension: item.selectedDimension,
  //             thickness: item.thickness,
  //           },
  //         }
  //       );
  //       const fetchedCart = response.data.user.Carts;
  //       setCart((prevCart) => ({
  //         ...prevCart,
  //         items: fetchedCart,
  //       }));

  //       const itemExists = wishlist.items.some(
  //         (wishlistItem) => wishlistItem.id === item.productId
  //       );

  //       if (itemExists) {
  //         Swal.fire({
  //           icon: "info",
  //           title: "Item already in wishlist",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       } else {
  //         const updatedWishlist = {
  //           ...wishlist,
  //           user_id: userID,
  //           items: [...wishlist.items, { ...item }],
  //         };

  //         const response = await axios.put(
  //           `${import.meta.env.VITE_MY_API}wishlists/${userID}`,
  //           updatedWishlist
  //         );
  //         const fetchedWishlist = response.data;
  //         // setWishlist(fetchedWishlist);
  //         // setTotal(fetchedWishlist.items.length);
  //         setWishlist(updatedWishlist);
  //         setTotal(updatedWishlist.items.length);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Item added to wishlist",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     } else {
  //       console.error("User wishlist is not available");
  //     }
  //   } catch (error) {
  //     console.error("Error adding item to wishlist:", error);
  //   }
  // };

  return (
    <Wrapper className="container section-center page">
      <Breadcrumb />
      <Link to="/products" className="text-muted text-decoration-none">
        <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Back to products
      </Link>
      <div className="product-center row">
        <div className="col-md-1">
          <div className="image-album mb-2">
            {images?.map((img, index) => (
              <img
                style={{
                  cursor: "pointer",
                  borderRadius: "5px",
                  height: "47px",
                }}
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
        <div className="col-md-6 col-sm-12 mb-3">
          <img
            src={selectedImage}
            style={{ cursor: "zoom-in" }}
            alt={title}
            className="product-image"
            onClick={() => handleShowPic()}
          />
        </div>
        {/* <div className="col-md-6 mb-3">
         
          <img src={image} alt={title} className='product-image' />
        </div> */}
        <div className="col-md-5 col-sm-12 content">
          <h4>{title}</h4>
          {/* <div>{categorz + "," + selectedDimension + "," + thickness}</div> */}
          <p>
            <span>
              <h6>Category : {category}</h6>
            </span>
          </p>
          <h5 className="price me-2 d-inline">₹{price}</h5>
          {discountPrice && (
            <h6 className="old-price d-inline">₹{discountPrice} </h6>
          )}
          {/* <p className="desc my-1">{description}</p> */}
          <div className="info ">
            <p>
              <span>Descrpition : </span>
              {LongDesc}
            </p>
            <p>
              <span>Available : </span>
              {quantity_stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <span>Choose Mattress Dimensions</span>
            <br />
            <Row>
              <Col md={6}>
                <button
                  className="chooseVarientButton mb-3 mt-3"
                  onClick={() => handleShow()}
                  style={{
                    backgroundColor: "white",
                    color: "var(--button-hover)",
                    border: "2px solid #7fafcb",
                    padding: "8px 16px",
                    transition: "0.3s ease-in-out",
                    borderRadius: "0.375rem ",
                  }}
                >
                  {/* Choose Varity{`${category, selectedDimension , }`} */}
                  {categorz + "," + selectedDimension + "," + thickness}
                  <FaChevronDown />
                </button>
              </Col>
              <Col md={3}>
                {/* <button>View 3D</button> */}
                <div class="threeSixtyDegreePic mb-2">
                  <img
                    src={threeSixtyDegreeAnimation}
                    // style={threeSixtyDegreeStyle}
                    style={{ height: "70px", cursor: "pointer" }}
                    alt="360° Button"
                    onClick={() => {
                      moveAr();
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="chooseVarientButton">
            {/* Choose Varient  Modal */}

            {/* Centered Video Display */}
            {videoVisible && (
              <div
                style={{
                  position: "fixed",
                  top: "55%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1150,
                  background: "white",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "20px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  width: "50%",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseVideo}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    fontSize: "40px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <IoMdClose />
                </button>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/your_video_id"
                    allowFullScreen
                    title="How to Measure Video"
                    style={{
                      width: "100%",
                      height: "450px",
                      borderRadius: "20px",
                    }}
                  ></iframe>
                </div>
              </div>
            )}
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
                      productId,
                      images,
                      title,
                      price,
                      quantity_stock,
                      quantity,
                      subTotal,
                      unit,
                      categorz,
                      selectedDimension,
                      thickness,
                    })
                  }
                >
                  Add to Cart
                </Button>
              )}
              <Button
                handleClick={() =>
                  addToWishlist({
                    productId,
                    images,
                    title,
                    price,
                    quantity_stock,
                    quantity,
                    subTotal,
                  })
                }
              >
                <FontAwesomeIcon icon={faHeart} />
              </Button>
            </div>
          ) : (
            <Button className="my-3" handleClick={() => navigate("/userlogin")}>
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
          className="speCont"
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
                            <b>Mattress Feel: </b>
                          </div>

                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Details
                                  ?.feel || "N/A"
                              : "Specification is not available"}
                          </p>
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
                            <b>Mattress Material: </b>
                          </div>
                          <div>
                            <p>
                              {product &&
                              Array.isArray(product.specifications) &&
                              product.specifications.length > 0
                                ? product.specifications[0]?.product_Details
                                    ?.cover_Type || "N/A"
                                : "specifications is not available"}
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
                            <b>Cover Material:</b>
                          </div>
                          <div>
                            <p>
                              {product &&
                              Array.isArray(product.specifications) &&
                              product.specifications.length > 0
                                ? product.specifications[0]?.product_Details
                                    ?.cover_Material || "N/A"
                                : "specifications is not available"}
                            </p>
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
                            <b>Mattress Usability:</b>{" "}
                          </div>
                          <div>
                            <p>
                              {product &&
                              Array.isArray(product.specifications) &&
                              product.specifications.length > 0
                                ? product.specifications[0]?.product_Details
                                    ?.Usability || "N/A"
                                : "specifications is not available"}
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
                            <b>Cover Type: </b>
                          </div>

                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Details
                                  ?.cover_Type || "N/A"
                              : "specifications is not available"}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12} md={12}>
                      {product &&
                      Array.isArray(product.specifications) &&
                      product.specifications.length > 0
                        ? product.specifications[0]?.product_Details?.dynamicFields?.map(
                            (fields) => (
                              <Col sm={12} md={12}>
                                <h5>{fields?.title || "N/A"}</h5>
                                <p>{fields.description || "N/A"}</p>
                              </Col>
                            )
                          ) || "N/A"
                        : "specifications is not available"}

                      {/* <p>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details?.dynamicFields?.map(
                              (fields) => fields.description
                            ) || "N/A"
                          : "specifications is not available"}
                      </p> */}
                    </Col>
                    {/* <Col sm={12} md={12}>
                      <h5>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[1]?.title || "N/A"
                          : "specifications is not available"}
                      </h5>
                      <p>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[1]?.description || "N/A"
                          : "specifications is not available"}
                      </p>
                    </Col>
                    <Col sm={12} md={12}>
                      <h5>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[2]?.title || "N/A"
                          : "specifications is not available"}
                      </h5>
                      <p>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[2]?.description || "N/A"
                          : "specifications is not available"}
                      </p>
                    </Col>
                    <Col sm={12} md={12}>
                      <h5>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[3]?.title || "N/A"
                          : "specifications is not available"}
                      </h5>
                      <p>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[3]?.description || "N/A"
                          : "specifications is not available"}
                      </p>
                    </Col>
                    <Col sm={12} md={12}>
                      <h5>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[4]?.title || "N/A"
                          : "specifications is not available"}
                      </h5>
                      <p>
                        {product &&
                        Array.isArray(product.specifications) &&
                        product.specifications.length > 0
                          ? product.specifications[0]?.product_Details
                              ?.dynamicFields[4]?.description || "N/A"
                          : "specifications is not available"}
                      </p>
                    </Col> */}
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
                            <b>Mattress Thickness:</b>{" "}
                          </div>

                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Dimension
                                  ?.thickness || "N/A"
                              : "specifications is not available"}
                          </p>
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
                            <b>Dimensions:</b>{" "}
                          </div>
                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Dimension
                                  ?.dimensions || "N/A"
                              : "specifications is not available"}
                          </p>
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
                            <b>Warranty:</b>{" "}
                          </div>
                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Policies
                                  ?.Warranty || "N/A"
                              : "specifications is not available"}
                          </p>
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
                            <b>Shipping:</b>{" "}
                          </div>
                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Policies
                                  ?.Shipping || "N/A"
                              : "specifications is not available"}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={2}></Col>
                      </Row>
                    </Col>
                    <Col sm={12} md={4}>
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
                            <b>100 days trial</b>{" "}
                          </div>

                          <p>
                            {product &&
                            Array.isArray(product.specifications) &&
                            product.specifications.length > 0
                              ? product.specifications[0]?.product_Policies
                                  ?.trial || "N/A"
                              : "specifications is not available"}
                          </p>
                        </Col>
                      </Row>
                      <Row></Row>
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
              <Card
                style={card_help}
                className="d-flex align-items-center justify-content-center"
              >
                <Row className="w-100">
                  <Col md={9} style={{ marginTop: "3%" }}>
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
            <Col md={4}>
              <Card
                style={card_help}
                className="d-flex align-items-center justify-content-center"
              >
                <Row className="w-100">
                  <Col md={9} style={{ marginTop: "9%" }}>
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
            <Col md={4}>
              <Card
                style={card_help}
                className="d-flex align-items-center justify-content-center"
              >
                <Row className="w-100">
                  <Col md={9} style={{ marginTop: "9%" }}>
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
        <div></div>
      </div>
      <Container className="mt-5">
        <Modal
          show={showPic}
          onHide={handleClosePic}
          // size="lg"
          centered
          dialogClassName="custom-modal"
        >
          {/* <Modal.Header closeButton className="flex"></Modal.Header> */}
          <Row style={{ padding: "10px" }} className="mb-3">
            <Modal.Title className="w-100 text-center">
              <img
                src={selectedImage}
                alt={title}
                className="openMOdelPic"
                style={openMOdelPic}
              />
            </Modal.Title>
          </Row>

          <div className="slider-container container" style={{ width: "96%" }}>
            <Slider {...settings}>
              {images?.map((img, index) => (
                <div key={index}>
                  <>
                    <Col lg={12} style={{ padding: "10px" }}>
                      <img
                        style={{
                          cursor: "pointer",
                          borderRadius: "5px",
                          height: "120px",
                        }}
                        key={index}
                        src={img}
                        alt={title}
                        width="100%"
                        onClick={() => handleImageClick(img)}
                        className={` ${
                          img === selectedImage ? "active" : ""
                        } mb-2`}
                      />
                    </Col>
                  </>
                </div>
              ))}
            </Slider>
          </div>
        </Modal>
      </Container>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="w-100 text-center">
            <b>Choose a variant</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Video Button */}
          <button
            // variant="primary"
            className="w-100 d-flex  align-items-center"
            onClick={handleShowVideo}
            style={{
              textDecoration: "none",
              color: "black",
              backgroundColor: "#dee5ec",
              border: "none",
            }}
          >
            <ImYoutube color="red" />
            <span style={{ margin: "0 10px" }}>
              Learn how to measure the right mattress size
            </span>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </button>

          {/* Unit Selection */}
          <div className="mb-3">
            <p>
              <b>Sizes in:</b>
            </p>
            <RadioGroup
              // defaultValue={unit}
              size="large"
              onChange={handleUnitChange}
            >
              <RadioButton value="in">in</RadioButton>
              <RadioButton value="ft">ft</RadioButton>
              <RadioButton value="cm">cm</RadioButton>
            </RadioGroup>

            {/* Category Selection */}
            <div className="mb-3">
              <p>
                <b>Select Category</b>
              </p>
              <div className="d-flex flex-wrap">
                {["Single", "Diwan", "Queen", "King", "Custom Size"].map(
                  (cat) => (
                    <button
                      key={cat}
                      id={categorz - `${cat}`}
                      onClick={() => handleCategoryChange(cat)}
                      className="me-2 mb-2"
                      style={categorz === cat ? selectedStyle : unselectedStyle}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Dimension Selection */}
            <div className="mb-3">
              <p>
                <b>Dimensions (Length x Width):</b>
              </p>
              {categorz === "Custom Size" ? (
                <div className="d-flex ">
                  <input
                    type="number"
                    style={{ width: "auto", border: "1px solid #7facfb" }}
                    placeholder="Enter Length"
                    value={customLength}
                    onChange={(e) => handleCustomSizeChange(e, "length")}
                    className="form-control mb-2 me-5"
                  />
                  <input
                    type="number"
                    style={{ width: "auto", border: "1px solid #7facfb" }}
                    placeholder="Enter Breadth"
                    value={customBreadth}
                    onChange={(e) => handleCustomSizeChange(e, "breadth")}
                    className="form-control  mb-2"
                  />
                </div>
              ) : (
                dimensions[categorz][unit].map((dimension) => (
                  <button
                    key={dimension}
                    className="m-1"
                    onClick={() => handleDimensionChange(dimension)}
                    style={
                      selectedDimension === dimension
                        ? selectedStyle
                        : unselectedStyle
                    }
                  >
                    {dimension}
                  </button>
                ))
              )}
            </div>

            {/* Thickness (Height) Selection */}
            <div className="mb-3">
              <p>
                <b>Thickness (Height):</b>
              </p>
              {thicknessOptions[unit].map((thick) => (
                <button
                  key={thick}
                  className="m-1"
                  onClick={() => handleThicknessChange(thick)}
                  style={thickness === thick ? selectedStyle : unselectedStyle}
                >
                  {thick}
                </button>
              ))}
            </div>

            {/* Confirm button */}
            <div style={{ justifyContent: "center", textAlign: "center" }}>
              <button
                onClick={handleConfirmVariant}
                style={buttonStyle}
                // onMouseEnter={() => setHover(true)}
                // onMouseLeave={() => setHover(false)}
              >
                Confirm Variant
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .speCont {
    .p {
      color: blue;
    }
  }
  .product-center {
    margin-top: 2rem;
  }

  .p {
    margin-bottom: 0rem !important;
  }
  .product-image {
    cursor: pointer;
    max-width: 100%;
    height: auto;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 15px;
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
