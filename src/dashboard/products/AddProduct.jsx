import { useState, useContext, useEffect } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { currentDate, generateUUID } from "../../utils/helpers";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Select, Upload } from "antd";
import { faL } from "@fortawesome/free-solid-svg-icons";

// styled components

const StyledProducts = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [imageCount, setImageCount] = useState(0);
  const [animationCount, setAnimationCount] = useState(0);
  const [categoriesField, setCategoriesField] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [objectName, setObjectName] = useState("");
  console.log("setobjectName", objectName);
  const navigate = useNavigate();

  // Initialize formData with specifications as an array of objects
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity_stock: "",
    LongDesc: "",
    offer: "",
    category: "",
    images: [],
    animation: [],
    specifications: [
      {
        product_Details: {
          feel: "",
          cover_Type: "",
          cover_Material: "",
          matress_Type: "",
          Usability: "",
          dynamicFields: [{ title: "", description: "" }],
        },
        product_Dimension: {
          thickness: "",
          dimensions: "",
        },
        product_Policies: {
          Warranty: "",
          Shipping: "",
          available_Offers: "",
          trial: "",
        },
      },
    ],
  });
  console.log("formData", formData);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_MY_API}Category/get`).then((response) => {
      setCategoriesField(response.data);
    });
  }, []);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleSpecificationChange = (event, section, field) => {
    const { value } = event.target;
    setFormData((prevForm) => {
      const updatedSpecifications = [...prevForm.specifications];
      updatedSpecifications[0][section][field] = value;
      return { ...prevForm, specifications: updatedSpecifications };
    });
  };

  const handleDynamicInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSpecifications = [...formData.specifications];
    const updatedDynamicFields = [
      ...updatedSpecifications[0].product_Details.dynamicFields,
    ];
    updatedDynamicFields[index][name] = value;
    updatedSpecifications[0].product_Details.dynamicFields =
      updatedDynamicFields;
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const handleDynamicRemoveClick = (index) => {
    const updatedSpecifications = [...formData.specifications];
    const updatedDynamicFields = [
      ...updatedSpecifications[0].product_Details.dynamicFields,
    ];
    updatedDynamicFields.splice(index, 1);
    updatedSpecifications[0].product_Details.dynamicFields =
      updatedDynamicFields;
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const handleDynamicAddClick = () => {
    const updatedSpecifications = [...formData.specifications];

    if (!updatedSpecifications[0].product_Details.dynamicFields) {
      updatedSpecifications[0].product_Details.dynamicFields = [];
    }

    updatedSpecifications[0].product_Details.dynamicFields.push({
      title: "",
      description: "",
    });

    setFormData({
      ...formData,
      specifications: updatedSpecifications,
    });
  };

  const uploadImages = async () => {
    const uploadedImages = [];

    for (const image of selectedImages) {
      const data = new FormData();
      data.append("file", image.originFileObj);
      // data.append("file", image);
      data.append("upload_preset", "Furniture"); // Replace with your Cloudinary upload preset

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dk6vgylx3/image/upload", // Replace with your Cloudinary URL
          {
            method: "POST",
            body: data,
          }
        );
        const cloudinaryData = await response.json();
        uploadedImages.push(cloudinaryData.secure_url); // Collect the URL
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return uploadedImages;
  };
  const upload3DAnimation = async (file) => {
    console.log("fileName 3d", file.name);
    let objectName = file.name;
    objectName = objectName.slice(0, -4);
    console.log("objectName", objectName);
    setObjectName(objectName);
    const formData = new FormData();

    formData.append("animation", file);
    // formData.append(file.originFileObj.name, file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}products/uploadGLB`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.fileUrl;
    } catch (error) {
      console.error("Failed to upload 3D animation", error);
      throw new Error("Failed to upload 3D animation");
    }
  };
  const addProduct = async (data) => {
    console.log("data", data);

    try {
      const animationFileUrl = await upload3DAnimation(formData.animation);
      const imageUrls = await uploadImages();

      if (imageUrls.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No images were uploaded. Please try again.",
        });
        return;
      }

      const updatedFormData = {
        ...data,
        objectName,
        images: imageUrls,
        threeDimenstion: animationFileUrl,
        specifications: formData.specifications,
      };

      console.log("Updated Data:", updatedFormData);

      await axios.post(
        `${import.meta.env.VITE_MY_API}products/create`,
        updatedFormData
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product Added Successfully",
      });
      // navigate("/admin/products/");
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product. Please try again.",
      });
    }
  };

  const handleImageChange = (info) => {
    const { fileList } = info;
    setSelectedImages(fileList);
    setImageCount(fileList.length);
    form.setFieldsValue({
      images: { fileList },
    });
  };

  const handleAnimationChange = (info) => {
    if (info.fileList.length === 1) {
      setFormData((prevData) => ({
        ...prevData,
        animation: info.fileList[0].originFileObj,
      }));
      setAnimationCount(info.fileList.length);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        animation: null,
      }));
      setAnimationCount(0); // Reset the count if more than 1 file is selected
    }
  };

  return (
    <StyledProducts style={{ width: "100%" }}>
      <h2 className="mb-5">Add Product</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={addProduct}
        initialValues={formData}
      >
        <div className="row">
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter the title" },
                { min: 3, message: "Title must be at least 3 characters long" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select a category">
                x
                {categoriesField.map((categoryField) => (
                  <Select.Option
                    key={categoryField.id}
                    value={categoryField.name}
                  >
                    {categoryField.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Short Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a short description" },
                {
                  min: 5,
                  message:
                    "Short description must be at least 5 characters long",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Long Description"
              name="LongDesc"
              rules={[
                { required: true, message: "Please enter a long description" },
                {
                  min: 10,
                  message:
                    "Long description must be at least 10 characters long",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please enter the price" },
                {
                  validator: (_, value) => {
                    if (value < 0) {
                      return Promise.reject(
                        new Error("No negative values allowed")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" min="1" />
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Discount Price"
              name="discountPrice"
              rules={[
                { required: true, message: "Please enter the discount price" },
                {
                  validator: (_, value) => {
                    if (value < 0) {
                      return Promise.reject(
                        new Error("No negative values allowed")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Quantity in Stock"
              name="quantity_stock"
              rules={[
                {
                  required: true,
                  message: "Please enter the quantity in stock",
                },
                {
                  validator: (_, value) => {
                    if (value < 0) {
                      return Promise.reject(
                        new Error("No negative values allowed")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="Images"
              name="images"
              rules={[
                {
                  required: true,
                  message: "upload Minimum Three  image",
                },
                {
                  validator: (_, value) => {
                    if (
                      !value ||
                      !value.fileList ||
                      value.fileList.length < 3
                    ) {
                      return Promise.reject(
                        new Error("upload Minimum Three  image")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                listType="picture"
                multiple
                beforeUpload={() => false}
                onChange={handleImageChange}
              >
                <Button type="button">Upload Images</Button>
              </Upload>
            </Form.Item>
            <p>Total Images Selected: {imageCount}</p>
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <Form.Item
              label="3D Animation"
              name="animation"
              rules={[
                {
                  required: true,
                  message: "upload Minimum Three  image",
                },
                {
                  validator: (_, value) => {
                    if (!value || value.fileList.length !== 1) {
                      return Promise.reject(
                        new Error("upload Minimum Three  image")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                listType="picture"
                multiple={false} // Only one file can be uploaded
                beforeUpload={() => false}
                onChange={handleAnimationChange}
                accept=".glb,.gltf" // Ensure only .glb or .gltf files are allowed
              >
                <Button type="button">Upload 3D Animation</Button>
              </Upload>
            </Form.Item>
            <p>Total 3D Animation Selected: {animationCount}</p>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="form-group fw-bold my-2 row mt-5">
          <h4 style={{ textAlign: "center" }}>
            <b>Specifications</b>
          </h4>
          <hr />
          <div className="form-group fw-bold my-2 row mt-5">
            <h5>
              <b>Product Details</b>
            </h5>

            <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
              <label htmlFor="feel">feel:</label>
              <input
                type="text"
                className="form-control"
                id="feel"
                name="feel"
                onChange={(e) =>
                  handleSpecificationChange(e, "product_Details", "feel")
                }
              />
            </div>

            <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
              <label htmlFor="cover_Type">Cover :</label>
              <input
                type="text"
                className="form-control"
                id="cover_Type"
                name="cover_Type"
                onChange={(e) =>
                  handleSpecificationChange(e, "product_Details", "cover_Type")
                }
              />
            </div>

            <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
              <label htmlFor="cover_Material">Cover Material:</label>
              <input
                type="text"
                className="form-control"
                id="cover_Material"
                name="cover_Material"
                onChange={(e) =>
                  handleSpecificationChange(
                    e,
                    "product_Details",
                    "cover_Material"
                  )
                }
              />
            </div>

            <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
              <label htmlFor="matress_Type">Mattress Type:</label>
              <input
                type="text"
                className="form-control"
                id="matress_Type"
                name="matress_Type"
                onChange={(e) =>
                  handleSpecificationChange(
                    e,
                    "product_Details",
                    "matress_Type"
                  )
                }
              />
            </div>

            <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
              <label htmlFor="Usability">Usability:</label>
              <input
                type="text"
                className="form-control"
                id="Usability"
                name="Usability"
                onChange={(e) =>
                  handleSpecificationChange(e, "product_Details", "Usability")
                }
              />
            </div>
            <div>
              {/* Dynamic Input Fields */}
              {formData.specifications[0].product_Details.dynamicFields.map(
                (x, i) => (
                  <div className="row mb-3" key={i}>
                    <div className="form-group col-md-4">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter Title"
                        value={x.title}
                        onChange={(e) => handleDynamicInputChange(e, i)}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
                        value={x.description}
                        onChange={(e) => handleDynamicInputChange(e, i)}
                      />
                    </div>
                    <div className="form-group col-md-2 mt-4">
                      {formData.specifications[0].product_Details.dynamicFields
                        .length !== 1 && (
                        <button
                          className="btn btn-danger mx-1 my-1"
                          onClick={() => handleDynamicRemoveClick(i)}
                        >
                          Remove
                        </button>
                      )}
                      {formData.specifications[0].product_Details.dynamicFields
                        .length -
                        1 ===
                        i && (
                        <button
                          className="btn btn-primary mx-1"
                          onClick={handleDynamicAddClick}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="form-group fw-bold my-2 row">
              <h5>
                <b>Product Dimensions</b>
              </h5>
              <div className="form-group fw-bold my-2 col-lg-6 col-md-6">
                <label htmlFor="thickness">Thickness:</label>
                <input
                  type="text"
                  className="form-control"
                  id="thickness"
                  name="thickness"
                  value={
                    formData?.specifications[0].product_Dimension.thickness ||
                    ""
                  }
                  onChange={(e) =>
                    handleSpecificationChange(
                      e,
                      "product_Dimension",
                      "thickness"
                    )
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-6 col-md-6">
                <label htmlFor="dimensions">Dimensions:</label>
                <input
                  type="text"
                  className="form-control"
                  id="dimensions"
                  name="dimensions"
                  onChange={(e) =>
                    handleSpecificationChange(
                      e,
                      "product_Dimension",
                      "dimensions"
                    )
                  }
                />
              </div>
            </div>
            <div className="form-group fw-bold my-2 row">
              <h5>
                <b>Product Policies</b>
              </h5>
              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="Warranty">Warranty:</label>
                <input
                  type="text"
                  className="form-control"
                  id="Warranty"
                  name="Warranty"
                  onChange={(e) =>
                    handleSpecificationChange(e, "product_Policies", "Warranty")
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="Shipping">Shipping:</label>
                <input
                  type="text"
                  className="form-control"
                  id="Shipping"
                  name="Shipping"
                  onChange={(e) =>
                    handleSpecificationChange(e, "product_Policies", "Shipping")
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="available_Offers">Available Offers:</label>
                <input
                  type="number"
                  className="form-control"
                  id="available_Offers"
                  name="available_Offers"
                  onChange={(e) =>
                    handleSpecificationChange(
                      e,
                      "product_Policies",
                      "available_Offers"
                    )
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="trial">Trial:</label>
                <input
                  type="text"
                  className="form-control"
                  id="trial"
                  name="trial"
                  onChange={(e) =>
                    handleSpecificationChange(e, "product_Policies", "trial")
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-4 " style={{ textAlign: "end" }}>
            <Button type="submit" className="me-2">
              Submit
            </Button>
            <Button
              type="reset"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </StyledProducts>
  );
};

export default AddProduct;
