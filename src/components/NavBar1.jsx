import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./../Css-Pages/Navbr.css";
// styles for links

const StyledLink = styled(NavLink)`
  // border-bottom: transparent solid 3px;
  transition: ${(props) => props.theme.transition};
  &:hover {
    // border-bottom-color: var(--button-hover);
    background-color: white;
    color: var(--button-hover) !important ;
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

const DropMenuStyled = styled(Link)`
  color: var(--button-hover) !important;

  &:hover {
    color: red !important;
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
    <nav className="navbar navbar-expand-lg p-0" style={{ height: "45px" }}>
      <div className="container lg-d-flex">
        {/* <Row>
      <Col md={8} sm={12}> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0">
            {/* Mattress Dropdown */}
            <center>
              <nav class="navbar">
                <ul class="navbar-nav mb-3">
                  <li class="nav-item">
                    <StyledLink
                      className="nav-link"
                      to="#"
                      id="mattressDropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      Mattresses
                    </StyledLink>
                    <div>
                      <ul class="dropdown-menu">
                        <li>
                          <DropMenuStyled className="dropdown-item" to="#">
                            Orthopedic Series
                          </DropMenuStyled>
                          {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                          <ul style={{ paddingLeft: "10px" }}>
                            <li>
                              <Link href="#">Ortho premium Mattress</Link>
                            </li>
                            <li>
                              <Link href="#">Ortho premium ET Mattress</Link>
                            </li>
                            <li>
                              <Link href="#">Ortho spine therapy Mattress</Link>
                            </li>
                            <li>
                              <Link href="#">
                                Ortho Latex o pedic ET Mattress
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                Ortho Organic posture pedic dual top Mattress
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <DropMenuStyled className="dropdown-item" to="">
                            Pocket Spring Series
                          </DropMenuStyled>
                          {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                          <ul>
                            <li>
                              <Link to="">Supremo Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Supremo ET Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Sleeep in posture Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Latex o pedic plus Mattress</Link>
                            </li>
                            <li>
                              <Link to="">
                                Organic posture pedic dual top Mattress
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <DropMenuStyled className="dropdown-item" to="#">
                            Bonnel Spring Series
                          </DropMenuStyled>
                          {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                          <ul style={{ width: "max-content" }}>
                            <li>
                              <Link to="">Classio Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Classio ET Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Spine therapy Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Classio Latex o pedic Mattress</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <DropMenuStyled className="dropdown-item" to="#">
                            Foam Series
                          </DropMenuStyled>
                          {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                          <ul style={{ width: "max-content" }}>
                            <li>
                              <Link to="">Amenity Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Amenity ET Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Posture Infinity Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Leisure Sleep Mattress</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <DropMenuStyled className="dropdown-item" to="#">
                            Latex Series
                          </DropMenuStyled>
                          {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                          <ul style={{ width: "max-content" }}>
                            <li>
                              <Link to="">Melody Mattress</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <DropMenuStyled className="dropdown-item" to="">
                            Kids & Foldable Series
                          </DropMenuStyled>
                          {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                          <ul style={{ width: "max-content" }}>
                            <li>
                              <Link to="">Rollup Mattress Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Slim mattress Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Baby Mattress Mattress</Link>
                            </li>
                            <li>
                              <Link to="">Baby Mattress plus Mattress</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item">
                    <StyledLink
                      className="nav-link"
                      to="#"
                      id="mattressDropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      Beds & Head Boards
                    </StyledLink>
                    <ul class="dropdown-menu" style={{ marginLeft: "100px" }}>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Upholstered Beds
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Engineered Wood Beds
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Hydraulic Beds Bunker Beds
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Bunker Beds
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <StyledLink
                      className="nav-link"
                      to="#"
                      id="mattressDropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      Sofa & Recliners
                    </StyledLink>

                    <ul class="dropdown-menu" style={{ marginLeft: "190px" }}>
                      <li>
                        <DropMenuStyled to="">Stationary sofas</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                      </li>
                      <li>
                        <DropMenuStyled to="">Sectional sofas</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                        <ul>
                          <li>
                            <Link to="">LHS Sectional sofas</Link>
                          </li>
                          <li>
                            <Link to="">RHS Sectional sofas</Link>
                          </li>
                          <li>
                            <Link to="">Corner sofas</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <DropMenuStyled to="">Motoion sofas</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                      </li>
                      <li>
                        <DropMenuStyled to="">Recliners</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                        <ul>
                          <li>
                            <Link to="">Manual Recliners</Link>
                          </li>
                          <li>
                            <Link to="">Motorised Recliners</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <DropMenuStyled to="">Sofa cum Beds</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                      </li>
                      <li>
                        <DropMenuStyled to="">Armchiar & Puffee</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                      </li>
                      <li>
                        <DropMenuStyled to="">Manual Recliners</DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                        <ul>
                          <li>
                            <Link to="">Manual Recliners</Link>
                          </li>

                          <li>
                            <Link to="">
                              1 seater Recliner Rocking Revolving & Recliner
                            </Link>
                          </li>

                          <li>
                            <Link to="">2 seater Recliner </Link>
                          </li>

                          <li>
                            <Link to="">3 seater Recliner </Link>
                          </li>

                          <li>
                            <Link to="">Recliner Set</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <StyledLink
                      className="nav-link"
                      to="#"
                      id="mattressDropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      Pillows & Cushions
                    </StyledLink>
                    <ul class="dropdown-menu">
                      <li>
                        <DropMenuStyled href="#" class="nav-link">
                          Sleeping Pillows
                        </DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                        <ul>
                          <li>
                            <Link href="#" class="nav-link">
                              Fiber Pillows
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Memory foam Pillows
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Memory foam contour pillows
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Latex Pillows
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Latex contour pillows
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Cool Gel Memory foam Pillow
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="#" class="nav-link">
                          Support Pillows
                        </Link>
                      </li>
                      <li>
                        <Link href="#" class="nav-link">
                          Medicinal Pillows
                        </Link>
                      </li>
                      <li>
                        <Link href="#" class="nav-link">
                          Maternity and Baby Pillows
                        </Link>
                      </li>
                      <li>
                        <Link href="#" class="nav-link">
                          Cushions and Bolsters
                        </Link>
                      </li>
                      <li>
                        <Link href="#" class="nav-link">
                          Car Cushions
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <StyledLink
                      className="nav-link"
                      to="#"
                      id="mattressDropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      Beddings
                    </StyledLink>
                    <ul class="dropdown-menu" style={{ marginLeft: "10px" }}>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Mattress Protectors
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Pillow Protectors
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Comforters
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Dohar
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Duvet
                        </Link>
                      </li>

                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Duvet Covers
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Flat Bedsheets
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Fitted Bedsheets
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Pillow Cover
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Kids Bedsheets
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#" class="nav-link">
                          Blankets
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </center>
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
