import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
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
    console.log("Stored userID from cookie:", storedUserID);
    if (storedUserID) {
      setUserIDState(storedUserID);
    }
  }, []);

  const setUserID = (id) => {
    console.log("Setting userID:", id);
    setUserIDState(id);
    Cookies.set("userID", id, { expires: 1 });
  };

  const login = async (email, password) => {
    console.log("emailzz", email, password);
    const userData = {
      email: email,
      password: password,
    };
    try {
      // const response = await fetch('http://localhost:3000/users');
      // const users = await response.json(

      // const user = users.find(
      //   () => "abcd@123" === email && 12345 === password
      // );

      if (email == "rajan@gmail.com" && password == "12345") {
        // const res = await axios.post(
        //   'http://localhost:5000/admin/login',
        //   userData,
        //   {
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
        // if(res){
        setIsAuthenticated(true);
        setUserID(1);
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        setIsAdmin(true);
        Cookies.set("isAdmin", "true", { expires: 1 });
        setError(null);
        return true;
        // }else{
        //   setIsAuthenticated(false);
        //   Cookies.set("isLoggedIn", "false");
        //   setError("Something went wrong");
        //   return false;
        // }
      } else {
        setIsAdmin(false);
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
    const userData = {
      email: email,
      password: password,
    };

    try {
      if (email && password) {
        const res = await axios.post(
          `${import.meta.env.VITE_MY_API}user/login`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          console.log("resqwe", res);
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
          setError("Something went wrong");
          return false;
        }
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
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");

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
