import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "../../Css-Pages/HomeCard.css";

const CartTotal = () => {
  const { cart, total } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(cart);

  return (
    <Wrapper>
      {/* <div>
        <article>
          <h4>
            Order Total :
            <span>
              <FaIndianRupeeSign /> {total}
            </span>
          </h4>
          <hr />
          {isAuthenticated ? (
            <Button handleClick={() => navigate("/checkout")}>
              proceed to checkout
            </Button>
          ) : (
            <Button handleClick={() => navigate("/login")}>login</Button>
          )}
        </article>
      </div> */}
      <div className="order-total-container">
        <article className="order-total-card">
          <h4 className="order-total-heading">
            Order Total :
            <span className="order-total-amount">
              <FaIndianRupeeSign /> {total}
            </span>
          </h4>
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
              handleClick={() => navigate("/userlogin")}
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
