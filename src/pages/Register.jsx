import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";

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
  const [formData, setFormData] = useState({
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

  const handleRegistration = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (name && email && phone && password && confirmPassword) {
      if (password !== confirmPassword) {
        Swal.fire({
          title: "Error",
          text: "Passwords do not match.",
          icon: "error",
        });
        return;
      }

      if (!passwordValid) {
        Swal.fire({
          title: "Error",
          text: "Password must be at least 10 characters long,one uppercase letter,one lowercase letter,one special character & one digit.",
          icon: "error",
        });
        return;
      }

      try {
        const userData = {
          username: name,
          email: email,
          phoneNumber: phone,
          password: password,
        };

        const response = await axios.post(
          "http://localhost:5000/user/register",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsRegistered(true);

          Swal.fire({
            title: "Registration successful!",
            text: "Redirecting to login...",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/userlogin");
          }, 1500);
        } else {
          Swal.fire({
            title: "Error",
            text: "Registration failed.",
            icon: "error",
          });
        }
      } catch (error) {
        setIsRegistered(false);
        console.error("Error during registration:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred during registration.",
          icon: "error",
        });
      }
    } else {
      setIsRegistered(false);
      Swal.fire({
        title: "Error",
        text: "Please fill in all the fields.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Breadcrumb />
      <StyledHeading>Create Your Account and Start Exploring</StyledHeading>
      <StyledRegister onSubmit={handleRegistration}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {passwordValid && !passwordFocused && (
            <PasswordStrengthMessage isValid={passwordValid}>
              Password is strong.
            </PasswordStrengthMessage>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormChange}
          />
        </div>

        {!isRegistered ? (
          <Button className="mb-4 w-100" type="submit">
            Sign up
          </Button>
        ) : null}
        <p className="text-center">
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/userlogin">
            Login
          </Link>
        </p>
      </StyledRegister>
    </>
  );
};

export default Register;
