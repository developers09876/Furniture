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
  const { isAuthenticated, loginUser, error, userName } =
    useContext(AuthContext);
  const { fetchCart, fetchWhishlist } = useContext(DashboardContext);
  const navigate = useNavigate();

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
        Swal.fire({
          icon: "success",
          title: `Login successful!`,
          showConfirmButton: false,
          timer: 1500,
        });

        fetchCart();
        fetchWhishlist();

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
                    /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                      value
                    ) || "Invalid email format",
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
                  ) || "Login Credentials Invalid",
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
