import { Divider, Form, Input, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

const { TextArea } = Input;
const { confirm } = Modal;

const StyledProfile = styled.div`
  margin: 20px;
  margin-left: 50px;
  margin-right: auto;
  width: 100%;
`;

function Profile() {
  const [form] = Form.useForm();
  const [UserData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address_details: [{ pincode: "", address: "" }],
  });

  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MY_API}user/getUser/${userId}`
      );
      const user = data.data || {};
      const defaultAddress = { pincode: "", address: "" };

      const userData = {
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address_details: user.address_details?.length
          ? user.address_details
          : [defaultAddress],
      };

      setUserData(userData);
      form.setFieldsValue({
        name: userData.username,
        email: userData.email,
        phonenumber: userData.phoneNumber,
        pincode: userData.address_details[0]?.pincode,
        address: userData.address_details[0]?.address,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then(() => {
        confirm({
          title: `Want to update ${UserData.username}?`,
          okText: "Yes",
          cancelText: "No",
          onOk() {
            updateRecordFromAPI();
          },
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please correct the errors in the form!",
        });
      });
  };

  const updateRecordFromAPI = async () => {
    const details = {
      username: UserData.username,
      email: UserData.email,
      phoneNumber: UserData.phoneNumber,
      pincode: UserData?.address_details?.[0]?.pincode,
      address: UserData?.address_details?.[0]?.address,
    };
    console.log("details", details);
    try {
      await axios.post(
        `${import.meta.env.VITE_MY_API}user/update/${userId}`,
        details
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `User has been updated successfully.`,
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
                onChange={(e) =>
                  setUserData({ ...UserData, phoneNumber: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[
                {
                  required: true,
                  message: "Pincode is required",
                },
                {
                  pattern: /^\d{6}$/,
                  message: "Pincode must be exactly 6 digits",
                },
              ]}
            >
              <Input
                value={UserData?.address_details?.[0]?.pincode}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 6).replace(/\D/g, "");
                  setUserData({
                    ...UserData,
                    address_details: UserData.address_details.map(
                      (item, index) =>
                        index === 0 ? { ...item, pincode: value } : item
                    ),
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is mandatory" }]}
            >
              <TextArea
                rows={4}
                value={UserData?.address_details?.[0]?.address}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    address_details: UserData.address_details.map(
                      (item, index) =>
                        index === 0
                          ? { ...item, address: e.target.value }
                          : item
                    ),
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </StyledProfile>
  );
}

export default Profile;
