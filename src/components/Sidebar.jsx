import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiSolidOffer } from "react-icons/bi";
import {
  faChartBar,
  faBox,
  faUsers,
  faListAlt,
  faShoppingCart,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

// Styled components
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  width: 230px;
  min-height: 100vh;
  height: 100%;
  // background-color: ${(props) => props.theme.mainColorLighter};
  background-color: var(--bg-lite-clr);
  padding: 20px;
  margin-right: 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px 0;
  color: ${(props) => props.theme.textColor};
  text-decoration: none;

  &:hover {
    color: #000;
  }

  &.active {
    color: ${(props) => props.theme.mainColor};
    font-weight: bold;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const Footer = styled.div`
  margin-top: auto;
`;

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <Link className="navbar-brand me-auto mb-4" to="/">
        <Logo fontSize={40} width={150} />
      </Link>
      <SidebarLink exact to="/admin">
        <Icon icon={faChartBar} />
        Dashboard
      </SidebarLink>
      <SidebarLink to="/admin/products">
        <Icon icon={faBox} />
        Products
      </SidebarLink>
      <SidebarLink to="/admin/users">
        <Icon icon={faUsers} />
        Users
      </SidebarLink>
      <SidebarLink to="/admin/categories">
        <Icon icon={faListAlt} />
        Categories
      </SidebarLink>
      <SidebarLink to="/admin/orders">
        <Icon icon={faShoppingCart} />
        Orders
      </SidebarLink>
      <SidebarLink to="/admin/offers">
        <BiSolidOffer />
        &nbsp; Offers
      </SidebarLink>
      <Footer className="mt-auto">
        <Button className="me-2 my-3" handleClick={logout}>
          Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;
