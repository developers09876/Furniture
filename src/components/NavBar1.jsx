// // import Logo from "./Logo";
// import { styled } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping, faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import Button from "./Button";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import { WishlistContext } from "../context/WishlistContext";

// // styles for links
// const StyledLink = styled(NavLink)`
//   border-bottom: transparent solid 3px;
//   transition: ${(props) => props.theme.transition};

//   &:hover {
//       border-bottom-color: var(--button-hover);
//   }
//   &.active {
//     border-bottom-color: var(--button-hover);

//   }

//   @media (max-width: 991.98px) {  /* Medium screens and below */
//     border-bottom: none;

//     &:hover {
//       padding-left: 10px;
//     }
//   }
// `;

// const NavBar = () => {

//   const navigate = useNavigate()
//   const { isAdmin, isAuthenticated, logout } = useContext(AuthContext);
//   const { totalItems } = useContext(CartContext);
//   const { total } = useContext(WishlistContext);


//   return (
//     <nav className="navbar navbar-expand-lg ">
//       <div className="container lg-d-flex ">
     
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mb-lg-0">
//             <li className="nav-item me-2">
//               <StyledLink className="nav-link" to='/matteress'>
//                 Matterees
//               </StyledLink>
//             </li>
//             <li className="nav-item me-2">
//               <StyledLink className="nav-link" to='/'>
//               {/* /about */}
//                 BedRoom
//               </StyledLink>
//             </li>
//             <li className="nav-item me-2">
//               <StyledLink className="nav-link" to='# '>
//               {/* /products */}
//                 Zense
//               </StyledLink>
//             </li>
//             <li className="nav-item me-2">
//               <StyledLink className="nav-link" to='#'>
//               {/* /contact */}
//                 Contact
//               </StyledLink>
//             </li>
           
//           </ul>
         
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./../Css-Pages/Navbr.css"
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

  @media (max-width: 991.98px) {  /* Medium screens and below */
    border-bottom: none;

    &:hover {
      padding-left: 10px;
    }
  }
`;



const NavBar1 = () => {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const { total } = useContext(WishlistContext);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container lg-d-flex">
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
                    <li><Link className="dropdown-item" to="#">Ortho premium Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Ortho premium ET Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Ortho spine therapy Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Ortho Latex o pedic ET Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Ortho Organic posture pedic dual top Mattress</Link></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                  Pocket Spring Series
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Supremo Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Supremo ET Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Sleeep in posture Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Latex o pedic plus Mattress</Link></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                <Link className="dropdown-item dropdown-toggle" to="#">
                Bonnel Spring Series
                  </Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Classio Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Classio ET Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Spine therapy Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Classio Latex  o pedic Mattress</Link></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                <Link className="dropdown-item dropdown-toggle" to="#">
                Foam Series
                  </Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Amenity Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Amenity ET Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Posture Infinity Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Leisure Sleep Mattress</Link></li>
                  </ul>
                </li>
             
                <li className="dropdown-submenu"><Link  className="dropdown-item dropdown-toggle" to="#">Latex Series </Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Melody  Mattress</Link></li>
                
                  </ul>
                
                </li>
                <li className="dropdown-submenu"><Link  className="dropdown-item dropdown-toggle" to="#">Kids & Foldable Series</Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Rollup Mattress Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Slim mattress Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Baby Mattress  Mattress</Link></li>
                    <li><Link className="dropdown-item" to="#">Baby Mattress plus Mattress</Link></li>
                
                  </ul>
                
                </li>
              </ul>
            </li>
            {/* Other Navbar Items */}
            <li className="nav-item dropdown me-3">
              <StyledLink
                className="nav-link dropdown-toggle"
                to="#"
                id="mattressDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sofa & Recliners
              </StyledLink>
              <ul className="dropdown-menu" aria-labelledby="mattressDropdown">
                {/* Submenu Items */}
                <li >
                  <Link className="dropdown-item" to="#">
                  Stationary sofas
                  </Link>
                 
                </li>
                <li className="dropdown-submenu">
                  <Link className="dropdown-item dropdown-toggle" to="#">
                  Sectional sofas
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">LHS Sectional sofas</Link></li>
                    <li><Link className="dropdown-item" to="#">RHS Sectional sofas</Link></li>
                    <li><Link className="dropdown-item" to="#">Corner sofas</Link></li>
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
                    <li><Link className="dropdown-item" to="#">Manual Recliners</Link></li>
                    <li><Link className="dropdown-item" to="#">Motorised Recliners</Link></li>
                  </ul>
                </li>
             
                <li><Link className="dropdown-item" to="#">Sofa cum Beds </Link>
               
                
                </li>
                <li><Link className="dropdown-item" to="#">Armchiar & Puffee</Link>
               
                
                </li>
              </ul>
            </li>
            <li className="nav-item me-3">
              <StyledLink className="nav-link" to="#">
              Beds & Head Boards	
              </StyledLink>
            </li>
            <li className="nav-item me-3">
              <StyledLink className="nav-link" to="#">
              Beddings	
              </StyledLink>
            </li>
            <li className="nav-item me-3">
              <StyledLink className="nav-link" to="#">
              Pillows & Cushions		
              </StyledLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar1;
