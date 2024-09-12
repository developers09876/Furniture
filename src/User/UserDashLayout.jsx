import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import UserSidebar from "./UserSidebar";

const UserDashboardLayout = () => {
  const { isUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isUser);

  useEffect(() => {
    !isUser && navigate("/");
  }, [isUser]);

  return (
    <div className="d-flex">
      <UserSidebar />
      <Outlet />
    </div>
  );
};

export default UserDashboardLayout;
