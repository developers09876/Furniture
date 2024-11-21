// import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Breadcrumb from "../components/Breadcrumb";
// import { Input, Space } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

// import {
//   LoadingOutlined,
//   SmileOutlined,
//   SolutionOutlined,
//   UserOutlined,
// } from "@ant-design/icons";

// // styled components
// const StyledLogin = styled.div`
//   max-width: 350px;
//   margin: 10px auto;
// `;

// const StyledHeading = styled.h1`
//   text-align: center;
//   margin: 5rem 0;
// `;

// const UserLogin = () => {
//   const { isAuthenticated, loginUser, error } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [passwordField, setPasswordField] = useState(false);
//   const navigate = useNavigate();
//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (!validateEmail(email && password)) {
//       try {
//         const success = await loginUser(email, password);

//         if (success) {
//           // Display success message using SweetAlert
//           Swal.fire({
//             icon: "success",
//             title: "Login successful!",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           // Redirect to the home page after a delay
//           setTimeout(() => {
//             navigate("/");
//           }, 1500);
//         } else {
//           // Display error message using SweetAlert
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Incorrect email or password. Please try again.",
//           });
//         }
//       } catch (error) {
//         console.error("Error occurred during login:", error);
//       }
//     } else {
//       // Display error message for incomplete fields
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please fill in all the fields.",
//       });
//     }
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);
//   return (
//     <>
//       <Breadcrumb />
//       <StyledHeading>Welcome Back! Log in to Your Account</StyledHeading>
//       <StyledLogin>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="form1" className="form-label">
//               Email address
//             </label>
//             <input
//               placeholder="Email adress"
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="form2" className="form-label">
//               Password
//             </label>
//             <Space direction="vertical" />
//             <Input.Password
//               style={{ height: "38px" }}
//               placeholder="Password"
//               name="password"
//               id="password"
//               value={formData.password}
//               onChange={handleFormChange}
//               iconRender={(visible) =>
//                 visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//               }
//             />
//           </div>

//           {/* <div className="mb-4">
//             <label htmlFor="form2" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleFormChange}
//             />
//           </div> */}

//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {!isAuthenticated && (
//             <Button className="mb-4 w-100" type="submit">
//               Sign in
//             </Button>
//           )}

//           <div>
//             <p className="text-center" style={{ cursor: "pointer" }}>
//               <Link to="/reset" style={{ textDecoration: "none" }}>
//                 Forgot Password
//               </Link>
//             </p>
//           </div>
//           <p className="text-center">
//             Not a member?{" "}
//             <Link to="/register" style={{ textDecoration: "none" }}>
//               Register
//             </Link>
//           </p>
//         </form>
//       </StyledLogin>
//     </>
//   );
// };

// export default UserLogin;

import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import { DashboardContext } from "../context/DashboardContext";

// Styled components
const StyledLogin = styled.div`
  max-width: 350px;
  margin: 10px auto;
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin: 5rem 0;
`;

const UserLogin = () => {
  const { isAuthenticated, loginUser, error } = useContext(AuthContext);
  const { fetchCart, whishlistData } = useContext(DashboardContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart;
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const success = await loginUser(email, password);
      if (success) {
        await fetchCart();
        await whishlistData();
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Incorrect email or password. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Breadcrumb />
      <StyledHeading>Welcome Back! Log in to Your Account</StyledHeading>
      <StyledLogin>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                validate: {
                  validFormat: (value) =>
                    /\S+@\S+\.\S+/.test(value) || "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  placeholder="Email address"
                  status={errors.email ? "error" : ""}
                />
              )}
            />
            {errors.email && (
              <p style={{ color: "red" }} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                validate: (value) =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
                    value
                  ) || "Password must be at least 10 characters ",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="password"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  status={errors.password ? "error" : ""}
                />
              )}
            />
            {errors.password && (
              <p className="mt-2" style={{ color: "red" }} role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="mt-2" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {!isAuthenticated && (
            <Button className="mb-4 w-100" type="submit">
              Sign in
            </Button>
          )}

          <div>
            <p className="text-center" style={{ cursor: "pointer" }}>
              <Link to="/reset" style={{ textDecoration: "none" }}>
                Forgot Password
              </Link>
            </p>
          </div>
          <p className="text-center">
            Not a member?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </p>
        </form>
      </StyledLogin>
    </>
  );
};

export default UserLogin;
