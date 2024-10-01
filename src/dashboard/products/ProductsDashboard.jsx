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

// styled components
const StyledProducts = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const ProductDashboard = () => {
  const { fetchData } = useContext(DashboardContext);
  const [products, setProducts] = useState([]);
  const [editProductsVisible, setEditProductsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const deleteRecordFromAPI = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/delete/${id}`
      );

      if (response.status === 200) {
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the product. Please try again.",
      });
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${record.title}?`,
      content: `This action cannot be undone.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRecordFromAPI(record._id);
      },
    });
  };

  const editRecordFromAPI = async (id, record) => {
    try {
      await axios
        .post(`http://localhost:5000/products/edit/${id}`, record)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `User has been updated successfully.`,
          });

          const updatedProducts = products.map((product) =>
            product._id === id ? { ...product, ...record } : product
          );
          setProducts(updatedProducts);

          setEditProductsVisible(false);
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

  const handleEditSubmit = (values) => {
    const productId = selectedProduct._id;

    Modal.confirm({
      title: "Confirm Update",
      content: `Are you sure you want to save changes to ${selectedProduct.title}?`,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        editRecordFromAPI(productId, values);
        setEditProductsVisible(false);
      },
    });
  };

  const handleEditClick = (record) => {
    setEditProductsVisible(true);
    form.setFieldsValue(record);
    setSelectedProduct(record);
  };

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
      render: (record) => (
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
      <Link className="text-reset text-decoration-none" to={"/admin/products/add"}>
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
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
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
            rules={[{ required: true, message: "Please enter the Discount Price" }]}
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
            rules={[{ required: true, message: "Please enter the Description" }]}
          >
            <Input.TextArea placeholder="Enter Description" rows={4} />
          </Form.Item>


          <Form.Item
            name="LongDesc"
            label="Long Description"
            rules={[{ required: true, message: "Please enter Long Description" }]}
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
