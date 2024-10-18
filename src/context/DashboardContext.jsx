import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [neworder, setnewOrder] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // try {
    //   const usersResponse = await axios.get("http://localhost:3000/users");
    //   setUsers(usersResponse.data);

    //   const ordersResponse = await axios.get("http://localhost:3000/orders");
    //   setOrders(ordersResponse.data);

    //   const categoriesResponse = await axios.get(
    //     "http://localhost:3000/categories"
    //   );
    //   setCategories(categoriesResponse.data);

    //   const productsResponse = await axios.get(
    //     "http://localhost:3000/products"
    //   );
    //   setProducts(productsResponse.data);
    // } catch (error) {
    //   // showAlert('error', 'Error', 'Error while fetching data')
    // }

    try {
      const res = await axios.get(`${import.meta.env.VITE_MY_API}user/get`);
      console.log("res", res);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MY_API}products/order`
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MY_API}products/`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
    });
  };

  const handleOperationError = (dataType, operation) => {
    showAlert(
      "error",
      "Error",
      `An error occurred while ${operation} ${dataType}. Please try again.`
    );
  };

  // Users
  const addUser = async (newUser) => {
    // Check if the email or phone is already used
    const emailExists = users.some((user) => user.email === newUser.email);
    const phoneExists = users.some((user) => user.phone === newUser.phone);

    if (emailExists || phoneExists) {
      showAlert("error", "User Not Added", "Email or phone already in use.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}users`,
        newUser
      );
      setUsers([...users, response.data]);
      showAlert("success", "User Added", "User added successfully.");
      // Create a cart for the new user
      try {
        await axios.post(`${import.meta.env.VITE_MY_API}carts`, {
          id: newUser.id,
          user_id: newUser.id,
          items: [],
        });
      } catch (error) {
        console.error("Error :", error);
      }
      // Create a wishlist for the new user
      try {
        await axios.post(`${import.meta.env.VITE_MY_API}wishlists`, {
          id: newUser.id,
          user_id: newUser.id,
          items: [],
        });
      } catch (error) {
        console.error("Error :", error);
      }
    } catch (error) {
      handleOperationError("user", "adding");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Confirmation",
        text: "Are you sure you want to delete this user?",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_MY_API}users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        showAlert("success", "User Deleted", "User deleted successfully.");
      }
    } catch (error) {
      handleOperationError("user", "deleting");
    }
  };

  // Orders
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_MY_API}orders/${orderId}`, {
        order_status: newStatus,
      });
      fetchData();
    } catch (error) {
      handleOperationError("order", "updating status");
    }
  };

  // Categories
  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}categories`,
        newCategory
      );
      setCategories([...categories, response.data]);
      showAlert("success", "Category Added", "Category added successfully.");
    } catch (error) {
      handleOperationError("category", "adding");
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Confirmation",
        text: "Are you sure you want to delete this category?",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_MY_API}categories/${categoryId}`
        );
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
        showAlert(
          "success",
          "Category Deleted",
          "Category deleted successfully."
        );
      }
    } catch (error) {
      handleOperationError("category", "deleting");
    }
  };

  const updateCategory = async (categoryId, updatedCategory) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_MY_API}categories/${categoryId}`,
        updatedCategory
      );
      fetchData();
      showAlert(
        "success",
        "Category Updated",
        "Category updated successfully."
      );
    } catch (error) {
      handleOperationError("category", "updating");
    }
  };

  // Products
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}products`,
        newProduct
      );
      setProducts([...products, response.data]);
      showAlert("success", "Product Added", "Product added successfully.");
    } catch (error) {
      handleOperationError("product", "adding");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Confirmation",
        text: "Are you sure you want to delete this product?",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_MY_API}products/${productId}`
        );
        setProducts(products.filter((product) => product.id !== productId));
        showAlert(
          "success",
          "Product Deleted",
          "Product deleted successfully."
        );
      }
    } catch (error) {
      handleOperationError("product", "deleting");
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_MY_API}products/${productId}`,
        updatedProduct
      );
      fetchData();
      showAlert("success", "Product Updated", "Product updated successfully.");
    } catch (error) {
      handleOperationError("product", "updating");
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        fetchData,
        users,
        addUser,
        deleteUser,
        // newOrder,
        orders,
        updateOrderStatus,
        categories,
        addCategory,
        deleteCategory,
        updateCategory,
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
