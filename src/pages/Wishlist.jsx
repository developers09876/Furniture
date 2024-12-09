import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import WishlistContent from "../components/wishlist/WishlistContent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CartTotal from "../components/cart/CartTotal";
import { WishlistContext } from "../context/WishlistContext";
import Breadcrumb from "../components/Breadcrumb";
import { DashboardContext } from "../context/DashboardContext";
import styled from "styled-components";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { MdDelete } from "react-icons/md";
const { confirm } = Modal;

const Wishlist = () => {
  const navigate = useNavigate();
  const { total } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { clearWishlist, removeItem } = useContext(WishlistContext);

  const { whishlistData } = useContext(DashboardContext);
  const [whishlistCnt, setWhishlist] = useState([]);
  console.log("whishlistCnt", whishlistCnt);
  useEffect(() => {
    if (whishlistData) {
      setWhishlist(whishlistData.items);
    }
  }, [whishlistData]);

  const Wrapper = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;

    .remove {
      font-size: 16px;
      font-weight: bold;
      color: white;
      background-color: #007bff;
      padding: 10px 20px;
      border-radius: 5px;
      text-align: center;
      display: inline-block;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    .remove:hover {
      background-color: #0056b3;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    .title {
      grid-template-rows: 75px;
      display: grid;
      grid-template-columns: 75px 125px;
      align-items: center;
      text-align: left;
      gap: 1rem;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: ${(props) => props.theme.raduis};
      object-fit: cover;
    }

    h5 {
      font-size: 1rem;
      margin-bottom: 0;
    }

    .price {
      width: 110%;
      color: ${(props) => props.theme.mainColorLight};
    }

    .addToCart {
      width: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .remove-btn {
      border: transparent;
      background-color: transparent;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      cursor: pointer;
    }
  `;

  const handleDelete = (item) => {
    console.log("itemx", item);
    confirm({
      title: `Ready to remove ${item.title}?`,
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeItem(item.productId); // Use the _id to call the API for deletio
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  const handleClear = (item) => {
    confirm({
      title: `Ready to remove ${item.title}?`,
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        clearWishlist(item.productId); // Use the _id to call the API for deletio
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };
  return (
    <>
      <Breadcrumb />
      {isAuthenticated ? (
        <>
          <div className="container">
            <h4 className="ms-3 mb-5">My Wishlist</h4>
            {whishlistCnt.length > 0 && (
              <div className="content row px-3 d-md-flex d-none">
                <h6 className="col-3">Item</h6>
                <h6 className="col">Price</h6>
                {/* <h6 className="col">Quantity</h6> */}
                {/* <h6 className="col">Subtotal</h6> */}
              </div>
            )}
            <hr />
            {whishlistCnt.length > 0 ? (
              whishlistCnt.map((items) => {
                return (
                  <Wrapper className="row">
                    <div className="title col-md-3 col-4 ">
                      <img src={items.images[0]} alt={items.title} />{" "}
                      <br className="d-block d-md-none" />
                      <div style={{ width: "200px" }}>
                        <h5 className="name">{items.title}</h5>
                        {/* <h5 className="price d-block d-md-none">{price.toFixed(2)} MAD</h5> */}
                      </div>
                    </div>
                    <h5 className="price d-none d-md-block col">
                      {" "}
                      <FaIndianRupeeSign />
                      {items.discountPrice}{" "}
                    </h5>
                    <div
                      style={{ cursor: "pointer" }}
                      className="remove-btn col-4 col-md"
                      onClick={() => handleDelete(items)}
                    >
                      <h4 className="remove">Remove</h4>
                    </div>
                    <div className="addToCart d-md-block col">
                      <Button
                        className="col-1 col-md w-75"
                        handleClick={() =>
                          navigate(`/products/${items.productId}`)
                        }
                      >
                        More Details
                      </Button>
                    </div>
                    <button
                      className="remove-btn col-2 col-md-2"
                      onClick={() => removeItem(id)}
                    ></button>
                  </Wrapper>
                );
              })
            ) : (
              <h5 className="text-warning d-flex justify-content-center">
                Your Wishlist is Empty!
              </h5>
            )}
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <Button handleClick={() => navigate("/products")}>
                Continue Shopping
              </Button>
              {whishlistCnt.length > 0 && (
                <Button handleClick={() => handleClear(whishlistCnt)}>
                  Clear Wishlist
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <Button
          className="mx-auto d-flex m-3"
          handleClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default Wishlist;
