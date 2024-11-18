import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { DashboardContext } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// Create the Cart Context
export const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ id: "", user_id: "", items: [] });
  const [userID, setUserID] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { fetchCart, cartdata } = useContext(DashboardContext);
  console.log("cartdata", cartdata);
  const [currentCart, setCurrentCart] = useState([]);
  console.log("currentCarzt", currentCart);

  const addToCart = async (item) => {
    const userID = localStorage.getItem("id");

    if (isAuthenticated) {
      axios
        .post(`${import.meta.env.VITE_MY_API}user/createCart`, {
          id: userID,
          cartItem: {
            productId: item.productId,
            images: item.images,
            title: item.title,
            price: item.price,
            discountPrice: item.discountPrice,
            quantity_stock: item.quantity_stock,
            quantity: item.quantity,
            subTotal: item.subTotal,
            unit: item.unit,
            category: item.category,
            selectedDimension: item.selectedDimension,
            thickness: item.thickness,
          },
        })

        .then((res) => {
          const fetchedCart = res.data.user.Carts;
          setCart((prevCart) => ({
            ...prevCart,
            items: fetchedCart,
          }));
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });

      Swal.fire({
        icon: "success",
        title: "Item added to cart",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchCart();
    } else {
      console.error("User cart is not available");
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      const updatedCart = {
        ...cart,
        items: [],
      };

      const userID = localStorage.getItem("id");
      axios
        .delete(`${import.meta.env.VITE_MY_API}user/clearCart/${userID}`)
        .then((res) => {
          setCart(updatedCart);
          Swal.fire({
            icon: "success",
            title: "Cart cleared",
            showConfirmButton: false,
            timer: 1500,
          });

          fetchCart();
        })
        .catch((error) => {
          console.error("Error clearing cart:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not clear the cart. Please try again.",
          });
        });
    } else {
      console.error("User not authenticated");
    }
  };
  const clearCartssss = async () => {
    if (isAuthenticated) {
      const updatedCart = {
        ...cart,
        items: [],
      };

      const userID = localStorage.getItem("id");
      axios
        .delete(`${import.meta.env.VITE_MY_API}user/clearCart/${userID}`)
        .then((res) => {
          setCart(updatedCart);
          // Swal.fire({
          //   icon: "success",
          //   title: "Cart cleared",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });

          fetchCart();
        })
        .catch((error) => {
          console.error("Error clearing cart:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not clear the cart. Please try again.",
          });
        });
    } else {
      console.error("User not authenticated");
    }
  };

  const removeItem = async (productId) => {
    const userID = localStorage.getItem("id");
    console.log("userID:", userID);
    console.log("productId:", productId);

    axios
      .delete(
        `${import.meta.env.VITE_MY_API}user/deleteCart/${userID}/${productId}`
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Item removed from cart",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchCart();
      })

      // Show success alert
      .catch((error) => {
        console.error("Error removing item from cart:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not remove item from cart. Please try again.",
        });
      });
  };

  useEffect(() => {
    const userID = Cookies.get("userID");
    setUserID(userID);
    if (userID && isAuthenticated) {
      // fetchCart(userID);
    } else {
      setCart({ id: "", user_id: "", items: [] });
    }
  }, [userID, isAuthenticated]);

  // Calculate total

  useEffect(() => {
    const total = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    setTotal(total.toFixed(2));
    setTotalItems(totalItems);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, totalItems, total, addToCart, clearCart, removeItem, clearCartssss }}
    >
      {children}
    </CartContext.Provider>
  );
};
