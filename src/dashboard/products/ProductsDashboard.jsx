import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
// import Button from "../../components/Button";
import { Table, Modal, Form, Input, Button } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { DashboardContext } from "../../context/DashboardContext";
import AddProduct from "./AddProduct";

const StyledProducts = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const ProductDashboard = () => {
  // const { products, deleteProduct, fetchData } = useContext(DashboardContext);
  const { users, orders, products, fetchData } = useContext(DashboardContext);

  const columns = [
    {
      title: "ProductId",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "Action",
      render: (_, record) => (
        <div>
          <MdEdit
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleEditClick(record)}
          />
          <MdDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <StyledProducts>
      <h2 className="mb-4">All Products</h2>
      <Link
        className="text-reset text-decoration-none"
        to={"/admin/products/add"}
      >
        <Button className="my-4">Add Products</Button>
      </Link>
      <Table dataSource={products} columns={columns} />;
    </StyledProducts>
  );
};

export default ProductDashboard;