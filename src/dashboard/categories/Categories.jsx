import { useContext } from "react";
import { styled } from "styled-components";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Divider, Modal, Input, Button, Popconfirm } from "antd";
import Swal from "sweetalert2";
import AddCategory from "./AddCategory";
import { useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import axios from "axios";
const { confirm } = Modal;

// const handleDelete = (record, onDelete) => {
//   confirm({
//     title: "Are you sure you want to delete this user?",
//     icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
//     content: `Name: ${record.name}`,
//     okText: "Yes",
//     okType: "danger",
//     cancelText: "No",
//     onOk() {
//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: `User ${record.name} has been deleted.`,
//       });
//       onDelete(record.key);
//     },
//     onCancel() {
//       console.log("Deletion cancelled");
//     },
//   });
// };

const handleEdit = (record, setEditModalVisible, setEditingUser) => {
  setEditingUser(record);
  setEditModalVisible(true);
};

const handleEditSubmit = (values, setEditModalVisible, updateData) => {
  Swal.fire({
    icon: "success",
    title: "Updated!",
    text: `User ${values.name} has been updated.`,
  });
  updateData(values);
  setEditModalVisible(false);
};
// styled components
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

// Function to delete a record from the data
const deleteRecord = (key, data, setData) => {
  const newData = data.filter((item) => item.key !== key);
  setData(newData); // Update the state with the filtered data
};

// Function to handle the delete confirmation
const handleDelete = (record, data, setData) => {
  confirm({
    title: "Are you sure you want to delete this user?",
    icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
    content: `Name: ${record.name}`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `User ${record.name} has been deleted.`,
      });
      deleteRecord(record.key, data, setData); // Call the delete function with the correct parameters
    },
    onCancel() {
      console.log("Deletion cancelled");
    },
  });
};

const Categories = () => {
  const { categories, deleteCategory } = useContext(DashboardContext);
  const [modal2Open, setCategoriesModel] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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
    const fetchCategoriesData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Category/");
        setCategory(res.data);
      } catch (error) {}
    };

    fetchCategoriesData();
  }, []);

  const updateData = (updatedRecord) => {
    const newData = data.map((item) =>
      item.key === updatedRecord.key ? updatedRecord : item
    );
    setData(newData);
  };

  const deleteRecordFromAPI = async (id) => {
    console.log("subi", id);

    try {
      const response = await axios.delete(
        `http://localhost:5000/Category/delete/${id}`
      );

      if (response.status === 200) {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `User has been deleted successfully.`,
        });
      }
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
            onClick={() =>
              handleEdit(record, setEditModalVisible, setEditingUser)
            }
          />
          <MdDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDelete(record, data, setData)}
          />
        </div>
      ),
    },
  ];
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
        onOk={() => setCategoriesModel(false)}
        onCancel={() => setCategoriesModel(false)}
        footer={null}
      >
        <AddCategory />
      </Modal>

      <Modal
        title="Edit User"
        centered
        open={editModalVisible}
        onOk={() =>
          handleEditSubmit(editingUser, setEditModalVisible, updateData)
        }
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
