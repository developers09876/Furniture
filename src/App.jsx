// Styled Components - Theme Provider
import { ThemeProvider } from "styled-components";

// contexts
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { DashboardProvider } from "./context/DashboardContext";

// react router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";
import Contact from "./pages/Contact";

// dashboard
import Dashboard from "./dashboard/Dashboard";
import UserDashboard from "./dashboard/Dashboard";
import ProductsDashboard from "./dashboard/products/ProductsDashboard";
import AddProduct from "./dashboard/products/AddProduct";
import EditProduct from "./dashboard/products/EditProduct";
import Users from "./dashboard/users/Users";
import AddUser from "./dashboard/users/AddUser";
import Categories from "./dashboard/categories/Categories";
import AddCategory from "./dashboard/categories/AddCategory";
import EditCategory from "./dashboard/categories/EditCategory";
import Orders from "./dashboard/orders/Orders";
import OrderDetails from "./dashboard/orders/OrderDetails";

// layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import UserDashboardLayout from "./User/UserDashLayout";

//user

import UserProductDashboard from "./User/UserProducts/UserProductsDashboard";
import UserAddProduct from "./User/UserProducts/UserAddProduct";
import UserEditProduct from "./User/UserProducts/UserEditProduct";
import UserCategories from "./User/UserCategories/Categories";
import UserAddCategory from "./User/UserCategories/UserAddCategory";
import UserOrders from "./User/UserOrders/UserOrders";
import UserOrderDetails from "./User/UserOrders/UserOrderDetails";
import UserAddUser from "./User/Users/UserAddUser";
import UserUsers from "./User/Users/User_Users";
import UserLogin from "./User/UserLogin";

// router

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:productID" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route element={<AuthRoute />}>
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userlogin" element={<UserLogin />} />
        </Route>
        <Route path="*" exact element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductsDashboard />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/orders/:id" element={<OrderDetails />} />
      </Route>
      <Route path="/user" element={<UserDashboardLayout />}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/products" element={<UserProductDashboard />} />
        <Route path="/user/products/add" element={<UserAddProduct />} />
        <Route path="/user/products/edit/:id" element={<UserEditProduct />} />
        <Route path="/user/users" element={<UserUsers />} />
        <Route path="/user/users/add" element={<UserAddUser />} />
        <Route path="/user/categories" element={<UserCategories />} />
        <Route path="/user/categories/add" element={<UserAddCategory />} />
        <Route path="/user/categories/edit/:id" element={<UserEditProduct />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/orders/:id" element={<UserOrderDetails />} />
      </Route>

      <Route path="*" exact element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  // global thmeme
  const theme = {
    mainColor: "#ff5921",
    mainColorLight: "#FF9800",
    mainColorLighter: "#e1dbd3",
    textColor: "#474747",

    bgDark: "#1f1a1a",
    borderColor: "#ffd7ba",
    headingColor: "#2a2828",
    buttonBg: "#ff9800",
    buttonText: "#ffffff",
    transition: "all 0.3s ease-in-out",
    raduis: ".3rem",
    footerHeadingColor: "#1D1D1D",
    footerText: "#e7e0da",
  };

  return (
    <AuthProvider>
      <DashboardProvider>
        <CartProvider>
          <WishlistProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router}></RouterProvider>
            </ThemeProvider>
          </WishlistProvider>
        </CartProvider>
      </DashboardProvider>
    </AuthProvider>
  );
};

export default App;
