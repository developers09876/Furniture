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

import UserOrders from "./User/UserOrders/UserOrders";
import UserOrderDetails from "./User/UserOrders/UserOrderDetails";
import UserLogin from "./User/UserLogin";
import Whistlist from "./User/Whistlist/Whistlist";
import Profile from "./User/Profile/Profile";

// import Testing from "./Ar/view";
// router
import Model from "./Ar/component/xr-gallery/XrGalleryContainer";
import Sofas from "./Ar/component/Sofa";
import Test from "./Ar/view";
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
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/orders/:id" element={<UserOrderDetails />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/whistlist" element={<Whistlist />} />
      </Route>

      <Route path="*" exact element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/chair1" element={<Model />} />
      <Route path="/chair2" element={<Model />} />
      <Route path="/table1" element={<Model />} />
      <Route path="/table2" element={<Model />} />
      <Route path="/table3" element={<Model />} />
      <Route path="/table4" element={<Model />} />
      <Route path="/table5" element={<Model />} />
      <Route path="/sofa1" element={<Model />} />
      <Route path="/sofa2" element={<Model />} />
      <Route path="/sofa3" element={<Model />} />
      <Route path="/sofa4" element={<Model />} />
      <Route path="/sofa5" element={<Model />} />
      <Route path="/sofa6" element={<Model />} />
      <Route path="/sofa7" element={<Model />} />
      <Route path="/lamp1" element={<Model />} />
      <Route path="/lamp2" element={<Model />} />
      <Route path="/kitchen1" element={<Model />} />
      <Route path="/elevator1" element={<Model />} />
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
