import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import Swal from "sweetalert2";
// import Button from "../../components/Button";
import { Table, Modal, Form, Input, Button } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import { DashboardContext } from "../../context/DashboardContext";
import AddProduct from "./AddProduct";

const { confirm } = Modal;

const StyledProducts = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const ProductDashboard = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState([]);

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
            onClick={() => handleEdit(record)}
          />
          <MdDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  //edit

  const handleEdit = (record) => {
    setEditingUser(record);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (editingUser) => {
    const Data = {
      title: editingUser.title,
      description: editingUser.description,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}products/edit/${editingUser._id}`,
        Data
      );

      if (response.status === 200) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `Product ${
            editingUser.name || "Product"
          } has been updated successfully.`,
        });
        setEditModalVisible(false);
      }
    } catch (error) {
      console.log("step2", error);

      console.error("Error updating record:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the Product. Please try again.",
      });
    }
  };

  //delete

  const handleDelete = (record) => {
    confirm({
      title: "Are you sure you want to delete this Product?",
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Title: ${record.title}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRecordFromAPI(record._id);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const deleteRecordFromAPI = async (id) => {
    console.log("id", id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_MY_API}products/delete/${id}`
      );

      if (response.status === 200) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Product has been deleted successfully.`,
        });
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the Product. Please try again.",
      });
    }
  };

  return (
    <StyledProducts>
      <h2 className="mb-4">All Products</h2>
      <Link
        className="text-reset text-decoration-none"
        to={"/admin/products/add"}
      >
        <Button className="my-4">Add Products</Button>
      </Link>
      <Table dataSource={products} columns={columns} />

      <Modal
        title="Edit User"
        centered
        open={editModalVisible}
        onOk={() => handleEditSubmit(editingUser)}
        onCancel={() => setEditModalVisible(false)}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <Input
            value={editingUser?.title}
            onChange={(e) =>
              setEditingUser({ ...editingUser, title: e.target.value })
            }
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <Input
            value={editingUser?.description}
            onChange={(e) =>
              setEditingUser({ ...editingUser, description: e.target.value })
            }
          />
        </div>
      </Modal>
    </StyledProducts>
  );
};

export default ProductDashboard;
