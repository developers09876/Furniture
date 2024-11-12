import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import CartContent from "../components/cart/CartContent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CartTotal from "../components/cart/CartTotal";
import Breadcrumb from "../components/Breadcrumb";
import styled from "styled-components";
import { DashboardContext } from "../context/DashboardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Modal } from "antd";
import axios from "axios";
const { confirm } = Modal;

const Wrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  // rest of your styles here...
`;

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { clearCart, removeItem } = useContext(CartContext);
  const { cartdata } = useContext(DashboardContext);

  const [cd, setCd] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [cartdata1, setCartdata] = useState("");
  console.log("productxz", cd);
  useEffect(() => {
    if (cartdata) {
      setCd(cartdata.items);
    }
  }, [cartdata]);

  useEffect(() => {
    const total = cartdata.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setTotal(total.toFixed(2));

    const totalItems = cartdata.items.reduce((sum, item) => {
      return sum + Number(item.quantity);
    }, 0);

    setTotalItems(totalItems);
  }, [cartdata]);

  const handleDelete = (item) => {
    confirm({
      title: `Ready to remove ${item.title}?`,
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      // content: `Name: ${item.title}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeItem(item.productId); // Use the _id to call the API for deletion
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  const handleClear = (item) => {
    console.log("itemx", item);
    confirm({
      title: `Ready to Clear All Product?`,
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        clearCart();
      },
      onCancel() {
        console.log("Clear cancelled");
      },
    });
  };

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity);
  // };
  // const handleQuantityChange = async (item, newQuantity) => {
  //   if (newQuantity > 0 && newQuantity <= item.quantity_stock) {
  //     setCd((prevCd) =>
  //       prevCd.map((cartItem) =>
  //         cartItem.productId === item.productId
  //           ? { ...cartItem, quantity: newQuantity }
  //           : cartItem
  //       )
  //     );
  //     const userId = localStorage.getItem("id");
  //     await axios
  //       .post(
  //         `${import.meta.env.VITE_MY_API}user/updateQuantity/${userId}/${
  //           item.productId
  //         }`,
  //         {
  //           quantity: newQuantity,
  //         }
  //       )
  //       .then((res) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Item Update ",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         console.log("Quantity updated on backend");
  //       })

  //       .catch((error) => {
  //         console.error("Error updating quantity on backend:", error);
  //       });
  //   }
  // };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= item.quantity_stock) {
      try {
        setCd((prevCd) =>
          prevCd.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );

        const userId = localStorage.getItem("id");
        console.log(
          "Sending request to:",
          `${import.meta.env.VITE_MY_API}user/updateQuantity/${userId}/${item.productId
          }`
        );

        const response = await axios.put(
          `${import.meta.env.VITE_MY_API}user/updateQuantity/${userId}/${item.productId
          }`,
          { quantity: newQuantity },
          { timeout: 5000 }
        );

        console.log("response", response);

        Swal.fire({
          icon: "success",
          title: "Item Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Quantity updated on backend:", response.data);
      } catch (error) {
        console.error("Error updating quantity on backend:", error);
      }
    }
  };

  const Wrapper = styled.main`
    .quantity-toggle {
      display: flex;
      align-items: center;

      button {
        padding: 0.5rem 1rem;
        margin: 0 0.25rem;
        font-size: 1rem;
        cursor: pointer;
        background-color: ${(props) => props.theme.mainColor};
        color: #fff;
        border: none;
        border-radius: 4px;
        outline: none;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      span {
        margin: 0 0.5 rem;
        font-weight: bold;
        font-size: 20px;
        justify-content: center !important;
      }
    }
  `;

  return (
    <>
      <Breadcrumb />
      {isAuthenticated ? (
        <div className="container">
          <h4 className="ms-3 mb-5">My Cart</h4>
          {cd.length > 0 && (
            <div className="content row px-3 d-md-flex d-none">
              <h6 className="col-3">Item</h6>
              <h6 className="col">Price</h6>
              <h6 className="col">Quantity</h6>
              <h6 className="col">Subtotal</h6>
              <h6 className="col"></h6>
            </div>
          )}
          <hr />
          {cd.length > 0 ? (
            cd.map((item, index) => (
              <Wrapper className="row" key={index}>
                <div className="title col-md-3 col-4 d-flex align-items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{ width: "100px" }}
                  />
                  <div style={{ width: "200px", textAlign: "center" }}>
                    <h6 className="name">{item.title}</h6>
                  </div>
                </div>
                <h7 className="price d-none d-md-block col align-content-center">
                  <FaIndianRupeeSign />
                  {item.price}
                </h7>
                <div className="amount d-none d-md-block col align-content-center">
                  <div className="quantity-toggle">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <center>
                      {" "}
                      <span className="quantity m-2">{item.quantity}</span>
                    </center>
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                      disabled={item.quantity_stock <= item.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <h7 className="subtotal col-4 col-md align-content-center">
                  <FaIndianRupeeSign />
                  {item.price * item.quantity}
                </h7>
                <div
                  className="remove-btn col-4 col-md text-danger align-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </Wrapper>
            ))
          ) : (
            <h5 className="text-warning d-flex justify-content-center">
              Your Cart is Empty!
            </h5>
          )}

          <hr />
          <div className="d-flex justify-content-between">
            <Button handleClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
            {cd.length > 0 && (
              <Button handleClick={() => handleClear()}>Clear Cart</Button>
            )}
          </div>
          {cd.length > 0 && <CartTotal total={total} />}
        </div>
      ) : (
        <Button
          className="mx-auto d-flex"
          handleClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default Cart;
