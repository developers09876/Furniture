import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Divider, Modal, Input, Button } from "antd";
import Swal from "sweetalert2";
import { DashboardContext } from "../../context/DashboardContext";
import { Tabs } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;
React;
const StyledCategories = styled.div`
  margin: 20px;
  margin-left: 250px;
  width: 100%;
`;

const StyledModalContent = styled.div`
  .field-label {
    font-weight: bold;
    margin-top: 10px;
    display: block;
  }
  .input-field {
    margin-bottom: 15px;
    width: 100%;
  }
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;

const Categories = () => {
  const { categories, deleteCategory, addCategory } =
    useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MY_API}Category/get`
      );
      setCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}Category/create`,
        formData
      );
      if (response.status === 200) {
        fetchCategories();
        Swal.fire("Added!", "Category has been added successfully.", "success");
        setModalVisible(false);
        setFormData({ name: "", description: "" });
      }
    } catch (error) {
      Swal.fire("Error!", "There was an error adding the category.", "error");
    }
  };

  const deleteRecordFromAPI = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_MY_API}Category/delete/${id}`
      );
      if (response.status === 200) {
        fetchCategories();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Category has been deleted successfully.`,
        });
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the category. Please try again.",
      });
    }
  };

  const handleDelete = (record) => {
    console.log("hello", record);
    confirm({
      title: "Are you sure you want to delete this category?",
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRecordFromAPI(record._id);
        console.log("step1", record._id);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };
  const handleEdit = (record) => {
    setEditingCategory(record);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (editingCategory) => {
    console.log("change", editingCategory);
    const Data = {
      name: editingCategory.name,
      description: editingCategory.description,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MY_API}Category/update/${editingCategory._id}`,
        Data
      );

      if (response.status === 200) {
        fetchCategories(); // Refetch to update UI after editing
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `Category ${editingCategory.name} has been updated successfully.`,
        });
        setEditModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating record:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the category. Please try again.",
      });
    }
  };

  const columns = [
    {
      title: "Sno",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Action",
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

  return (
    <StyledCategories>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add Categories
        </Button>
      </div>
      <Divider style={{ fontSize: "30px" }}>Categories</Divider>
      <Table columns={columns} dataSource={categoryList} size="middle" />

      <Modal
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <StyledModalContent>
          <span className="field-label">Name:</span>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
          />
          <span className="field-label">Description:</span>
          <Input
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="input-field"
          />
          <div className="modal-buttons">
            <Button type="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
          </div>
        </StyledModalContent>
      </Modal>

      <Modal
        title="Edit Category"
        centered
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <StyledModalContent>
          <span className="field-label">Name:</span>
          <Input
            value={editingCategory?.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
            className="input-field"
          />
          <span className="field-label">Description:</span>
          <Input
            value={editingCategory?.description}
            onChange={(e) =>
              setEditingCategory({
                ...editingCategory,
                description: e.target.value,
              })
            }
            className="input-field"
          />
        </StyledModalContent>
      </Modal>
    </StyledCategories>
  );
};

export default Categories;
