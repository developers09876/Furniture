import { Input, Space } from "antd";
import React, { useState } from "react";
import Button from "../components/Button";

const UserResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email...
    try {
      const response = await axios.post("http://localhost:5000/User/get", {
        email,
      });
      if (response.data.exists) {
        setIsEmailSubmitted(true);
      } else {
        alert("This email is not registered.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  // const handleEmailSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateEmail(email)) {
  //     alert("Please enter a valid email address");
  //     return;
  //   }

  //   // else {
  //   //   alert("Please enter a valid email address");
  //   // }

  //   // try {
  //   //   const response = await axios.post("http://localhost:5000/user/register", {
  //   //     email,
  //   //   });
  //   //   if (response.data.exists) {
  //   //     setIsEmailSubmitted(true);
  //   //   } else {
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error checking email:", error);
  //   //   alert("An error occurred. Please try again.");
  //   // }

  //   try {
  //     const response = await axios.post("http://localhost:5000/user/register", {
  //       email,
  //     });

  //     // Checking the response data
  //     if (response.data.exists) {
  //       // Email exists in the system, proceed to the next step
  //       setIsEmailSubmitted(true);
  //       alert("Email found! Proceeding to the next step.");
  //     } else {
  //       // Email does not exist
  //       alert(
  //         "This email is not registered in our system. Please try again or register a new account."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error checking email:", error);

  //     if (error.response) {
  //       const status = error.response.status;
  //       const message = error.response.data?.message || "An error occurred.";

  //       if (status === 500) {
  //         alert("Server error occurred. Please try again later.");
  //       } else if (status === 404) {
  //         alert("API endpoint not found. Please check the URL.");
  //       } else {
  //         alert(message);
  //       }
  //     } else {
  //       alert(
  //         "Network error occurred. Please check your connection and try again."
  //       );
  //     }
  //   }
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={isEmailSubmitted ? handleFormSubmit : handleEmailSubmit}
        style={styles.form}
      >
        <center>
          <h4>Reset</h4>
        </center>

        {!isEmailSubmitted && (
          <>
            <div className="mb-4">
              <div className="mb-4">
                <label>Enter your email </label>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <center>
              <Button>Next</Button>
            </center>
          </>
        )}

        {isEmailSubmitted && (
          <>
            <div className="mb-4">
              <label htmlFor="form2" className="form-label">
                Password
              </label>
              <Space direction="vertical" />
              <Input
                className="form-control"
                style={{ height: "38px" }}
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Enter your Confirm Password </label>
              <Space direction="vertical" />
              <Input
                className="form-control"
                style={{ height: "38px" }}
                placeholder="Confirm Password"
                name="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <center>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </center>
          </>
        )}
      </form>
    </div>
  );
};

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
    height: "50vh",
  },
};

export default UserResetPassword;
