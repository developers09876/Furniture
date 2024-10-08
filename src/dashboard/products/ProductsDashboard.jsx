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
  const { products, deleteProduct, fetchData } = useContext(DashboardContext);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  });

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
        <Button className="my-4">Add Product</Button>
      </Link>
      <Table dataSource={products} columns={columns} rowKey="_id" />
      <Modal
        title="Edit Product"
        centered
        open={editProductsVisible}
        onCancel={() => setEditProductsVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditProductsVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleEditSubmit}
          initialValues={selectedProduct}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the Title" }]}
          >
            <Input placeholder="Enter Title" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the Price" }]}
          >
            <Input placeholder="Enter Price" />
          </Form.Item>

          <Form.Item
            name="discountPrice"
            label="Discount Price"
            rules={[
              { required: true, message: "Please enter the Discount Price" },
            ]}
          >
            <Input placeholder="Enter Discount Price" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter the Category" }]}
          >
            <Input placeholder="Enter Category" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the Description" },
            ]}
          >
            <Input.TextArea placeholder="Enter Description" rows={4} />
          </Form.Item>

          <Form.Item
            name="LongDesc"
            label="Long Description"
            rules={[
              { required: true, message: "Please enter Long Description" },
            ]}
          >
            <Input.TextArea placeholder="EnterLong Description" rows={4} />
          </Form.Item>

          <Form.Item
            name="images"
            label="Images"
            rules={[{ required: true, message: "Please enter Images " }]}
          >
            <Input.TextArea placeholder="Enter  Images " rows={4} />
          </Form.Item>

          <Form.Item
            name="quantity_stock"
            label="Quantity Stock"
            rules={[{ required: true, message: "Please enter Quantity Stock" }]}
          >
            <Input.TextArea placeholder="Enter  Quantity Stock" rows={4} />
          </Form.Item>

          <Form.Item
            name="offer"
            label="Offer"
            rules={[{ required: true, message: "Please enter Offer " }]}
          >
            <Input.TextArea placeholder="Enter Offer" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </StyledProducts>
  );
};

export default ProductDashboard;
