import { useContext } from "react";
import { styled } from "styled-components";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Divider, Modal, Input, Button, Popconfirm, Form } from "antd";
import Swal from "sweetalert2";
import AddCategory from "./AddCategory";
import { useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

const StyledCategories = styled.div`
  margin: 20px;
  margin-left: 250px;
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
  const [modal2Open, setCategoriesModel] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState([]);
  const [data, setData] = useState([
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
  ]);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Category/");
      setCategory(res.data);
    } catch (error) {}
  };

  const deleteRecordFromAPI = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/Category/delete/${id}`)
        .then((res) => {
          fetchCategoriesData();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `User has been deleted successfully.`,
          });
        });
    } catch (error) {
      console.error("Error deleting record:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the user. Please try again.",
      });
    }
  };

  const handleDelete = (record, data, setData) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.name}`,
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

  const handleEditSubmit = async (editingUser) => {
    const Data = {
      name: editingUser.name,
      description: editingUser.description,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/Category/update/${editingUser._id}`,
        Data
      );

      if (response.status === 200) {
        fetchCategoriesData();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `User ${editingUser.name} has been updated successfully.`,
        });

        updateData(editingUser);
        setEditModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating record:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the user. Please try again.",
      });
    }
  };

  const updateData = (updatedUser) => {
    const newData = data.map((item) =>
      item._id === updatedUser._id ? updatedUser : item
    );
    setData(newData);
  };

  const handleEdit = (record) => {
    console.log("Editing record:", record); // Check if the correct user is being set
    setEditingUser(record);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: "Sno",
      render: (i, record, index) => (
        <div>
          <p>{1 + index}</p>
        </div>
      ),
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

  const { addCategory } = useContext(DashboardContext);
  const navigate = useNavigate();

  // const handleAddCategoy = async (e) => {
  //   alert("hiii");
  //   // e.preventDefault();
  //   setResponseMessage("");

  //   const { name, description } = formData;
  //   console.log("formData", formData);
  //   if (!name || !description) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Please fill in all required fields.",
  //     });
  //     return;
  //   }

  //   console.log(formData);
  //   addCategory(formData);
  //   navigate("/admin/categories");
  //   setFormData({
  //     id: "",
  //     name: "",
  //     description: "",
  //     created_at: "",
  //     updated_at: null,
  //   });
  // };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/Category");
      const result = await response.json();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchCategoriesData1();
  }, []);

  const fetchCategoriesData1 = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Category/");
      category(res.data);
    } catch (error) {}
  };
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/Category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        fetchCategoriesData1();
        navigate("/admin/categories");
        setFormData({
          name: "",
          description: "",
        });

        setResponseMessage(`Category added: ${result.name}`);

        setCategories((prevCategories) => [...prevCategories, result]);
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while adding the category.");
    }
  };

  return (
    <>
      <StyledCategories>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" onClick={() => setCategoriesModel(true)}>
            Add Categories
          </Button>
        </div>
        <div>
          <Divider style={{ fontSize: "30px" }}>Categories</Divider>
          <Table columns={columns} dataSource={category} size="middle" />
        </div>
      </StyledCategories>

      <Modal
        centered
        open={modal2Open}
        onCancel={() => setCategoriesModel(false)}
        footer={[
          <Button type="primary" onClick={() => setCategoriesModel(false)}>
            Cancel
          </Button>,
          <Button
            // key="submit"
            type="primary"
            onClick={() => {
              handleAddCategoy();
            }}
          >
            Add Category
          </Button>,
        ]}
      >
        <AddCategory />
      </Modal>

      <Modal
        title="Edit User"
        centered
        open={editModalVisible}
        onOk={() => handleEditSubmit(editingUser)}
        onCancel={() => setEditModalVisible(false)}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <Input
            value={editingUser?.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
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
    </>
  );
};

export default Categories;
