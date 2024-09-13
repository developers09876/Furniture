import { Divider, Table } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import styled from "styled-components";

const StyledWhistlist = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;
const columns = [
  {
    title: "Sno",
    dataIndex: "key",
  },
  {
    title: "a",
    dataIndex: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
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
    name: "user3",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    key: "2",
    name: "user2",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    key: "3",
    name: "user1",
    description: "Lorem ipsum dolo amet consectetur.",
  },
];
function Whistlist() {
  return (
    <StyledWhistlist>
      <div>
        <Divider style={{ fontSize: "30px" }}>Whistlist</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
      </div>
    </StyledWhistlist>
  );
}

export default Whistlist;
