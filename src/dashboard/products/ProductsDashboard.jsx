import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import Swal from "sweetalert2";
// import Button from "../../components/Button";
import { Table, Modal, Form, Input, Button, Divider } from "antd";
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
  console.log("editingUser", editingUser);
  const [product, setProduct] = useState([]);
  console.log("editingUser", editingUser);
  const [products, setProducts] = useState([]);

  const { productss, fetchData } = useContext(DashboardContext);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_MY_API}products/`).then((res) => {
      setProducts(res.data);
    });
  }, []);
  const deleteRecordFromAPI = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_MY_API}products/delete/${id}`)
        .then(() => {
          fetchData();
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
      title: "Product Id",
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
      LongDesc: editingUser.LongDesc,
      quantity_stock: editingUser.quantity_stock,
      productId: editingUser.productId,

      specifications: [
        {
          product_Details: {
            feel: editingUser.specifications?.[0]?.product_Details?.feel || "",
            cover_type:
              editingUser.specifications?.[0]?.product_Details?.cover_type ||
              "",
            cover_material:
              editingUser.specifications?.[0]?.product_Details
                ?.cover_material || "",
            mattress_type:
              editingUser.specifications?.[0]?.product_Details?.mattress_type ||
              "",
          },
          product_Dimension: {
            thickness:
              editingUser.specifications?.[0]?.product_Dimension?.thickness ||
              "",
            dimensions:
              editingUser.specifications?.[0]?.product_Dimension?.dimensions ||
              "",
          },
          product_Policies: {
            Warranty:
              editingUser.specifications?.[0]?.product_Policies?.Warranty || "",
            Shipping:
              editingUser.specifications?.[0]?.product_Policies?.Shipping || "",
            trial:
              editingUser.specifications?.[0]?.product_Policies?.trial || "",
            available_Offers:
              editingUser.specifications?.[0]?.product_Policies
                ?.available_Offers || "",
          },
        },
      ],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}products/edit/${editingUser.productId}`,
        Data
      );
      console.log("step1", response);
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
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Link
          className="text-reset text-decoration-none"
          to={"/admin/products/add"}
        >
          <Button type="primary" className="my-4">
            Add Products
          </Button>
        </Link>
      </div>
      <center>
        <Divider>
          <h3>All Products</h3>
        </Divider>
      </center>
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
            rows={4}
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
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Details: {
                      ...prevUser.specifications[0].product_Details,
                      feel: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the feel"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Cover Type</label>
          <Input
            type="text"
            value={
              editingUser?.specifications?.[0]?.product_Details?.cover_Type ||
              ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Details: {
                      ...prevUser.specifications[0].product_Details,
                      cover_Type: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the cover type"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Cover Material</label>
          <Input
            value={
              editingUser?.specifications?.[0]?.product_Details
                ?.cover_Material || ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Details: {
                      ...prevUser.specifications[0].product_Details,
                      cover_Material: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the cover material"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mattress Type</label>
          <Input
            value={
              editingUser?.specifications?.[0]?.product_Details?.matress_Type ||
              ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Details: {
                      ...prevUser.specifications[0].product_Details,
                      matress_Type: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the mattress type"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Usability</label>
          <Input
            value={
              editingUser?.specifications?.[0]?.product_Details?.Usability || ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Details: {
                      ...prevUser.specifications[0].product_Details,
                      Usability: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the usability"
          />
        </div>

        {editingUser?.specifications?.[0]?.product_Details?.dynamicFields?.map(
          (field, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <label>Title {index + 1}:</label>
              <Input
                value={field.title || ""}
                onChange={(e) =>
                  setEditingUser((prevUser) => ({
                    ...prevUser,
                    specifications: [
                      {
                        ...prevUser.specifications[0],
                        product_Details: {
                          ...prevUser.specifications[0].product_Details,
                          dynamicFields:
                            prevUser.specifications[0].product_Details.dynamicFields.map(
                              (dynamicField, fieldIndex) =>
                                fieldIndex === index
                                  ? { ...dynamicField, title: e.target.value }
                                  : dynamicField
                            ),
                        },
                      },
                    ],
                  }))
                }
                placeholder="Enter the title"
              />

              <label>Description {index + 1}:</label>
              <Input
                value={field.description || ""}
                onChange={(e) =>
                  setEditingUser((prevUser) => ({
                    ...prevUser,
                    specifications: [
                      {
                        ...prevUser.specifications[0],
                        product_Details: {
                          ...prevUser.specifications[0].product_Details,
                          dynamicFields:
                            prevUser.specifications[0].product_Details.dynamicFields.map(
                              (dynamicField, fieldIndex) =>
                                fieldIndex === index
                                  ? {
                                      ...dynamicField,
                                      description: e.target.value,
                                    }
                                  : dynamicField
                            ),
                        },
                      },
                    ],
                  }))
                }
                placeholder="Enter the description"
              />
            </div>
          )
        )}

        <div style={{ marginBottom: "10px" }}>
          <label>Thickness</label>
          <Input
            value={
              editingUser?.specifications?.[0]?.product_Dimension?.thickness ||
              ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Dimension: {
                      ...prevUser.specifications[0].product_Dimension,
                      thickness: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the thickness"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Dimensions</label>
          <Input
            value={
              editingUser?.specifications?.[0]?.product_Dimension?.dimensions ||
              ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Dimension: {
                      ...prevUser.specifications[0].product_Dimension,
                      dimensions: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the dimensions"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Warranty</label>
          <Input
            type="text"
            value={
              editingUser?.specifications?.[0]?.product_Policies?.Warranty || ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Policies: {
                      ...prevUser.specifications[0].product_Policies,
                      Warranty: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the warranty details"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Shipping</label>
          <Input
            type="text"
            value={
              editingUser?.specifications?.[0]?.product_Policies?.Shipping || ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Policies: {
                      ...prevUser.specifications[0].product_Policies,
                      Shipping: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the shipping details"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Trial</label>
          <Input
            type="text"
            value={
              editingUser?.specifications?.[0]?.product_Policies?.trial || ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Policies: {
                      ...prevUser.specifications[0].product_Policies,
                      trial: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter the trial details"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Available Offers</label>
          <Input
            type="text"
            value={
              editingUser?.specifications?.[0]?.product_Policies
                ?.available_Offers || ""
            }
            onChange={(e) =>
              setEditingUser((prevUser) => ({
                ...prevUser,
                specifications: [
                  {
                    ...prevUser.specifications[0],
                    product_Policies: {
                      ...prevUser.specifications[0].product_Policies,
                      available_Offers: e.target.value,
                    },
                  },
                ],
              }))
            }
            placeholder="Enter available offers"
          />
        </div>
      </Modal>
    </StyledProducts>
  );
};

export default ProductDashboard;
