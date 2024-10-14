import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { Form, Spinner, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserResetPassword = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      backgroundColor: "#f1f1f1",
    },
    form: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      width: "40%",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "38px",
      cursor: "pointer",
    },
    formGroup: {
      position: "relative",
    },
  };

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation
  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle email submission for verification
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_MY_API}user/resetUsers`,
        { email }
      );
      if (response.data.status === "Successful") {
        setIsEmailSubmitted(true);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        "No account found with this email. Please sign up or enter the correct email."
      );
      console.error("Error checking email:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.put(
        ` ${import.meta.env.VITE_MY_API}user/resetUser/`,
        { email, newPassword, confirmPassword }
      );
      console.log("response", response);
      if (response.data.status === "Successful") {
        setSuccessMessage("Password successfully reset!");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while resetting the password.");
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle visibility of new password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle visibility of confirm password
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Reset Your Password</h2>

        {successMessage ? (
          <Alert variant="success">{successMessage}</Alert>
        ) : isEmailSubmitted ? (
          <>
            <Alert variant="success">Email found! Enter a new password.</Alert>
            <Form onSubmit={handlePasswordReset}>
              <Form.Group controlId="formNewPassword" style={styles.formGroup}>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>

              <Form.Group
                controlId="formConfirmPassword"
                style={styles.formGroup}
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  style={styles.eyeIcon}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <center>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="mt-3"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Loading...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </center>
            </Form>
          </>
        ) : (
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <center>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="mt-3"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </center>
          </Form>
        )}
      </div>
    </div>
  );
};

export default UserResetPassword;