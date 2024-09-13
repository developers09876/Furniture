import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBox,
  faUsers,
  faListAlt,
  faShoppingCart,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/Logo";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

// Styled components
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  width: 230px;
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.mainColorLighter};
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

const UserSidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <Link className="navbar-brand me-auto mb-4" to="/">
        <Logo fontSize={40} width={150} />
      </Link>
      <SidebarLink exact to="/user">
        <Icon icon={faChartBar} />
        Dashboard
      </SidebarLink>
      <SidebarLink exact to="/user/orders">
        <Icon icon={faBox} />
        Orders
      </SidebarLink>
      <SidebarLink exact to="/user/profile">
        <Icon icon={faBox} />
        Profile
      </SidebarLink>
      <SidebarLink to="/user/whistlist">
        <Icon icon={faBox} />
        Whistlist
      </SidebarLink>

      <Footer className="mt-auto">
        <Button className="me-2 my-3" handleClick={logout}>
          Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </Footer>
    </SidebarContainer>
  );
};

export default UserSidebar;
