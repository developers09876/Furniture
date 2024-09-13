// import { Divider, Table } from "antd";
// import { Col, Row } from "react-bootstrap";
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { styled } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { DashboardContext } from "../../context/DashboardContext";
// // import Button from "../../components/Button";
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import React, { useState } from "react";
// import AddUser from "../users/AddUser";
// import { Button, Modal } from "antd";
// import { currentDate, generateUUID } from "../../utils/helpers";

// // styled components
// const columns = [
//   {
//     title: "Sno",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//   },
//   {
//     title: "Phone",
//     dataIndex: "phone",
//   },
//   {
//     title: "Action",
//     key: "Action",
//     render: (_, record) => (
//       <div>
//         <Row>
//           <Col md={3}>
//             <a>
//               <MdEdit style={{ fontSize: "20px" }} />
//             </a>
//           </Col>
//           <Col md={3}>
//             <a>
//               <MdDelete style={{ fontSize: "20px" }} />
//             </a>
//           </Col>
//         </Row>
//       </div>
//     ),
//   },
// ];
// const data = [
//   {
//     key: "1",
//     name: "Ganesh",
//     email: "user1@gmail.com",
//     phone: "1234567890",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     email: "user2@gmail.com",
//     phone: "2345678901",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     email: "user3@gmail.com",
//     phone: "3456789012",
//   },
// ];
// const StyledUsers = styled.div`
//   margin: 20px;
//   margin-left: 250px;
//   margin-right: auto;
//   width: 100%;
// `;

// const StyledTh = styled.th`
//   padding: 10px 25px !important;
// `;

// const StyledTd = styled.th`
//   padding: 10px 25px !important;
//   font-weight: 400;
// `;

// const Users = () => {
//   // const { users, deleteUser, fetchData } = useContext(DashboardContext);

//   const [Adduser, setAdduser] = useState(false);
//   console.log("Aaddusder", Adduser);
//   const { addUser } = useContext(DashboardContext);
//   const handleclose = () => {
//     setAdduser(false);
//   };

//   const handleAddUser = async (e) => {
//     // e.preventDefault();

//     const { role, name, email, phone, password, confirmPassword } = formData;
//     console.log("formData", formData);
//     // Check if any field is empty
//     if (!name || !email || !phone || !password || !confirmPassword || !role) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please fill in all required fields.",
//       });
//       return;
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Passwords do not match.",
//       });
//       return;
//     }
//   };

//   return (
//     <StyledUsers>
//       {/* <Link className="text-reset text-decoration-none" to={"/admin/users/add"}>
//         <Button className="my-3">Add Users</Button>
//       </Link> */}
//       <div>
//         <Divider style={{ fontSize: "30px" }}>Customers</Divider>
//         <Table columns={columns} dataSource={data} size="middle" />
//       </div>
//       <Button type="primary" onClick={() => setAdduser(true)}>
//         Add User
//       </Button>
//       <Modal
//         centered
//         open={Adduser}
//         onCancel={() => setAdduser(false)}
//         footer={null}
//       >
//         <AddUser setAdduser={false} />
//       </Modal>
//     </StyledUsers>
//   );
// };

// export default Users;

// import { Divider, Table, Modal, Button, Form, Input, Select } from "antd";
// import { Col, Row } from "react-bootstrap";
// import { useContext, useState } from "react";
// import { MdEdit, MdDelete } from "react-icons/md";
// import { DashboardContext } from "../../context/DashboardContext";
// import Swal from "sweetalert2";
// import styled from "styled-components";
// import AddUser from "../users/AddUser";

// const { confirm } = Modal;
// const { Option } = Select;

// const StyledUsers = styled.div`
//   margin: 20px;
//   margin-left: 250px;
//   margin-right: auto;
//   width: 100%;
// `;

// const StyledTh = styled.th`
//   padding: 10px 25px !important;
// `;

// const StyledTd = styled.th`
//   padding: 10px 25px !important;
//   font-weight: 400;
// `;

// const data = [
//   {
//     key: "1",
//     name: "Ganesh",
//     email: "user1@gmail.com",
//     phone: "1234567890",
//     role: "Admin",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     email: "user2@gmail.com",
//     phone: "2345678901",
//     role: "User",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     email: "user3@gmail.com",
//     phone: "3456789012",
//     role: "Manager",
//   },
// ];

// const Users = () => {
//   const { addUser } = useContext(DashboardContext);
//   const [Adduser, setAdduser] = useState(false);
//   const [EditUser, setEditUser] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [form] = Form.useForm();

//   const handleDelete = (record) => {
//     confirm({
//       title: "Are you sure you want to delete this user?",
//       icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
//       content: `Name: ${record.name}`,
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk() {
//         Swal.fire({
//           icon: "success",
//           title: "Deleted!",
//           text: `User ${record.name} has been deleted.`,
//         });

//         console.log("Deleted user:", record);
//       },
//       onCancel() {
//         console.log("Deletion cancelled");
//       },
//     });
//   };

//   const handleEdit = (record) => {
//     setSelectedUser(record);
//     form.setFieldsValue(record);
//     setEditUser(true);
//   };

//   const handleEditSubmit = (values) => {
//     console.log("Edited user data:", values);

//     Swal.fire({
//       icon: "success",
//       title: "Updated!",
//       text: `User ${values.name} has been updated.`,
//     });
//     setEditUser(false);
//   };

//   const columns = [
//     {
//       title: "Sno",
//       dataIndex: "key",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Row>
//           <Col md={3}>
//             <a onClick={() => handleEdit(record)}>
//               <MdEdit style={{ fontSize: "20px", cursor: "pointer" }} />
//             </a>
//           </Col>
//           <Col md={3}>
//             <a onClick={() => handleDelete(record)}>
//               <MdDelete style={{ fontSize: "20px", cursor: "pointer" }} />
//             </a>
//           </Col>
//         </Row>
//       ),
//     },
//   ];

//   return (
//     <StyledUsers>
//       <Divider style={{ fontSize: "30px" }}>Customers</Divider>
//       <Table columns={columns} dataSource={data} size="middle" />
//       <Button type="primary" onClick={() => setAdduser(true)}>
//         Add User
//       </Button>

//       <Modal
//         centered
//         open={Adduser}
//         onCancel={() => setAdduser(false)}
//         footer={null}
//       >
//         <AddUser setAdduser={setAdduser} />
//       </Modal>

//       <Modal
//         title="Edit User"
//         centered
//         open={EditUser}
//         onCancel={() => setEditUser(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setEditUser(false)}>
//             Cancel
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             onClick={() => {
//               form.submit();
//             }}
//           >
//             Save
//           </Button>,
//         ]}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleEditSubmit}
//           initialValues={selectedUser}
//         >
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please enter the name" }]}
//           >
//             <Input placeholder="Enter name" />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: "Please enter the email" }]}
//           >
//             <Input placeholder="Enter email" />
//           </Form.Item>
//           <Form.Item
//             name="phone"
//             label="Phone"
//             rules={[{ required: true, message: "Please enter the phone number" }]}
//           >
//             <Input placeholder="Enter phone number" />
//           </Form.Item>
//           <Form.Item
//             name="role"
//             label="Role"
//             rules={[{ required: true, message: "Please select a role" }]}
//           >
//             <Select placeholder="Select a role">
//               <Option value="Admin">Admin</Option>
//               <Option value="Manager">Manager</Option>
//               <Option value="User">User</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </StyledUsers>
//   );
// };

// export default Users;

import { Divider, Table, Modal, Button, Form, Input, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { DashboardContext } from "../../context/DashboardContext";
import Swal from "sweetalert2";
import styled from "styled-components";
import AddUser from "../users/AddUser";

const { confirm } = Modal;
const { Option } = Select;

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

const initialData = [
  {
    key: "1",
    name: "Ganesh",
    email: "user1@gmail.com",
    phone: "1234567890",
    role: "Admin",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "user2@gmail.com",
    phone: "2345678901",
    role: "User",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "user3@gmail.com",
    phone: "3456789012",
    role: "Manager",
  },
];

const Users = () => {
  const { addUser } = useContext(DashboardContext);
  const [Adduser, setAdduser] = useState(false);
  const [EditUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData); // State to manage table data

  const handleDelete = (record) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setData((prevData) =>
          prevData.filter((item) => item.key !== record.key)
        ); // Remove the user from data

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `User ${record.name} has been deleted.`,
        });

        console.log("Deleted user:", record);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    form.setFieldsValue(record);
    setEditUser(true);
  };

  const handleEditSubmit = (values) => {
    const updatedData = data.map((user) =>
      user.key === selectedUser.key ? { ...user, ...values } : user
    );
    setData(updatedData); // Update the user details in the data

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `User ${values.name} has been updated.`,
    });
    setEditUser(false);
  };

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
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Row>
          <Col md={3}>
            <a onClick={() => handleEdit(record)}>
              <MdEdit style={{ fontSize: "20px", cursor: "pointer" }} />
            </a>
          </Col>
          <Col md={3}>
            <a onClick={() => handleDelete(record)}>
              <MdDelete style={{ fontSize: "20px", cursor: "pointer" }} />
            </a>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <StyledUsers>
      <Divider style={{ fontSize: "30px" }}>Customers</Divider>
      <Table columns={columns} dataSource={data} size="middle" />
      <Button type="primary" onClick={() => setAdduser(true)}>
        Add User
      </Button>

      <Modal
        centered
        open={Adduser}
        onCancel={() => setAdduser(false)}
        footer={null}
      >
        <AddUser setAdduser={setAdduser} />
      </Modal>

      <Modal
        title="Edit User"
        centered
        open={EditUser}
        onCancel={() => setEditUser(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditUser(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={selectedUser}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select a role">
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </StyledUsers>
  );
};

export default Users;
