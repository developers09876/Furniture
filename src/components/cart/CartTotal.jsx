import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "../../Css-Pages/HomeCard.css";
import { Col, Row } from "react-bootstrap";
import { DashboardContext } from "../../context/DashboardContext";

const CartTotal = ({ total }) => {
  const { cart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(cart);

  return (
    <Wrapper>
      <div className="order-total-container">
        <article className="order-total-card">
          <Row>
            <Col md={6}>
              <p className="order-total-heading">Order Total :</p>
            </Col>
            <Col md={6}>
              <div className="order-total-amount">₹&nbsp;{total}</div>
            </Col>
          </Row>
          <hr />
          {isAuthenticated ? (
            <Button
              className="proceed-btn"
              handleClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              className="login-btn"
              handleClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.raduis};
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
    span {
      width: 150px;
    }
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotal;
