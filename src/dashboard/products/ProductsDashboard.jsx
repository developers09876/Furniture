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
const { TextArea } = Input;

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
  const [product, setProduct] = useState([]);
  console.log("editingUser", editingUser);

  // const { products, deleteProduct, fetchData } = useContext(DashboardContext);
  const { users, orders, products, fetchData } = useContext(DashboardContext);
  const deleteRecordFromAPI = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_MY_API}products/delete/${id}`)
        .then(() => {
          fetchUsersData();

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "User has been deleted successfully.",
          });
        });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting the product. Please try again.",
      });
    }
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
      price: editingUser.price,
      category: editingUser.category,
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
        title="Edit Product"
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
          <label>Price:</label>
          <Input
            value={editingUser?.price}
            onChange={(e) =>
              setEditingUser({ ...editingUser, price: e.target.value })
            }
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Category:</label>
          <Input
            value={editingUser?.category}
            onChange={(e) =>
              setEditingUser({ ...editingUser, category: e.target.value })
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

        <div style={{ marginBottom: "10px" }}>
          <label>Long Description:</label>
          <TextArea
            value={editingUser?.LongDesc}
            onChange={(e) =>
              setEditingUser({ ...editingUser, LongDesc: e.target.value })
            }
            rows={4} // Adjust the number of rows as needed
            placeholder="Enter the long description"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Discount Price:</label>
          <Input
            type="number"
            value={editingUser?.discountPrice}
            onChange={(e) =>
              setEditingUser({ ...editingUser, discountPrice: e.target.value })
            }
            placeholder="Enter the discount price"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Quantity in Stock:</label>
          <Input
            type="number"
            value={editingUser?.quantity_stock}
            onChange={(e) =>
              setEditingUser({ ...editingUser, quantity_stock: e.target.value })
            }
            placeholder="Enter the quantity in stock"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Feel</label>
          <Input
            type="text"
            value={
              editingUser?.specifications?.[0]?.product_Details?.feel || ""
            }
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                specifications: [
                  {
                    ...editingUser.specifications[0],
                    product_Details: {
                      ...editingUser.specifications[0]?.product_Details,
                      feel: e.target.value,
                    },
                  },
                ],
              })
            }
            placeholder="Enter the feel"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Cover Type:</label>
          <Input
            value={editingUser?.cover_Type}
            onChange={(e) =>
              setEditingUser({ ...editingUser, cover_Type: e.target.value })
            }
            placeholder="Enter the cover type"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Cover Material:</label>
          <Input
            value={editingUser?.cover_Material}
            onChange={(e) =>
              setEditingUser({ ...editingUser, cover_Material: e.target.value })
            }
            placeholder="Enter the cover material"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mattress Type:</label>
          <Input
            value={editingUser?.matress_Type}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                matress_Type: e.target.value,
              })
            }
            placeholder="Enter the mattress type"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Usability:</label>
          <Input
            value={editingUser?.Usability}
            onChange={(e) =>
              setEditingUser({ ...editingUser, Usability: e.target.value })
            }
            placeholder="Enter the usability"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <Input
            value={editingUser?.title}
            onChange={(e) =>
              setEditingUser({ ...editingUser, title: e.target.value })
            }
            placeholder="Enter the title"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <Input
            value={editingUser?.description}
            onChange={(e) =>
              setEditingUser({ ...editingUser, description: e.target.value })
            }
            placeholder="Enter the description"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Thickness:</label>
          <Input
            value={editingUser?.thickness}
            onChange={(e) =>
              setEditingUser({ ...editingUser, thickness: e.target.value })
            }
            placeholder="Enter the thickness"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Dimensions:</label>
          <Input
            value={editingUser?.dimensions}
            onChange={(e) =>
              setEditingUser({ ...editingUser, dimensions: e.target.value })
            }
            placeholder="Enter the dimensions"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Warranty:</label>
          <Input
            value={editingUser?.Warranty}
            onChange={(e) =>
              setEditingUser({ ...editingUser, Warranty: e.target.value })
            }
            placeholder="Enter the warranty details"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Shipping:</label>
          <Input
            value={editingUser?.Shipping}
            onChange={(e) =>
              setEditingUser({ ...editingUser, Shipping: e.target.value })
            }
            placeholder="Enter the shipping details"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Trial:</label>
          <Input
            value={editingUser?.trial}
            onChange={(e) =>
              setEditingUser({ ...editingUser, trial: e.target.value })
            }
            placeholder="Enter the trial details"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Available Offers:</label>
          <Input
            value={editingUser?.available_Offers}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                available_Offers: e.target.value,
              })
            }
            placeholder="Enter available offers"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Trial:</label>
          <Input
            value={editingUser?.trial}
            onChange={(e) =>
              setEditingUser({ ...editingUser, trial: e.target.value })
            }
            placeholder="Enter trial details"
          />
        </div>
      </Modal>
    </StyledProducts>
  );
};

export default ProductDashboard;
