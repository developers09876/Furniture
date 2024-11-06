// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import CartContent from "../components/cart/CartContent";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import CartTotal from "../components/cart/CartTotal";
// import Breadcrumb from "../components/Breadcrumb";
// import axios from "axios";
// import styled from "styled-components";
// import { DashboardContext } from "../context/DashboardContext";
// const Cart = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);
//   const { clearCart } = useContext(CartContext);
//   const { totalItems } = useContext(CartContext);
//   const { cartdata } = useContext(DashboardContext);
//   const [cd, setcd] = useState([]);
//   console.log("cd", cd);
//   console.log("firstzx", cartdata);
//   const userID = localStorage.getItem("id");
//   const Wrapper = styled.article`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin: 2rem 0;

//     .title {
//       grid-template-rows: 75px;
//       display: grid;
//       grid-template-columns: 75px 125px;
//       align-items: center;
//       text-align: left;
//       gap: 1rem;
//     }

//     img {
//       width: 100%;
//       height: 100%;
//       display: block;
//       border-radius: ${(props) => props.theme.raduis};
//       object-fit: cover;
//     }

//     h5 {
//       font-size: 1rem;
//       margin-bottom: 0;
//     }

//     .price {
//       width: 110%;
//       color: ${(props) => props.theme.mainColorLight};
//     }

//     .amount {
//       width: 75px;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;

//       .quantity {
//         font-size: 1.25rem;
//       }
//     }

//     .subtotal {
//       width: 200px;
//       font-size: 1.25rem;
//       color: ${(props) => props.theme.mainColorLight};
//     }

//     .remove-btn {
//       border: transparent;
//       background-color: transparent;
//       width: 1.5rem;
//       height: 1.5rem;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1rem;
//       cursor: pointer;
//     }
//   `;
//   useEffect(() => {
//     if (cartdata) {
//       alert("vnatea");
//       setcd(cartdata.items);
//     } else {
//       alert("varala");
//     }

//     setcd(totalItems);
//   }, [cartdata]);

//   // useEffect(() => {
//   //   // const fetchCartData = async () => {
//   //   try {
//   //     const response = axios.get(
//   //       `${import.meta.env.VITE_MY_APP}user/getCart/${userID}`
//   //     );
//   //     setCartData(response.data); // Set the fetched cart data to state
//   //     console.log("Cartdata:", response.data.items);
//   //   } catch (error) {
//   //     console.error("Error fetching cart data:", error);
//   //   }
//   //   // };

//   //   // Call the function to fetch data
//   // }, []);
//   return (
//     <>
//       <Breadcrumb />
//       {isAuthenticated ? (
//         <>
//           <div className="container">
//             <h4 className="ms-3 mb-5">My Cart</h4>
//             {cd.items > 0 && (
//               <div className="content row px-3 d-md-flex d-none">
//                 <h6 className="col-3">Item</h6>
//                 <h6 className="col">Price</h6>
//                 <h6 className="col">Quantity</h6>
//                 <h6 className="col">Subtotal</h6>
//                 <h6 className="col"></h6>
//               </div>
//             )}
//             <hr />
//             {cd.items > 0 ? (
//               // <Wrapper className="row">
//               //   <div className="title col-md-3 col-4 ">
//               //     {/* <img src={image} alt={title} /> */}
//               //     <br className="d-block d-md-none" />
//               //     <div style={{ width: "200px" }}>
//               //       {/* <h5 className="name">{title}</h5> */}
//               //       {/* <h5 className="price d-block d-md-none">{price} MADG</h5> */}
//               //     </div>
//               //   </div>
//               //   <h5 className="price d-none d-md-block col">
//               //     <FaIndianRupeeSign />
//               //     {price}
//               //   </h5>
//               //   <div className="amount d-none d-md-block col">
//               //     <h5 className="quantity ms-4">{quantity}</h5>
//               //   </div>
//               //   <h5 className="subtotal col-4 col-md">
//               //     <FaIndianRupeeSign />
//               //     {price * quantity}
//               //     {/* {selectedDimension}
//               //   {categorz}
//               //   {thickness}
//               //   {unit} */}
//               //   </h5>
//               //   <button
//               //     className="remove-btn col-4 col-md"
//               //     onClick={() => removeItem(id)}
//               //   >
//               //     <FontAwesomeIcon className="text-danger" icon={faTrash} />
//               //   </button>
//               // </Wrapper>
//               <h1>hi</h1>
//             ) : (
//               <h5 className="text-warning d-flex justify-content-center">
//                 Your Cart is Empty!
//               </h5>
//             )}
//             <hr />
//             <div className="d-flex justify-content-between">
//               <Button handleClick={() => navigate("/products")}>
//                 Continue Shopping
//               </Button>
//               {cd.items > 0 && (
//                 <Button handleClick={() => clearCart()}>Clear Cart</Button>
//               )}
//             </div>
{
  // cd.items > 0 && <CartTotal />;
}
//           </div>
//         </>
//       ) : (
//         <Button
//           className="mx-auto d-flex"
//           handleClick={() => navigate("/userlogin")}
//         >
//           Login
//         </Button>
//       )}
//     </>
//   );
// };

// export default Cart;
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
  const [cd, setCd] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState("");
  console.log("totalPri", total);
  console.log("totalItems", totalItems);
  console.log("cd", cd);
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
    console.log("totalItems", totalItems);

    setTotalItems(totalItems);
  }, [cartdata]);

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
                  className="remove-btn col-4 col-md"
                  onClick={() => removeItem(item.id)}
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
              <Button handleClick={() => clearCart()}>Clear Cart</Button>
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
