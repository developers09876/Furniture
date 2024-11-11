import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightFromBracket,
  faUserPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FaRegHeart } from "react-icons/fa";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Tooltip, Dropdown, Menu, Input } from "antd";
import { CgProfile } from "react-icons/cg";
import Logo1 from "../assets/Restopedic-logo.png";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { DashboardContext } from "../context/DashboardContext";
import "./../Css-Pages/Navbr.css";
import axios from "axios";

// styles for links
const StyledLink = styled(NavLink)`
  border-bottom: transparent solid 3px;
  transition: ${(props) => props.theme.transition};
  &:hover {
    border-bottom-color: var(--button-hover);
  }

  @media (max-width: 991.98px) {
    border-bottom: none;
    &:hover {
      padding-left: 10px;
    }
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useContext(DashboardContext);
  const { isAdmin, isUser, isAuthenticated, logout } = useContext(AuthContext);
  const { total } = useContext(WishlistContext);
  const { cartdata, whishlistData } = useContext(DashboardContext);
  const [totalItems, setTotalItems] = useState(0);
  const [totalWhish, setTotalWhish] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const itemsCount = cartdata.items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    setTotalItems(itemsCount);
  }, [cartdata]);

  useEffect(() => {
    const wishlistCount = whishlistData.items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    setTotalWhish(wishlistCount);
  }, [whishlistData]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      const formattedUsername =
        storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
      setUsername(formattedUsername);
    }
  }, [isAuthenticated]);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredProducts([]);
  };

  const onSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) {
      handleSearch();
    } else {
      clearSearch();
    }
  };

  const menuItems = (
    <Menu>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Menu.Item
            key={product.id}
            onClick={() => navigate(`/products/${product.productId}`)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: 50, marginRight: 10 }}
              />
              <div>
                <span style={{ fontWeight: "bold", color: "#008000" }}>
                  {product.title}
                </span>
                <br />
                <span>{product.category}</span>
                <br />
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  ₹{product.price}
                </span>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  ₹{product.discountPrice}
                </span>
              </div>
            </div>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>
          <span>No results found</span>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <NavBar2 />
      <nav
        className="navbar navbar-expand-lg p-0"
        style={{ backgroundColor: "var(--bgColor)" }}
      >
        <div className="container lg-d-flex justify-content-center">
          <h3 className="fw-bolder text-decoration-none">
            <img
              src={Logo1}
              alt="Restropedic"
              style={{ fontSize: "30px", width: "150px" }}
            />
          </h3>
          <Dropdown
            overlay={menuItems}
            trigger={["click"]}
            visible={query.length > 0}
          >
            <Input
              value={query}
              placeholder="Search products"
              style={{ width: 300 }}
              onChange={onSearchChange}
              suffix={
                query.length > 0 ? (
                  <CloseCircleOutlined
                    onClick={clearSearch}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <SearchOutlined />
                )
              }
            />
          </Dropdown>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item m-2 mx-3">
                <StyledLink className="nav-link" to="/">
                  Home
                </StyledLink>
              </li>
              <li className="nav-item m-2 mx-3">
                <StyledLink className="nav-link" to="/about">
                  About
                </StyledLink>
              </li>
              <li className="nav-item m-2 mx-3">
                <StyledLink className="nav-link" to="/products">
                  Products
                </StyledLink>
              </li>
              <li className="nav-item m-2 mx-3">
                <StyledLink className="nav-link" to="/contact">
                  Contact
                </StyledLink>
              </li>
              {isAdmin && (
                <li className="nav-item m-2 mx-3">
                  <StyledLink className="nav-link" to="/admin">
                    Dashboard
                  </StyledLink>
                </li>
              )}
              {isUser && (
                <li className="nav-item m-2">
                  <StyledLink className="nav-link" to="/user/orders">
                    <CgProfile style={{ width: "40px", height: "22px" }} />
                  </StyledLink>
                </li>
              )}
              <li className="nav-item ms-2 mt-3 pt-1">
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <Badge size="small" count={isAuthenticated ? totalItems : 0}>
                    <FontAwesomeIcon
                      style={{ height: "18px" }}
                      icon={faCartShopping}
                    />
                  </Badge>
                </Link>
              </li>
              <li className="nav-item ms-2 mt-3 pt-0 ">
                <Link
                  to="/wishlist"
                  // style={{ color: "#1D1D1D", textDecoration: "none" }}
                >
                  <Badge size="small" count={isAuthenticated ? totalWhish : 0}>
                    <FaRegHeart
                      style={{
                        fontSize: "18px",
                        // color: "red",
                      }}
                    />
                  </Badge>
                </Link>
              </li>
              <li className="nav-item m-2 mt-3" style={{ cursor: "pointer" }}>
                {!isAuthenticated ? (
                  <Tooltip title="Login">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      onClick={() => navigate("/userlogin")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Logout">
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      onClick={logout}
                    />
                  </Tooltip>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <NavBar1 />
    </>
  );
};

export default NavBar;
