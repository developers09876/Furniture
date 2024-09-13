import { Divider, Table } from "antd";
import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DashboardContext } from "../../context/DashboardContext";
// import Button from "../../components/Button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import React, { useState } from "react";
import AddUser from "../users/AddUser";
import { Button, Modal } from "antd";
import { currentDate, generateUUID } from "../../utils/helpers";

// styled components
const columns = [
  {
    title: "Sno",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Action",
    key: "Action",
    render: (_, record) => (
      <div>
        <Row>
          <Col md={3}>
            <a>
              <MdEdit style={{ fontSize: "20px" }} />
            </a>
          </Col>
          <Col md={3}>
            <a>
              <MdDelete style={{ fontSize: "20px" }} />
            </a>
          </Col>
        </Row>
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "Ganesh",
    email: "user1@gmail.com",
    phone: "1234567890",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "user2@gmail.com",
    phone: "2345678901",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "user3@gmail.com",
    phone: "3456789012",
  },
];
const StyledUsers = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const StyledTh = styled.th`
  padding: 10px 25px !important;
`;

const StyledTd = styled.th`
  padding: 10px 25px !important;
  font-weight: 400;
`;

const Users = () => {
  // const { users, deleteUser, fetchData } = useContext(DashboardContext);

  const [Adduser, setAdduser] = useState(false);
  console.log("Aaddusder", Adduser);
  const { addUser } = useContext(DashboardContext);
  const handleclose = () => {
    alert("vantew");
    setAdduser(false);
  };

  const handleAddUser = async (e) => {
    // e.preventDefault();

    const { role, name, email, phone, password, confirmPassword } = formData;
    console.log("formData", formData);
    // Check if any field is empty
    if (!name || !email || !phone || !password || !confirmPassword || !role) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match.",
      });
      return;
    }
  };

  return (
    <StyledUsers>
      {/* <Link className="text-reset text-decoration-none" to={"/admin/users/add"}>
        <Button className="my-3">Add Users</Button>
      </Link> */}
      <div>
        <Divider style={{ fontSize: "30px" }}>Customers</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
      </div>
      <Button type="primary" onClick={() => setAdduser(true)}>
        Add User
      </Button>
      <Modal
        centered
        open={Adduser}
        onCancel={() => setAdduser(false)}
        footer={null}
      >
        <AddUser setAdduser={handleclose} />
      </Modal>
    </StyledUsers>
  );
};

export default Users;
