// import { useContext } from "react";
// import { styled } from "styled-components";
// import { MdDelete, MdEdit } from "react-icons/md";
// import { Table, Divider, Modal, Input, Button, Popconfirm, Form } from "antd";
// import Swal from "sweetalert2";
// import AddCategory from "./AddCategory";
// import { useEffect, useState } from "react";
// import { DashboardContext } from "../../context/DashboardContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const { confirm } = Modal;

// const StyledCategories = styled.div`
//   margin: 20px;
//   margin-left: 250px;
//   width: 100%;
// `;

// const StyledTh = styled.th`
//   padding: 10px 25px !important;
// `;

// const StyledTd = styled.th`
//   padding: 10px 25px !important;
//   font-weight: 400;
// `;

// const Categories = () => {
//   const { categories, deleteCategory } = useContext(DashboardContext);
//   const [modal2Open, setCategoriesModel] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editingUser, setEditingUser] = useState([]);
//   const { addCategory } = useContext(DashboardContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });

//   const [responseMessage, setResponseMessage] = useState("");

//   const [category, setCategory] = useState([]);
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_MY_API}Category/get`
//       );
//       const result = await response.json();
//       setCategory(result);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const deleteRecordFromAPI = async (id) => {
//     try {
//       await axios
//         .delete(`${import.meta.env.VITE_MY_API}Category/delete/${id}`)
//         .then((res) => {
//           fetchCategories();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Caytegory has been deleted successfully.`,
//           });
//         });
//     } catch (error) {
//       console.error("Error deleting record:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "There was an error deleting the user. Please try again.",
//       });
//     }
//   };

//   const handleDelete = (record) => {
//     confirm({
//       title: "Are you sure you want to delete this user?",
//       icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
//       content: `Name: ${record.name}`,
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk() {
//         deleteRecordFromAPI(record._id);
//       },
//       onCancel() {
//         console.log("Deletion cancelled");
//       },
//     });
//   };

//   const handleEditSubmit = async (editingUser) => {
//     const Data = {
//       name: editingUser.name,
//       description: editingUser.description,
//     };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_MY_API}Category/update/${editingUser._id}`,
//         Data
//       );

//       if (response.status === 200) {
//         // fetchCategoriesData();
//         fetchCategories();
//         Swal.fire({
//           icon: "success",
//           title: "Updated!",
//           text: `User ${editingUser.name} has been updated successfully.`,
//         });

//         setEditModalVisible(false);
//       }
//     } catch (error) {
//       console.error("Error updating record:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "There was an error updating the user. Please try again.",
//       });
//     }
//   };

//   const handleEdit = (record) => {
//     setEditingUser(record);
//     setEditModalVisible(true);
//   };

//   const columns = [
//     {
//       title: "Sno",
//       render: (text, record, index) => (
//         <div>
//           <p>{1 + index}</p>
//         </div>
//       ),
//     },

//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//     },
//     {
//       title: "Action",
//       key: "Action",
//       render: (_, record) => (
//         <div>
//           <MdEdit
//             style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
//             onClick={() => handleEdit(record)}
//           />
//           <MdDelete
//             style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
//             onClick={() => handleDelete(record)}
//           />
//         </div>
//       ),
//     },
//   ];

//   // const handleAddCategoy = async (e) => {
//   //   alert("hiii");
//   //   // e.preventDefault();
//   //   setResponseMessage("");

//   //   const { name, description } = formData;
//   //   console.log("formData", formData);
//   //   if (!name || !description) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Error",
//   //       text: "Please fill in all required fields.",
//   //     });
//   //     return;
//   //   }

//   //   console.log(formData);
//   //   addCategory(formData);
//   //   navigate("/admin/categories");
//   //   setFormData({
//   //     id: "",
//   //     name: "",
//   //     description: "",
//   //     created_at: "",
//   //     updated_at: null,
//   //   });
//   // };

//   const handleFormChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleAddCategory = async (e) => {
//     // setCategoriesModel(false)}
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_MY_API}Category/create`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const result = await response.json();
//       if (response.ok) {
//         fetchCategoriesData1();
//         navigate("/admin/categories");
//         setFormData({
//           name: "",
//           description: "",
//         });

//         setResponseMessage(`Category added: ${result.name}`);

//         setCategories((prevCategories) => [...prevCategories, result]);
//       } else {
//         setResponseMessage(`Error: ${result.message}`);
//       }
//     } catch (error) {
//       setResponseMessage("An error occurred while adding the category.");
//     }
//   };

//   return (
//     <>
//       <StyledCategories>
//         <div style={{ display: "flex", justifyContent: "end" }}>
//           <Button type="primary" onClick={() => setCategoriesModel(true)}>
//             Add Categories
//           </Button>
//         </div>
//         <div>
//           <Divider style={{ fontSize: "30px" }}>Categories</Divider>
//           <Table columns={columns} dataSource={category} size="middle" />
//         </div>
//       </StyledCategories>

//       <Modal
//         centered
//         open={modal2Open}
//         onCancel={() => setCategoriesModel(false)}
//         footer={null}
//       >
//         <AddCategory closeModal={() => setCategoriesModel(false)} />


//       </Modal>

//       <Modal
//         title="Edit User"
//         centered
//         open={editModalVisible}
//         onOk={() => handleEditSubmit(editingUser)}
//         onCancel={() => setEditModalVisible(false)}
//       >
//         <div style={{ marginBottom: "10px" }}>
//           <label>Name:</label>
//           <Input
//             value={editingUser?.name}
//             onChange={(e) =>
//               setEditingUser({ ...editingUser, name: e.target.value })
//             }
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Description:</label>
//           <Input
//             value={editingUser?.description}
//             onChange={(e) =>
//               setEditingUser({ ...editingUser, description: e.target.value })
//             }
//           />
//         </div>
//       </Modal>
//     </>
//   );
// };


// export default Categories;

import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Divider, Modal, Input, Button } from "antd";
import Swal from "sweetalert2";
import { DashboardContext } from "../../context/DashboardContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

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
  const { categories, deleteCategory, addCategory } = useContext(DashboardContext);
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
      const response = await axios.get(`${import.meta.env.VITE_MY_API}Category/get`);
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
      const response = await axios.delete(`${import.meta.env.VITE_MY_API}Category/delete/${id}`);
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
    console.log("hello", record)
    confirm({
      title: "Are you sure you want to delete this category?",
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRecordFromAPI(record._id);
        console.log("step1", record._id)
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
    console.log("change", editingCategory)
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
