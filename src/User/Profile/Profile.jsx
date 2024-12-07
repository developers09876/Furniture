import { Divider, Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

const { confirm } = Modal;

const StyledProfile = styled.div`
  margin: 20px;
  margin-left: 50px;
  margin-right: auto;
  width: 100%;
`;

const initialData = [
  {
    key: "1",
    name: "",
    email: "",
    phonenumber: "",
    password: "",
  },
];

function Profile() {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [UserData, setUserData] = useState("");
  console.log("UserData", UserData);
  const userId = localStorage.getItem("id");
  console.log("userIdP", userId);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        confirm({
          title: `Want to update ${UserData.username}?`,
          okText: "Yes",
          cancelText: "No",
          onOk() {
            updateRecordFromAPI();
          },
          onCancel() {
            console.log("Update cancelled");
          },
        });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please correct the errors in the form!",
        });
      });
  };

  const updateRecordFromAPI = async () => {
    axios
      .post(`${import.meta.env.VITE_MY_API}user/update/${userId}`, UserData)
      .then((res) => {
        setData(res.data);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `User has been updated successfully.`,
        });
      })

      .catch((error) => {
        console.error("Error updating user:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error updating the user. Please try again.",
        });
      });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  const fetchUser = async () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}user/getUser/${userId}`)
      .then((response) => {
        setUserData(response.data.data);
        form.setFieldsValue({
          name: response.data.data.username,
          email: response.data.data.email,
          phonenumber: response.data.data.phoneNumber,
        });
      })

      .catch((error) => {
        handleOperationError("product", "adding");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <StyledProfile>
      <Divider style={{ fontSize: "30px" }}>Profile</Divider>

      <Form
        style={{ marginLeft: "250px", width: "70%" }}
        form={form}
        layout="vertical"
      >
        <Row>
          <Col xs={12} sm={6}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your name!" },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: "Name should only contain alphabets and spaces!",
                },
              ]}
            >
              <Input
                onChange={(e) =>
                  setUserData({ ...UserData, username: e.target.value })
                }
                required
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <Form.Item
              label="Phone Number"
              name="phonenumber"
              rules={[
                {
                  required: true,
                  pattern: /^[6-9]\d{9}$/,
                  message: "Please Enter Valid Phone Number!",
                },
              ]}
            >
              <Input
                type="number"
                addonBefore="+91"
                onChange={(e) =>
                  setUserData({ ...UserData, phoneNumber: e.target.value })
                }
                // required
                maxLength={10} //
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Button type="primary" onClick={(values) => handleUpdate(values)}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </StyledProfile>
  );
}

export default Profile;
