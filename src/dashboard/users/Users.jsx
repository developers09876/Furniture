import { Divider, Table, Modal, Button, Form, Input, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { DashboardContext } from "../../context/DashboardContext";
import Swal from "sweetalert2";
import styled from "styled-components";
import AddUser from "../users/AddUser";
import axios from "axios";

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

const Users = () => {
  const { addUser } = useContext(DashboardContext);
  const [Adduser, setAdduser] = useState(false);
  const [EditUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  // <<<<<<<<< Temporary merge branch
  // const [data, setData] = useState(initialData);
  // =========
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/User/get");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, []);

  const deleteRecordFromAPI = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/delete/${id}`
      );

      if (response.status === 200) {
        // Remove the user from the local state (filtered by _id from the API)
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the user. Please try again.",
      });
    }
  };

  const handleDelete = (record) => {
    confirm({
      title: `Are you sure you want to delete ${record.username}?`,
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.username}`, // Show the name of the user dynamically
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRecordFromAPI(record._id); // Use the _id to call the API for deletion
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

  const handleEditSubmit = (record) => {
    confirm({
      title: `Are you sure you want to update ${record.username}?`,
      icon: <MdEdit style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.username}`, 
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        editRecordFromAPI(selectedUser._id, record); // Pass the updated values and ID
      },
      onCancel() {
        console.log("Edit cancelled");
      },
    });
  };

  const editRecordFromAPI = async (id, record) => {
    try {
      await axios
        .post(`http://localhost:5000/user/update/${id}`, record)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `User has been updated successfully.`,
          });

          // Update the user details in the local state
          const updatedUsers = users.map((user) =>
            user._id === id ? { ...user, ...record } : user
          );
          setUsers(updatedUsers);

          // Close the edit modal
          setEditUser(false);
        });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the user. Please try again.",
      });
    }
  };

  const columns = [
    {
      title: "Sno",
      render: (i, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
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
            <MdEdit
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => handleEdit(record)}
            />
          </Col>
          <Col md={3}>
            <MdDelete
              style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
              onClick={() => handleDelete(record)}
            />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <StyledUsers>
      <Divider style={{ fontSize: "30px" }}>Customers</Divider>
      <Table columns={columns} dataSource={users} size="middle" />

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
          <Button key="submit" type="primary" onClick={() => form.submit()}>
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
            name="username"
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
            name="phoneNumber"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          {/* <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select a role">
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </StyledUsers>
  );
};

export default Users;
