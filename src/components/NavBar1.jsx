import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Row , Col  } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./../Css-Pages/Navbr.css";
// styles for links

const StyledLink = styled(NavLink)`
  border-bottom: transparent solid 3px;
  transition: ${(props) => props.theme.transition};

  &:hover {
    border-bottom-color: var(--button-hover);
  }
  // &.active {
  //   border-bottom-color: var(--button-hover);
  // }

  @media (max-width: 991.98px) {
    /* Medium screens and below */
    border-bottom: none;

    &:hover {
      padding-left: 10px;
    }
  }
`;
const SearchContainer = styled.div`
  width: 270px;
  margin: 0 auto;
  position: relative;
  text-align: center;
`;

const StyledInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 3rem;
  // outline: 1px solid transparent;
  outline: 1px solid var(--button-hover);
  // border: 1px solid ${(props) => props.theme.borderColor};
  border: 1px solid var(--button-hover);
  border-radius: ${(props) => props.theme.radius};
  margin-right: 10px;
  width: 100%;

  &:focus {
    outline: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.radius};
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 20px;
  top: 13px;
  color: ${(props) => props.theme.mutedTextColor};
`;

const NavBar1 = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const { total } = useContext(WishlistContext);

  return (
    <nav className="navbar navbar-expand-lg p-0"> 
      <div className="container lg-d-flex">
        {/* <Row>
      <Col md={8} sm={12}> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0">
            {/* Mattress Dropdown */}
            <li className="nav-item dropdown me-3">
              <StyledLink
                className="nav-link dropdown-toggle"
                to="#"
                id="mattressDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mattresses
              </StyledLink>
              <ul className="dropdown-menu" aria-labelledby="mattressDropdown">
                {/* Submenu Items */}
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Orthopedic Series
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/products/3">
                        Ortho premium Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Ortho premium ET Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Ortho spine therapy Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Ortho Latex o pedic ET Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Ortho Organic posture pedic dual top Mattress
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Pocket Spring Series
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Supremo Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Supremo ET Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Sleeep in posture Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Latex o pedic plus Mattress
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Bonnel Spring Series
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Classio Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Classio ET Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Spine therapy Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Classio Latex o pedic Mattress
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Foam Series
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Amenity Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Amenity ET Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Posture Infinity Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Leisure Sleep Mattress
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Latex Series{" "}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Melody Mattress
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Kids & Foldable Series
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Rollup Mattress Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Slim mattress Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Baby Mattress Mattress
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Baby Mattress plus Mattress
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            {/* Other Navbar Items */}
            <li className="nav-item dropdown me-3">
              <StyledLink
                className="nav-link dropdown-toggle"
                to="#"
                id="SofaDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sofa & Recliners
              </StyledLink>
              <ul className="dropdown-menu" aria-labelledby="SofaDropdown">
                {/* Submenu Items */}
                <li>
                  <Link className="dropdown-item" to="#">
                    Stationary sofas
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Sectional sofas
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        LHS Sectional sofas
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        RHS Sectional sofas
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Corner sofas
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item" to="#">
                    Motoion sofas
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                    Recliners
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Manual Recliners
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Motorised Recliners
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link className="dropdown-item" to="#">
                    Sofa cum Beds{" "}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Armchiar & Puffee
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown me-3">
              <StyledLink
                className="nav-link dropdown-toggle"
                to="#"
                id="SofaDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               Beds & Head Boards
              </StyledLink>
              <ul className="dropdown-menu" aria-labelledby="SofaDropdown">
                {/* Submenu Items */}
             

                <li className="dropdown-submenu">
                  <Link className="dropdown-item" to="#">
                    Upholstered Beds
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="#">
                    Engineered Wood Beds{" "}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Hydraulic Beds
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Bunker Beds
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown me-3">
              <StyledLink
                className="nav-link dropdown-toggle"
                to="#"
                id="SofaDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Beddings
              </StyledLink>
              <ul className="dropdown-menu" aria-labelledby="SofaDropdown">
                {/* Submenu Items */}
                <li>
                  <Link className="dropdown-item" to="#">
                    Mattress Protectors
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Pillow Protectors
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Comforters
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Dohar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Duvet
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Duvet Covers
                  </Link>
                </li>

                <li className="dropdown-submenu">
                  <Link className="dropdown-item" to="#">
                    Fitted Bedsheets
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item" to="#">
                    Flat Bedsheets
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="#">
                    Pillow Cover
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Kids Bedsheets
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Blankets
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown me-3">
              <StyledLink
                className="nav-link dropdown-toggle"
                to="#"
                id="SofaDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               Pillow & Cushions
              </StyledLink>
              <ul className="dropdown-menu" aria-labelledby="SofaDropdown">
                {/* Submenu Items */}
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                  Sleeping Pillows
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                      Fiber Pillows
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                      Memory foam Pillows
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                      Memory foam contour pillows
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                      Latex Pillows
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                      Latex contour pillows
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                      Cool Gel Memory foam Pillow
                      </Link>
                    </li>
                    
                  </ul>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                  Support Pillows
                  </Link>
                </li>
                
               

                <li>
                  <Link className="dropdown-item" to="#">
                  Medicinal Pillows
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                  Maternity and Baby Pillows
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                  Cushions and Bolsters
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                  Car Cushions
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {/* <SearchContainer className="my-4">
            <StyledInput
              type="text"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon icon={faSearch} className="text-muted" />
          </SearchContainer> */}
        </div>
        {/* </Col>
        <Col md={4} sm={12}> */}
         
        {/* </Col>
        </Row> */}
      </div>
    </nav>
  );
};

export default NavBar1;
