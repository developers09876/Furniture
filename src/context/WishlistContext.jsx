import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { DashboardContext } from "./DashboardContext";

// Create the Wishlist Context
export const WishlistContext = createContext();

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  console.log("children", children);
  const [wishlist, setWishlist] = useState({ id: "", user_id: "", items: [] });
  const { isAuthenticated, userID } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [Whistlist, setWhistlist] = useState();
  console.log("wishlist", wishlist);
  const { fetchWhishlist } = useContext(DashboardContext);
  const fetchWishlist = async (userId) => {
    try {
      if (isAuthenticated) {
        const response = await axios.get(
          `${import.meta.env.VITE_MY_API}wishlists?user_id=${userId}`
        );
        const fetchedWishlist = response.data[0];
        setWishlist(fetchedWishlist);
        setTotal(fetchedWishlist.items.length);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist({ id: "", user_id: "", items: [] });
      setTotal(0);
    }
  };

  const addToWishlist = async (item) => {
    const userID = localStorage.getItem("id");

    try {
      if (isAuthenticated) {
        const response = await axios.post(
          `${import.meta.env.VITE_MY_API}user/createWhishlist`,
          {
            id: userID,
            whistItem: {
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
          }
        );

        const fetchedCart = response.data.user.Carts;
        setWhistlist((prevCart) => ({
          ...prevCart,
          items: fetchedCart,
        }));

        Swal.fire({
          icon: "success",
          title: "Item added to Whishlist",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchWhishlist();
      } else {
        console.error("User Whishlist is not available");
      }
    } catch (error) {
      console.error("Error adding item to Whishlist:", error);
    }
  };

  const clearWishlist = async () => {
    const userId = localStorage.getItem("id");
    axios
      .delete(`${import.meta.env.VITE_MY_API}user/clearWhishlist/${userId}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Wishlist cleared",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchWhishlist();
      })

      .catch((error) => {
        console.error("Error clearing wishlist:", error);
      });
  };

  const removeItem = async (productId) => {
    const userId = localStorage.getItem("id");

    axios
      .delete(
        `${
          import.meta.env.VITE_MY_API
        }user/deleteWhishlist/${userId}/${productId}`
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Item removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchWhishlist();
      })

      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
  };

  useEffect(() => {
    if (userID && isAuthenticated) {
    } else {
      setWishlist({ id: "", user_id: "", items: [] });
    }
  }, [userID, isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{
        // wishlist,
        total,
        addToWishlist,
        clearWishlist,
        removeItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
