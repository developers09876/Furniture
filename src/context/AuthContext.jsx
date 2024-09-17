import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserIDState] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const storedIsAuthenticated = Cookies.get("isLoggedIn");
    if (storedIsAuthenticated === "true") {
      setIsAuthenticated(true);
    }

    const storedIsAdmin = Cookies.get("isAdmin");
    if (storedIsAdmin === "true") {
      setIsAdmin(true);
    }
    const storedIsUser = Cookies.get("isUser");
    if (storedIsUser === "true") {
      setIsUser(true);
    }

    const storedUserID = Cookies.get("userID");
    if (storedUserID) {
      setUserIDState(storedUserID);
    }
  }, []);

  const setUserID = (id) => {
    setUserIDState(id);
    Cookies.set("userID", id, { expires: 1 });
  };

  const login = async (email, password) => {
    console.log("emailzz", email, password);
    try {
      // const response = await fetch('http://localhost:3000/users');
      // const users = await response.json(

      // const user = users.find(
      //   () => "abcd@123" === email && 12345 === password
      // );

      if (email && password) {
        setIsAuthenticated(true);
        setUserID(1);
        Cookies.set("isLoggedIn", "true", { expires: 1 });

        // Check if the user is an admin
        if (email == "abcd@123") {
          setIsAdmin(true);
          Cookies.set("isAdmin", "true", { expires: 1 });
        } else {
          setIsAdmin(false);
        }

        console.log("adin", isAdmin);

        setError(null);
        return true;
      } else {
        setIsAuthenticated(false);
        Cookies.set("isLoggedIn", "false");
        setError("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while logging in:", error);
      return false;
    }
  };


  const loginUser = async (email, password) => {
    console.log("emailzzuser", email, password);
  
    const userData = {
      email: email,
      password: password,
    };
  
    try {
      if (email && password) {
        const res = await axios.post(
          'http://localhost:5000/user/login',
          userData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        setIsAuthenticated(true);
        setUserID(res.data.data._id);
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        setIsUser(true);
        Cookies.set("isUser", "true");
        localStorage.setItem("token", res.data.token); 
        localStorage.setItem("id", res.data.data.id); 
        localStorage.setItem("name", res.data.data.username); // Make sure to use res.data.Token
        return true; 
      } else {
        setIsAuthenticated(false);
        Cookies.set("isLoggedIn", "false");
        setError("Invalid email or password");
        return false; 
      }
    } catch (error) {
      console.log("Error occurred while logging in:", error);
      return false; 
    }
  };  
 
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false); // Reset isAdmin state on logout
    setIsUser(false); // Reset isUser state on logout
    Cookies.remove("isLoggedIn");
    Cookies.remove("isAdmin");
    Cookies.remove("isUser");
    Cookies.remove("userID");
    localStorage.removeItem("token")
    localStorage.removeItem("id")

    localStorage.removeItem("name")

    Swal.fire({
      title: "Logout successful!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  };
  console.log("logout check", isAdmin);
  console.log("logout check", isUser);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isUser,
        userID,
        login,
        logout,
        error,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
