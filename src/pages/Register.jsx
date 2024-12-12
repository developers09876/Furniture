import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";

const StyledRegister = styled.form`
  max-width: 350px;
  margin: 10px auto;
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin: 3.5rem 0;
`;

const PasswordStrengthMessage = styled.p`
  color: ${({ isValid }) => (isValid ? "green" : "red")};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordValid(passwordRegex.test(value));
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, phone, password } = data;

    try {
      const userData = {
        username: name,
        email,
        phoneNumber: phone,
        password,
      };

      await axios.post(
        `${import.meta.env.VITE_MY_API}user/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsRegistered(true);

      Swal.fire({
        title: "Registration successful!",
        text: "Redirecting to login...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 1500);

      reset(); // Clear the form after submission
    } catch (error) {
      setIsRegistered(false);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };
  return (
    <>
      <Breadcrumb />
      <StyledHeading>Create Your Account and Start Exploring</StyledHeading>
      <StyledRegister onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            placeholder="Name"
            type="text"
            className="form-control"
            id="name"
            {...register("name", {
              required: "Name is required",
              validate: (value) =>
                /^[a-zA-Z\s]+$/.test(value) ||
                "Name must not contain special characters or numbers",
            })}
          />
          {errors.name && (
            <p style={{ color: "red" }} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
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
              <Input {...field} id="email" placeholder="Email address" />
            )}
          />
          {errors.email && (
            <p style={{ color: "red" }} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            placeholder="Phone Number"
            type="text" // Use text to avoid issues with leading zeroes
            className="form-control"
            id="phone"
            maxLength="10" // Restrict input to 10 characters
            {...register("phone", {
              required: "Phone Number is required",
              // validate: (value) =>
              //   / `^[0-9]+$/.test(value) || "Only Numbers Are Allowed",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "10 digits Number Only Allowed",
              },
            })}
          />

          {errors.phone && (
            <p style={{ color: "red" }} role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: {
                validFormat: (value) =>
                  passwordRegex.test(value) ||
                  "Password must be at least 10 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one digit",
              },
            }}
            render={({ field }) => (
              // <Input {...field} id="email" placeholder="Email address" />
              <Input.Password
                {...field}
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  field.onChange(e);
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
          {errors.password && (
            <p style={{ color: "red" }} role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match.",
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  field.onChange(e);
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }} role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button className="mb-4 w-100" type="submit">
          Sign up
        </Button>
      </StyledRegister>
    </>
  );
};

export default Register;
