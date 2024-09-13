// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { styled } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { DashboardContext } from "../../context/DashboardContext";
// // import Button from "../../components/Button";
// import { Divider, Table } from "antd";
// import { Col, Row } from "react-bootstrap";
// import { MdDelete, MdEdit } from "react-icons/md";
// import { Button ,Modal } from 'antd';
// import AddCategory from "./AddCategory";


// const handleDelete = (record) => {
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
      
//       console.log("Deleted user:", record);
//     },
//     onCancel() {
//       console.log("Deletion cancelled");
//     },
//   });
// };


// const handleEdit = (record) => {
//   setSelectedUser(record); 
//   form.setFieldsValue(record); 
//   setEditUser(true); 
// };


// const handleEditSubmit = (values) => {
//   console.log("Edited user data:", values);
  
//   Swal.fire({
//     icon: "success",
//     title: "Updated!",
//     text: `User ${values.name} has been updated.`,
//   });
//   setEditUser(false); 
// };



// const columns = [
//   {
//     title: "Sno",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//   },
//   {
//     title: "Action",
//     key: "Action",
//     render: (_, record) => (
//       <div>
//         <Row>
//           <Col md={3}>
         
//             <a onClick={() => handleEdit(record)}>
//               <MdEdit style={{ fontSize: "20px" }} />
//             </a>
//           </Col>
//           <Col md={3}>
//           <a onClick={() => handleDelete(record)}>
//               <MdDelete style={{ fontSize: "20px" }} />
//             </a>
//           </Col>
//         </Row>
//       </div>
//     ),
//   },
// ];

// const data = [
//   {
//     key: "1",
//     name: "Ganesh",
//     description: "Lorem ipsum dolor sit amet.",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     description: "Lorem ipsum dolor sit amet consectetur.",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     description: "Lorem ipsum dolo amet consectetur.",
//   },
// ];

// // styled components
// const StyledCategories = styled.div`
//   margin: 20px;
//   margin-left: 250px;
//   // margin-right: auto;
//   width: 100%;
// `;
// const StyledTh = styled.th`
//   padding: 10px 25px !important;
//   // margin-left:'250px'
// `;
// const StyledTd = styled.th`
//   padding: 10px 25px !important;
//   font-weight: 400;
// `;

// const Categories = () => {
//   const { categories, deleteCategory } = useContext(DashboardContext);
//   const [modal2Open, setModal2Open] = useState(false);
//   return (
//     <>
//     <StyledCategories>
 
//       <Button type="primary" onClick={() => setModal2Open(true)}>
//        Add Categories
//       </Button>
//       <div>
//         <Divider style={{ fontSize: "30px" }}>Categories</Divider>
//         <Table columns={columns} dataSource={data} size="middle" />
//       </div>
     
//     </StyledCategories> <Modal
//         centered
//         open={modal2Open}
//         onOk={() => setModal2Open(false)}
//         onCancel={() => setModal2Open(false)}
//       >
// <AddCategory/>
//       </Modal>
//       </>
//     );
// };
// export default Categories;

import { useContext, useState } from "react";
import { styled } from "styled-components";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Divider, Modal, Input, Button, Popconfirm } from "antd";
import Swal from "sweetalert2";
import AddCategory from "./AddCategory";
import { DashboardContext } from "../../context/DashboardContext";

const { confirm } = Modal;

const handleDelete = (record, onDelete) => {
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
      onDelete(record.key);
    },
    onCancel() {
      console.log("Deletion cancelled");
    },
  });
};

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


const Categories = () => {
  const { categories, deleteCategory } = useContext(DashboardContext);
  const [modal2Open, setModal2Open] = useState(false);
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

  const updateData = (updatedRecord) => {
    const newData = data.map((item) =>
      item.key === updatedRecord.key ? updatedRecord : item
    );
    setData(newData);
  };

  const deleteRecord = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

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
          <MdEdit
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleEdit(record, setEditModalVisible, setEditingUser)}
          />
          <MdDelete
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleDelete(record, deleteRecord)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <StyledCategories>
        <Button type="primary" onClick={() => setModal2Open(true)}>
          Add Categories
        </Button>
        <div>
          <Divider style={{ fontSize: "30px" }}>Categories</Divider>
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </StyledCategories>

    
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <AddCategory />
      </Modal>

      
      <Modal
        title="Edit User"
        centered
        open={editModalVisible}
        onOk={() => handleEditSubmit(editingUser, setEditModalVisible, updateData)}
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

