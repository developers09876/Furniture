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
  font-size: 20px;
  border-radius: 7px;
  transition: ${(props) => props.theme.transition};
  color: black;
  padding: 8px !important;
  &:hover {
    border-radius: 7px;
    // border-bottom-color: var(--button-hover);
    background-color: rgb(171, 133, 189);
    color: white !important ;
    padding: 8px !important;
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
  color: var(--heading-clr) !important;
  font-size: 19px !important;
  font-weight: Bold;
  font-size: large;
  width: max-content;
  // font-family: 'Times New Roman', Times, serif;
  pointer-events: none;

  //  &:hover {
  //   color: violet!important;
  //  }
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
                        <DropMenuStyled className="dropdown-item">
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
                        <DropMenuStyled className="dropdown-item">
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
                            <Link to="/products/9">Amenity Mattress</Link>
                          </li>
                          <li>
                            <Link to="/products/10">Amenity ET Mattress</Link>
                          </li>
                          <li>
                            <Link to="/products/11">
                              Posture Infinity Mattress
                            </Link>
                          </li>
                          <li>
                            <Link to="/products/12">
                              Leisure Sleep Mattress
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <DropMenuStyled
                          className="dropdown-item"
                          style={{ width: "210px" }}
                        >
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
                        <DropMenuStyled className="dropdown-item">
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

                      <li>
                        <DropMenuStyled className="dropdown-item">
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
                        <DropMenuStyled className="dropdown-item">
                          Orthopedic Series
                        </DropMenuStyled>
                        {/* <div
                          style={{
                            backgroundColor: `var(--under-line)`,
                            padding: "1px 1px 1px 3px",
                            width: "100%",
                          }}
                        ></div> */}
                        <ul style={{ paddingLeft: "1px" }}>
                          <li>
                            <Link to="/products/4">Ortho premium Mattress</Link>
                          </li>
                          <li>
                            <Link to="/products/5">
                              Ortho premium ET Mattress
                            </Link>
                          </li>
                          <li>
                            <Link to="/products/6">
                              Ortho spine therapy Mattress
                            </Link>
                          </li>
                          <li>
                            <Link to="/products/7">
                              Ortho Latex o pedic ET Mattress
                            </Link>
                          </li>
                          <li>
                            <Link to="/products/8">
                              Ortho Organic posture pedic dual top Mattress
                            </Link>
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
                  <div>
                    <ul class="dropdown-menu">
                      <li>
                        <ul>
                          <li>
                            <Link href="#" class="nav-link">
                              Upholstered Beds
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Engineered Wood Beds
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Hydraulic Beds Bunker Beds
                            </Link>
                          </li>
                          <li>
                            <Link href="#" class="nav-link">
                              Bunker Beds
                            </Link>
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
                    Sofa & Recliners
                  </StyledLink>
                  <div>
                    <ul class="dropdown-menu">
                      <li>
                        <DropMenuStyled to="">
                          <center> Sofa Varietys</center>{" "}
                        </DropMenuStyled>

                        <ul>
                          <li>
                            <Link to="">Stationary sofas</Link>
                          </li>
                          <li>
                            <Link to="">Motoion sofas</Link>
                          </li>
                          <li>
                            <Link to="">Sofa cum Beds</Link>
                          </li>
                          <li>
                            <Link to="">Armchiar & Puffee</Link>
                          </li>
                        </ul>
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
                    Pillows & Cushions
                  </StyledLink>
                  <div>
                    <ul class="dropdown-menu">
                      <li>
                        <DropMenuStyled href="#">
                          Pillows Variety
                        </DropMenuStyled>

                        <ul>
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
                      <li>
                        <DropMenuStyled href="#">
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
                            <Link href="#">Fiber Pillows</Link>
                          </li>
                          <li>
                            <Link href="#">Memory foam Pillows</Link>
                          </li>
                          <li>
                            <Link href="#">Memory foam contour pillows</Link>
                          </li>
                          <li>
                            <Link href="#">Latex Pillows</Link>
                          </li>
                          <li>
                            <Link href="#">Latex contour pillows</Link>
                          </li>
                          <li>
                            <Link href="#">Cool Gel Memory foam Pillow</Link>
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
                    Beddings
                  </StyledLink>

                  <ul class="dropdown-menu">
                    <li>
                      <ul>
                        <li>
                          <Link href="#">Comforters</Link>
                        </li>
                        <li>
                          <Link href="#">Dohar</Link>
                        </li>
                        <li>
                          <Link href="#">Duvet</Link>
                        </li>
                        <li>
                          <Link href="#">Duvet Covers</Link>
                        </li>
                        <li>
                          <Link href="#">Fitted Bedsheets</Link>
                        </li>
                        <li>
                          <Link href="#">Kids Bedsheets</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <Link href="#">Mattress Protectors</Link>
                        </li>
                        <li>
                          <Link href="#">Pillow Protectors</Link>
                        </li>
                        <li>
                          <Link href="#">Pillow Cover</Link>
                        </li>
                        <li>
                          <Link href="#">Blankets</Link>
                        </li>
                        <li>
                          <Link href="#">Flat Bedsheets</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
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
