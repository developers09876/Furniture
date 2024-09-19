// import { Divider, Table } from "antd";
// import React from "react";
// import { Col, Row } from "react-bootstrap";
// import { MdDelete, MdEdit } from "react-icons/md";
// import styled from "styled-components";

// const StyledProfile = styled.div`
//   margin: 20px;
//   margin-left: 250px;
//   margin-right: auto;
//   width: 100%;
// `;

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
//     title: "Description",
//     dataIndex: "description",
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
//     name: "user1",
//     description: "Lorem ipsum dolor sit amet.",
//   },
//   {
//     key: "2",
//     name: "user2",
//     description: "Lorem ipsum dolor sit amet consectetur.",
//   },
//   {
//     key: "3",
//     name: "user3",
//     description: "Lorem ipsum dolo amet consectetur.",
//   },
// ];
// function Profile() {
//   return (
//     <StyledProfile>
//       <div>
//         <Divider style={{ fontSize: "30px" }}>Profile</Divider>
//         <Table columns={columns} dataSource={data} size="middle" />
//       </div>
//     </StyledProfile>
//   );
// }

// export default Profile;




import { Divider, Form, Input, Button } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap"; 
import styled from "styled-components";

const StyledProfile = styled.div`
  margin: 20px;
  margin-left: 50px;
  margin-right: auto;
  width: 100%;
`;

const initialData = [
  {
    key: "1",
    name: "name",
    email: "name@example.com",
    phonenumber: "1234567890",
    password: "password",
  },
];

function Profile() {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);

  const handleUpdate = (values, key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, ...values } : item
    );
    setData(updatedData);
  };

  const handleCancel = () => {
    form.resetFields(); 
  };

  return (
    <StyledProfile>
      <Divider style={{ fontSize: "30px" }}>Profile</Divider>
      {data.map((user) => (
        <Form style={{marginLeft:'250px',width:'70%'}}
          form={form}
          key={user.key}
          initialValues={user}
          onFinish={(values) => handleUpdate(values, user.key)}
          layout="vertical"
        >
          <Row>
            <Col xs={12} sm={6}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input />
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
                label="Phonenumber"
                name="phonenumber"
                rules={[{ required: true, message: "Please enter your phone number!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            
            <Col xs={12} sm={6}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      ))}
    </StyledProfile>
  );
}

export default Profile;
