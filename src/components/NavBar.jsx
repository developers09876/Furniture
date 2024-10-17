// import Logo from "./Logo";
import Logo1 from "../assets/Restopedic-logo.png";
// C:\Users\TRIMATIS\Documents\furniture\Furniture\src\assets\Restopedic-logo.jpg
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import NavBar1 from "./NavBar1";
import { CgProfile } from "react-icons/cg";
import { Input } from "antd"; // Ant Design Input
import "./../Css-Pages/Navbr.css";

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

const NavBar = () => {
  const navigate = useNavigate();
  const { isAdmin, isUser, isAuthenticated, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const { total } = useContext(WishlistContext);

  const [username, setUsername] = useState("");

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

          <div style={{ marginLeft: "30px", flex: 1 }}>
            <Input.Search
              placeholder="Search products..."
              onSearch={(value) => console.log(value)}
              style={{ width: 250 }}
            />
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
                    User Dashboard
                  </StyledLink>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              <Link
                to="/cart"
                style={{ color: "#1D1D1D", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faCartShopping} className="me-1" /> (
                {isAuthenticated ? totalItems : 0})
              </Link>
              <Link
                to="/wishlist"
                style={{ color: "#1D1D1D", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faHeart} className="me-1 ms-3" /> (
                {isAuthenticated ? total : 0})
              </Link>
              {!isAuthenticated ? (
                <Button
                  className="ms-3 me-2 my-1"
                  handleClick={() => navigate("/userlogin")}
                >
                  Login <FontAwesomeIcon icon={faUserPlus} />
                </Button>
              ) : (
                <Button className="ms-3 me-2 my-3" handleClick={logout}>
                  Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
              )}
              <div>
                <CgProfile
                  style={{ width: "40px", height: "40px", marginLeft: "30px" }}
                />
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
              </div>
            </div>
          </div>
        </div>
      </nav>
      <NavBar1 />
    </>
  );
};

export default NavBar;
