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
import Underline from "./Underline";
// styles for links

const StyledLink = styled(NavLink)`
  // border-bottom: transparent solid 3px;
  font-size: 16px;
  border-radius: 7px 7px 0px 0px;
  transition: ${(props) => props.theme.transition};
  color: black;
  padding: 8px !important;
  &:hover {
    border-radius: 7px 7px 0px 0px;
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
  font-size: 15px !important;
  font-weight: Bold;
  font-size: large;
  width: max-content;
  // font-family: 'Times New Roman', Times, serif;
  pointer-events: none;
   text-decoration: underline;

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
    <nav
      className="navbar navbar-expand-lg"
      style={{ justifyContent: "center" }}
    >
      <div className="lg-d-flex">
        {/* <Row>
      <Col md={8} sm={12}> */}
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0">
            {/* Mattress Dropdown */}

            <nav class="navbar">
              <ul class="navbar-nav">
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
                    <ul class="dropdown-menu matress-item">
                      <li>
                        <DropMenuStyled className="dropdown-item">
                          Orthopedic Series
                        </DropMenuStyled>
                        <Underline />
                        <ul style={{ paddingLeft: "1px" }}>
                          <li>
                            <Link to="/products/4"> Premium Mattress</Link>
                          </li>
                          <li>
                            <Link to="/products/5">Premium ET Mattress</Link>
                          </li>
                          <li>
                            <Link to="/products/6">Spine Therapy Mattress</Link>
                          </li>
                          <li>
                            <Link to="/products/7">
                              Latex O Pedic ET Mattress
                            </Link>
                          </li>
                          <li>
                            <Link to="/products/8">
                              Organic Posture Pedic Dual Top Mattress
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <DropMenuStyled className="dropdown-item">
                          Pocket Spring Series
                        </DropMenuStyled>
                        <Underline />

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
                          Foam Series
                        </DropMenuStyled>
                        <Underline />
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
                        <Underline />
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
                        <Underline />
                        <ul style={{ width: "max-content" }}>
                          <li>
                            <Link to="">Rollup Mattress</Link>
                          </li>
                          <li>
                            <Link to="">Slim Mattress</Link>
                          </li>
                          <li>
                            <Link to="">Baby Mattress</Link>
                          </li>
                          <li>
                            <Link to="">Baby plus Mattress</Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <DropMenuStyled className="dropdown-item">
                          Latex Series
                        </DropMenuStyled>
                        <Underline />
                        <ul style={{ width: "max-content" }}>
                          <li>
                            <Link to="">Melody Mattress</Link>
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

                  <ul class="dropdown-menu Beds-Boards">
                    <li>
                      <ul>
                        <li>
                          <Link to="">Upholstered Beds</Link>
                        </li>
                        <li>
                          <Link to="">Engineered Wood Beds</Link>
                        </li>
                        <li>
                          <Link to="">Hydraulic Beds Bunker Beds</Link>
                        </li>
                        <li>
                          <Link to="">Bunker Beds</Link>
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
                    Sofa & Recliners
                  </StyledLink>
                  <div>
                    <ul class="dropdown-menu Sofa-recliners">
                      <li>
                        <DropMenuStyled to="">Manual Recliners</DropMenuStyled>
                        <Underline />
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
                      <li>
                        <DropMenuStyled to="">Sofa Varietys</DropMenuStyled>
                        <Underline />
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
                        <Underline />
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
                        <Underline />
                        <ul>
                          <li>
                            <Link to="">Manual Recliners</Link>
                          </li>
                          <li>
                            <Link to="">Motorised Recliners</Link>
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
                    <ul class="dropdown-menu  Pillows-Cushions">
                      <li>
                        <DropMenuStyled to="">Pillows Variety</DropMenuStyled>
                        <Underline />
                        <ul>
                          <li>
                            <Link to="">Support Pillows</Link>
                          </li>
                          <li>
                            <Link to="">Medicinal Pillows</Link>
                          </li>
                          <li>
                            <Link to="">Maternity and Baby Pillows</Link>
                          </li>
                          <li>
                            <Link to="">Cushions and Bolsters</Link>
                          </li>
                          <li>
                            <Link to="">Car Cushions</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <DropMenuStyled to="">Sleeping Pillows</DropMenuStyled>
                        <Underline />
                        <ul>
                          <li>
                            <Link to="">Fiber Pillows</Link>
                          </li>
                          <li>
                            <Link to="">Memory foam Pillows</Link>
                          </li>
                          <li>
                            <Link to="">Memory foam contour pillows</Link>
                          </li>
                          <li>
                            <Link to="">Latex Pillows</Link>
                          </li>
                          <li>
                            <Link to="">Latex contour pillows</Link>
                          </li>
                          <li>
                            <Link to="">Cool Gel Memory foam Pillow</Link>
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

                  <ul class="dropdown-menu Beddings">
                    <li>
                      <ul>
                        <li>
                          <Link to="">Comforters</Link>
                        </li>
                        <li>
                          <Link to="">Dohar</Link>
                        </li>
                        <li>
                          <Link to="">Duvet</Link>
                        </li>
                        <li>
                          <Link to="">Duvet Covers</Link>
                        </li>
                        <li>
                          <Link to="">Fitted Bedsheets</Link>
                        </li>
                        <li>
                          <Link to="">Kids Bedsheets</Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <ul>
                        <li>
                          <Link to="">Mattress Protectors</Link>
                        </li>
                        <li>
                          <Link to="">Pillow Protectors</Link>
                        </li>
                        <li>
                          <Link to="">Pillow Cover</Link>
                        </li>
                        <li>
                          <Link to="">Blankets</Link>
                        </li>
                        <li>
                          <Link to="">Flat Bedsheets</Link>
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
