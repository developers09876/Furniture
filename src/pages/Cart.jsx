import { useNavigate } from "react-router-dom";
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
  const { clearCart } = useContext(CartContext);
  const { cartdata } = useContext(DashboardContext);
  const { whishlistData } = useContext(DashboardContext);

  const [cd, setCd] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState("");
  const { removeItem } = useContext(CartContext);

  console.log("whishlistData", whishlistData);
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
            cd.map((item) => (
              <Wrapper className="row">
                <div className="title col-md-3 col-4 ">
                  <img src={item.image} alt={item.title} />{" "}
                  <br className="d-block d-md-none" />
                  <div style={{ width: "200px" }}>
                    <h5 className="name">{item.title}</h5>
                    {/* <h5 className="price d-block d-md-none">{price} MADG</h5> */}
                  </div>
                </div>
                <h5 className="price d-none d-md-block col">
                  <FaIndianRupeeSign />
                  {item.price}
                </h5>
                <div className="amount d-none d-md-block col">
                  <h5 className="quantity ms-4">{item.quantity}</h5>
                </div>
                <h5 className="subtotal col-4 col-md">
                  <FaIndianRupeeSign />
                  {item.price * item.quantity}
                  {/* {selectedDimension}
        {categorz}
        {thickness}
        {unit} */}
                </h5>
                <div
                  style={{ cursor: "pointer" }}
                  className="remove-btn col-4 col-md"
                  onClick={() => handleDelete(item)}
                >
                  <FontAwesomeIcon className="text-danger" icon={faTrash} />
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
          handleClick={() => navigate("/userlogin")}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default Cart;
