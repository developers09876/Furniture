import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { Container, Form, Spinner, Alert } from "react-bootstrap";
import Password from "antd/es/input/Password";

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
      height: "auto",
    },
  };

  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

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
        `${import.meta.env.VITE_MY_API}user/resetUser`,
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
        "No account found with this email. Please sign up or enter Correct email..."
      );
      console.error("Error checking email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Reset Your Password</h2>
        {isEmailSubmitted ? (
          <Alert variant="success">Email found! Check your inbox.</Alert>
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
