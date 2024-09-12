import { useContext } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { Divider, Table } from "antd";
import { Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

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
    name: "Ganesh",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    key: "2",
    name: "Jim Green",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    key: "3",
    name: "Joe Black",
    description: "Lorem ipsum dolo amet consectetur.",
  },
];

// styled components
const StyledCategories = styled.div`
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

const Categories = () => {
  const { categories, deleteCategory } = useContext(DashboardContext);

  return (
    <StyledCategories>
      <Link
        className="text-reset text-decoration-none"
        to={"/admin/categories/add"}
      >
        <Button className="my-4">Add Categories</Button>
      </Link>
      <div>
        <Divider style={{ fontSize: "30px" }}>Categories</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
      </div>
    </StyledCategories>
  );
};

export default Categories;
