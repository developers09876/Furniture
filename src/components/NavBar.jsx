// import Logo from "./Logo";
import Logo1 from "../assets/Restopedic-logo.png";
// C:\Users\TRIMATIS\Documents\furniture\Furniture\src\assets\Restopedic-logo.jpg
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightFromBracket,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { DownOutlined } from "@ant-design/icons";

import { Avatar, Badge, Space, Tooltip, Dropdown, Menu, Input } from "antd";

import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import { CgProfile } from "react-icons/cg";
import "./../Css-Pages/Navbr.css";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { log } from "three/webgpu";
import { DashboardContext } from "../context/DashboardContext";
import Products from "../pages/Products";

// styles for links
const StyledLink = styled(NavLink)`
  border-bottom: transparent solid 3px;
  transition: ${(props) => props.theme.transition};
  &:hover {
    border-bottom-color: var(--button-hover);
  }

  @media (max-width: 991.98px) {
    /* Medium screens and below */
    border-bottom: none;

    &:hover {
      padding-left: 10px;
    }
  }
`;
const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 20px;
  top: 13px;
  color: ${(props) => props.theme.mutedTextColor};
`;

const NavBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  console.log("query", query);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("filteredProducts", filteredProducts);

  const { isAdmin, isUser, isAuthenticated, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const { total } = useContext(WishlistContext);

  const [username, setUsername] = useState("");
  const [products, setProducts] = useState("");
  console.log("products12", products);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_MY_API}products/`
  //     );

  //     setProducts(response.data);
  //     // const productFilter = locationData
  //     //   ? response.data.filter((product) => product.category === locationData)
  //     //   : response.data;

  //     setFilteredProducts(productFilter);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setQuery(query);

  // let filtered = products;
  // if (locationData) {
  //   filtered = products.filter(
  //     (product) => product.category === locationData
  //   );
  // }

  // if (query) {
  //   const filtered = query.filter((product) =>
  //     product.title.toLowerCase().includes(query)
  //   );
  // }

  // setFilteredProducts(filtered);
  // };

  const SearchContainer = styled.div`
    width: 270px;
    margin: 0 auto;
    position: relative;
    text-align: center;
  `;

  const StyledInput = styled.input`
    padding: 0.5rem 1rem 0.5rem 3rem;
    // outline: 1px solid transparent;
    // outline: 1px solid var(--button-hover);
    // border: 1px solid ${(props) => props.theme.borderColor};
    border: 1px solid var(--button-hover);
    border-radius: ${(props) => props.theme.radius};
    margin-right: 10px;
    width: 90%;
    border-radius: 5px;

    &:focus {
      // outline: 1px solid ${(props) => props.theme.borderColor};
      outline: 1px solid var(--button-hover);
      border-radius: ${(props) => props.theme.radius};
    }
  `;

  const navIconItem = {
    width: "40px",
    height: "22px",
  };

  const [search, setsearch] = useState("");

  // const handleChange = (e) => {
  //   setsearch(e.target.value);
  // };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MY_API}products/`
      );
      setProducts(response.data);

      // const productFilter = locationData
      //   ? response.data.filter((product) => product.category === locationData)
      //   : response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setQuery(query);

    let filtered = products;
    if (query) {
      filtered = filtered.filter((search) =>
        search.title.toLowerCase().includes(query)
      );
    } else {
      filtered = [];
    }
    setFilteredProducts(filtered);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const menuItems = (products) => (
    <Menu>
      {filteredProducts.map((product) => (
        <Menu.Item key={product.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={product.image} // Product image URL
              alt={product.title}
              style={{ width: 50, marginRight: 10 }} // Adjust size as needed
            />
            <div>
              <span style={{ fontWeight: "bold", color: "#008000" }}>
                {product.category}
              </span>
              <br />
              <span>{product.title}</span>
              <br />
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                ₹{product.originalPrice}
              </span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                {" "}
                ₹{product.discountedPrice}
              </span>
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  // useEffect(() => {
  //   if (query !== "") {
  //     fetch(`${import.meta.env.VITE_MY_API}products/${query}`).then((res) =>
  //       res.json().then((res) => console.log("check1", res))
  //     );
  //   }
  // });

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      const formattedUsername =
        storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
      setUsername(formattedUsername);
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavBar2 />
      <nav
        className="navbar navbar-expand-lg p-0"
        style={{ backgroundColor: "var(--bgColor)" }}
      >
        <div className="container lg-d-flex justify-content-center">
          {/* <Link className="navbar-brand me-auto" to="/">
          <Logo fontSize={40} width={150} />
        </Link> */}
          <h3 href="#" alt="Home" className="fw-bolder text-decoration-none">
            {/* <Logo fontSize={30} width={150} /> */}
            {/* Restopedic */}
            <img
              src={Logo1}
              alt="Restropedic"
              style={{ fontSize: "30px", width: "150px" }}
            />
          </h3>

          {/* <div style={{ marginLeft: "30px", flex: 1 }}>
            <Input.Search
              placeholder="Search products..."
              onSearch={(value) => console.log(value)}
              style={{ width: 250 }}
            />
          </div> */}
          <div>
            {/* <div>
              <input
                type="text"
                placeholder="Search products"
                value={query}
                onChange={handleSearch}
              />

              <SearchIcon icon={faSearch} className="text-muted" />
            </div> */}

            <div>
              {/* {filteredProducts.map((suggestion) => {
             
                const items = [
                  {
                    key: "1",
                    label: suggestion.title, 
                  },
          
                ];

                return (
                  <div key={suggestion.id}>
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>{suggestion.title}</Space>
                      </a>
                    </Dropdown>
                  </div>
                );
              })} */}
              <Dropdown overlay={menuItems(Products)} trigger={["click"]}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search products"
                  style={{ width: 300 }}
                />
              </Dropdown>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item m-2">
                <StyledLink className="nav-link" to="/">
                  Home
                </StyledLink>
              </li>
              <li className="nav-item m-2">
                <StyledLink className="nav-link" to="/about">
                  About
                </StyledLink>
              </li>
              <li className="nav-item m-2">
                <StyledLink className="nav-link" to="/products ">
                  Products
                </StyledLink>
              </li>
              <li className="nav-item m-2">
                <StyledLink className="nav-link" to="/contact">
                  Contact
                </StyledLink>
              </li>
              <li>
                {isAdmin && (
                  <li className="nav-item m-2">
                    <StyledLink className="nav-link" to="/admin">
                      Dashboard
                    </StyledLink>
                  </li>
                )}
                {isUser && (
                  <li className="nav-item m-2">
                    <StyledLink className="nav-link" to="/user/orders">
                      {/* User Dashboard */}
                      <CgProfile style={navIconItem} />
                    </StyledLink>
                  </li>
                )}
              </li>
              <li className="nav-item ms-2  mt-3 pt-1">
                <Link
                  to="/cart"
                  style={{ color: "#1D1D1D", textDecoration: "none" }}
                >
                  <Badge size="small" count={isAuthenticated ? totalItems : 0}>
                    <FontAwesomeIcon
                      style={{ height: "18px" }}
                      icon={faCartShopping}
                    />
                  </Badge>

                  {/* ({isAuthenticated ? totalItems : 0}) */}
                </Link>
              </li>
              <li className="nav-item ms-2 mt-3  pt-1">
                <Link
                  to="/wishlist"
                  style={{ color: "#1D1D1D", textDecoration: "none" }}
                >
                  {/* <FontAwesomeIcon icon={faHeart} className="me-1" /> (
                  {isAuthenticated ? total : 0}) */}

                  <Badge size="small" count={isAuthenticated ? total : 0}>
                    <FontAwesomeIcon
                      style={{ height: "18px" }}
                      icon={faHeart}
                    />
                  </Badge>
                </Link>
              </li>
              <li className="nav-item m-2  mt-3" style={{ cursor: "pointer" }}>
                {!isAuthenticated ? (
                  <Tooltip title="Login">
                    <FontAwesomeIcon
                      className=" my-1"
                      icon={faUserPlus}
                      onClick={() => navigate("/userlogin")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Logout">
                    <FontAwesomeIcon
                      className="my-1"
                      icon={faRightFromBracket}
                      onClick={logout}
                    />
                  </Tooltip>
                )}
              </li>
              {/* <div>
                {isAuthenticated && username && (
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Hi, {username}
                  </span>
                )}
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
      <NavBar1 />
    </>
  );
};

export default NavBar;
