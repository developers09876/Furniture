import { Divider, Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { userData } from "three/webgpu";
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
  const [UserData, setUserData] = useState("");
  console.log("UserDatax", UserData);
  const userId = localStorage.getItem("id");

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
    console.log("UserDataApi", UserData);

    const details = {
      username: UserData.username,
      email: UserData.email,
      phoneNumber: UserData.phoneNumber,
      pincode: UserData?.address_details?.[0].pincode,
      address: UserData?.address_details?.[0].address,
    };
    axios
      .post(`${import.meta.env.VITE_MY_API}user/update/${userId}`, details)
      .then((res) => {
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
      .then((res) => {
        setUserData(res.data.data);
        form.setFieldsValue({
          name: res.data.data.username,
          email: res.data.data.email,
          phonenumber: res.data.data.phoneNumber,
          pincode: res.data.data?.address_details?.[0].pincode,
          address: res.data.data?.address_details?.[0].address,
        });
      })
      .catch((error) => {
        handleOperationError("product", "adding", error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

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
          <Col xs={12} sm={6}>
            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[
                {
                  required: true,
                  message: "Pincode is required",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Pin Code"
                maxLength={6}
                onChange={(e) => {
                  setUserData({
                    ...UserData,
                    address_details: UserData?.address_details?.map(
                      (item, index) =>
                        index === 0
                          ? { ...item, pincode: e.target.value }
                          : item
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
              rules={[
                {
                  required: true,
                  message: "Address is mandatory",
                },
                {
                  min: 2,
                  message: "Ensure Location Accuracy",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter Your Address"
                onChange={(e) => {
                  setUserData({
                    ...UserData,
                    address_details: UserData?.address_details?.map(
                      (item, index) =>
                        index === 0
                          ? { ...item, address: e.target.value }
                          : item
                    ),
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
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
